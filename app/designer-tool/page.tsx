"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner"; // For displaying notifications
import {
  Download,
  Save,
  Palette,
  Calculator,
  FolderOpen,
  X,
  ZoomIn,
  Fingerprint,
} from "lucide-react"; // Icons for UI
import { Slider } from "@/components/ui/slider"; // For zoom control and sensitivity

// Shim for globalThis if it's not defined, as react-colorful might use it
if (typeof globalThis === "undefined") {
  (globalThis as any) = window;
}

// Predefined tile colors
const TILE_COLORS: Color[] = [
  { name: "Zwart", value: "#000000" },
  { name: "Donkergrijs", value: "#404040" },
  { name: "Grijs", value: "#808080" },
  { name: "Lichtgrijs", value: "#C0C0C0" },
  { name: "Wit", value: "#FFFFFF" },
  { name: "Rood", value: "#DC2626" },
  { name: "Blauw", value: "#2563EB" },
  { name: "Groen", value: "#16A34A" },
  { name: "PowerTiles Groen", value: "#7ED321" },
  { name: "Geel", value: "#EAB308" },
  { name: "Oranje", value: "#EA580C" },
  { name: "Paars", value: "#9333EA" },
];

// Grid constants
export const TILE_PIXEL_SIZE = 24; // Increased for better visibility and touchability
const METERS_PER_TILE = 0.4;
const MIN_ZOOM = 0.2; // Allowing more zoom out
const MAX_ZOOM = 5.0; // Allowing more zoom in
const INITIAL_ZOOM = 1.0;
const DEFAULT_PINCH_SENSITIVITY = 0.005; // Default pinch sensitivity
const MAX_GRID_DIMENSION_METERS = 100; // Max allowed width/length in meters
const MIN_GRID_DIMENSION_METERS = 0.1; // Min allowed width/length in meters
const DEBOUNCE_DELAY = 500; // milliseconds for input debouncing

// Local storage keys for saving designs and the current project
const DESIGNER_STATE_KEY = "powerTilesDesigns"; // Stores all saved projects
const CURRENT_PROJECT_KEY = "powerTilesCurrentProject"; // Stores the ID and name of the last opened project

// Fixed variable indicating the maximum number of projects a user can store
const MAX_PROJECTS_LIMIT = 10;

// Interface for individual tile data
export interface TileData {
  color: string;
  colorName: string;
}

// Interface for tile colors
export interface Color {
  name: string;
  value: string;
}

// Interface for a saved design project
export interface SavedDesign {
  id: string; // Unique identifier for the project
  name: string; // Name of the project
  selectedColor?: Color; // The color selected in the palette when saved
  date: string; // Date when the project was last saved
  width: number; // Floor width in meters
  length: number; // Floor length in meters
  tiles: TileData[][]; // 2D array representing the tile grid
  tilesPerWidth: number; // Number of tiles across the width
  tilesPerLength: number; // Number of tiles along the length
  totalTilesWithWaste: number;
}

export default function VloerDesigner() {
  // State for floor dimensions
  const [width, setWidth] = useState<number>(4);
  const [length, setLength] = useState<number>(4);
  // Debounced states for width and length to prevent rapid re-renders
  const [debouncedWidth, setDebouncedWidth] = useState<number>(width);
  const [debouncedLength, setDebouncedLength] = useState<number>(length);

  // State for number of tiles
  const [tilesPerWidth, setTilesPerWidth] = useState<number>(0);
  const [tilesPerLength, setTilesPerLength] = useState<number>(0);

  // State for the currently selected color in the palette
  const [selectedColor, setSelectedColor] = useState<Color>(TILE_COLORS[0]);
  // State for the 2D array representing the tile grid
  const [tiles, setTiles] = useState<TileData[][]>([]);

  // States for interactive grid
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [lastMousePos, setLastMousePos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [lastTouchPanPos, setLastTouchPanPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [initialPinchDistance, setInitialPinchDistance] = useState<
    number | null
  >(null);
  const [shiftPressed, setShiftPressed] = useState<boolean>(false); // Changed from ctrlPressed to shiftPressed
  const [zoomLevel, setZoomLevel] = useState<number>(INITIAL_ZOOM);
  const [pinchSensitivity, setPinchSensitivity] = useState<number>(
    DEFAULT_PINCH_SENSITIVITY
  );
  const [isMobile, setIsMobile] = useState<boolean>(false); // New state for device detection

  // States for "Fit to Screen" functionality
  const [isFitToScreenMode, setIsFitToScreenMode] = useState<boolean>(false);
  const [containerDynamicDimensions, setContainerDynamicDimensions] = useState<{
    width: string;
    height: string;
  }>({ width: "100%", height: "600px" });

  // State for the name input when saving a *new* project
  const [newProjectName, setNewProjectName] = useState<string>("");
  // State for the ID of the currently loaded project
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  // State for the name of the currently loaded project
  const [currentProjectName, setCurrentProjectName] = useState<string | null>(
    null
  );

  // States for controlling dialog visibility
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);

  // New state to manage when a project is being loaded, to prevent other effects from interfering
  const [isProjectLoading, setIsProjectLoading] = useState(false);
  // State to show a loader when the grid is being re-rendered due to dimension changes
  const [isLoadingGrid, setIsLoadingGrid] = useState<boolean>(false);
  // New state to track if dimensions are valid
  const [isDimensionsValid, setIsDimensionsValid] = useState<boolean>(true);

  // Ref to manage the debounce timeout
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Ref to track if the initial auto-load toast has been shown
  const initialLoadToastShownRef = useRef(false);

  // Ref for the grid container
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Derived calculations for total tiles and waste
  const totalTiles = tilesPerWidth * tilesPerLength;
  const wastePercentage = 10; // 10% waste factor
  const totalTilesWithWaste = Math.ceil(
    totalTiles * (1 + wastePercentage / 100)
  );

  // Helper function to generate a unique ID for new projects
  const generateUniqueId = useCallback(() => crypto.randomUUID(), []);

  // Helper to calculate distance between two touches
  const getPinchDistance = (touches: TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Helper to calculate the average position of multiple touches for panning
  const getAverageTouchPosition = (touches: TouchList) => {
    let avgX = 0;
    let avgY = 0;
    for (let i = 0; i < touches.length; i++) {
      avgX += touches[i].clientX;
      avgY += touches[i].clientY;
    }
    return { x: avgX / touches.length, y: avgY / touches.length };
  };

  // Function to reset container dimensions and exit fit-to-screen mode
  const resetContainerToDefault = useCallback(() => {
    setIsFitToScreenMode(false);
    setContainerDynamicDimensions({ width: "100%", height: "600px" });
  }, []);

  // Device detection effect
  useEffect(() => {
    const detectMobile = () => {
      const userAgent =
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|Windows Phone|Mobi|iemobile/i
        )
      );
      setIsMobile(mobile);
    };

    detectMobile();
    window.addEventListener("resize", detectMobile); // Re-detect on resize

    return () => {
      window.removeEventListener("resize", detectMobile);
    };
  }, []);

  // Event listeners for Shift key for desktop panning/zooming (Updated from Ctrl)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setShiftPressed(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setShiftPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyUp);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // --- Tile Coloring Logic ---
  const colorTile = useCallback(
    (rowIndex: number, colIndex: number) => {
      setTiles((prevTiles) => {
        // Create a deep copy to ensure immutability
        const newTiles = prevTiles.map((row) => [...row]);
        if (newTiles[rowIndex] && newTiles[rowIndex][colIndex]) {
          newTiles[rowIndex][colIndex] = {
            color: selectedColor.value,
            colorName: selectedColor.name,
          };
        }
        return newTiles;
      });
    },
    [selectedColor]
  );

  // --- Mouse Event Handlers for Coloring, Panning, and Zooming ---
  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      rowIndex: number,
      colIndex: number
    ) => {
      e.preventDefault(); // Prevent text selection
      if (!gridContainerRef.current) return;

      if (isFitToScreenMode) resetContainerToDefault(); // Exit fit-to-screen mode on any interaction

      if (shiftPressed) {
        // Shift + Left Click for Panning (Updated from Ctrl)
        setIsPanning(true);
        setLastMousePos({ x: e.clientX, y: e.clientY });
        gridContainerRef.current.style.cursor = "grabbing";
      } else if (e.button === 0) {
        // Left Click for Drawing
        setIsDrawing(true);
        colorTile(rowIndex, colIndex);
      }
    },
    [shiftPressed, colorTile, isFitToScreenMode, resetContainerToDefault]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!gridContainerRef.current) return;

      if (isPanning && lastMousePos) {
        const deltaX = e.clientX - lastMousePos.x;
        const deltaY = e.clientY - lastMousePos.y;
        gridContainerRef.current.scrollLeft -= deltaX;
        gridContainerRef.current.scrollTop -= deltaY;
        setLastMousePos({ x: e.clientX, y: e.clientY });
      } else if (isDrawing) {
        // Calculate which tile the mouse is over relative to the scaled grid
        const gridRect = gridContainerRef.current.getBoundingClientRect();
        // Adjust clientX, clientY to be relative to the grid *container*'s scroll area
        const x =
          e.clientX - gridRect.left + gridContainerRef.current.scrollLeft;
        const y = e.clientY - gridRect.top + gridContainerRef.current.scrollTop;

        // Now, adjust for the zoom level to get the logical position within the scaled grid
        const scaledX = x / zoomLevel;
        const scaledY = y / zoomLevel;

        // Calculate tile indices based on the logical position and original tile size
        const colIndex = Math.floor(scaledX / TILE_PIXEL_SIZE);
        const rowIndex = Math.floor(scaledY / TILE_PIXEL_SIZE);

        if (
          rowIndex >= 0 &&
          rowIndex < tilesPerLength &&
          colIndex >= 0 &&
          colIndex < tilesPerWidth
        ) {
          colorTile(rowIndex, colIndex);
        }
      }
    },
    [
      isDrawing,
      isPanning,
      lastMousePos,
      tilesPerLength,
      tilesPerWidth,
      colorTile,
      zoomLevel,
    ]
  );

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
    setIsPanning(false);
    setLastMousePos(null);
    if (gridContainerRef.current) {
      gridContainerRef.current.style.cursor = shiftPressed ? "grab" : "default"; // Reset cursor
    }
  }, [shiftPressed]);

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      e.preventDefault(); // Prevent page scrolling

      if (e.shiftKey) {
        // Zoom only if Shift is pressed (Updated from Ctrl)
        if (isFitToScreenMode) resetContainerToDefault(); // Exit fit-to-screen mode

        const zoomFactor = 0.1;
        let newZoomLevel = zoomLevel;

        if (e.deltaY < 0) {
          // Zoom in
          newZoomLevel = Math.min(MAX_ZOOM, zoomLevel + zoomFactor);
        } else {
          // Zoom out
          newZoomLevel = Math.max(MIN_ZOOM, zoomLevel - zoomFactor);
        }
        setZoomLevel(newZoomLevel);
      }
    },
    [zoomLevel, isFitToScreenMode, resetContainerToDefault]
  );

  // --- Touch Event Handlers for Coloring, Panning (3-finger), and Pinch-Zoom (2-finger) ---
  const handleTouchStart = useCallback(
    (
      e: React.TouchEvent<HTMLDivElement>,
      rowIndex: number,
      colIndex: number
    ) => {
      e.preventDefault(); // Prevent scrolling and browser gestures

      if (!gridContainerRef.current) return;

      if (isFitToScreenMode) resetContainerToDefault(); // Exit fit-to-screen mode on any touch interaction

      if (e.touches.length === 3) {
        // Three fingers for Panning
        setIsPanning(true);
        const avgPos = getAverageTouchPosition(e.touches as any);
        setLastTouchPanPos({ x: avgPos.x, y: avgPos.y });
        setInitialPinchDistance(null); // Reset pinch state
        setIsDrawing(false); // Ensure drawing is off
        gridContainerRef.current.style.cursor = "grabbing";
      } else if (e.touches.length === 2) {
        // Two fingers for Pinch Zoom
        setInitialPinchDistance(getPinchDistance(e.touches as any));
        setLastTouchPanPos(null); // Reset pan state for 2 fingers
        setIsPanning(false); // Ensure panning is off
        setIsDrawing(false); // Ensure drawing is off
      } else if (e.touches.length === 1) {
        // One finger for Drawing
        setIsDrawing(true);
        colorTile(rowIndex, colIndex);
        setInitialPinchDistance(null); // Reset pinch state
        setLastTouchPanPos(null); // Reset pan state
        setIsPanning(false); // Ensure panning is off
      }
    },
    [colorTile, isFitToScreenMode, resetContainerToDefault]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault(); // Prevent scrolling and browser gestures
      if (!gridContainerRef.current) return;

      if (e.touches.length === 3 && isPanning && lastTouchPanPos) {
        // Three-finger pan
        const currentAvgPos = getAverageTouchPosition(e.touches as any);

        const deltaX = currentAvgPos.x - lastTouchPanPos.x;
        const deltaY = currentAvgPos.y - lastTouchPanPos.y;

        gridContainerRef.current.scrollLeft -= deltaX;
        gridContainerRef.current.scrollTop -= deltaY;
        setLastTouchPanPos({ x: currentAvgPos.x, y: currentAvgPos.y });
      } else if (e.touches.length === 2 && initialPinchDistance !== null) {
        // Two-finger pinch zoom
        const currentPinchDistance = getPinchDistance(e.touches as any);
        const deltaDistance = currentPinchDistance - initialPinchDistance;
        // Using pinchSensitivity from state
        let newZoomLevel = zoomLevel + deltaDistance * pinchSensitivity;
        newZoomLevel = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoomLevel));

        if (Math.abs(deltaDistance) > 3) {
          // Only zoom if significant pinch detected
          if (isFitToScreenMode) resetContainerToDefault(); // Exit fit-to-screen mode if zooming
          setZoomLevel(newZoomLevel);
          setInitialPinchDistance(currentPinchDistance); // Update initial distance to smooth zoom
        }
      } else if (e.touches.length === 1 && isDrawing) {
        // One-finger drawing
        const touch = e.touches[0];
        const gridRect = gridContainerRef.current.getBoundingClientRect();

        // Adjust clientX, clientY to be relative to the grid *container*'s scroll area
        const x =
          touch.clientX - gridRect.left + gridContainerRef.current.scrollLeft;
        const y =
          touch.clientY - gridRect.top + gridContainerRef.current.scrollTop;

        // Now, adjust for the zoom level to get the logical position within the scaled grid
        const scaledX = x / zoomLevel;
        const scaledY = y / zoomLevel;

        // Calculate tile indices based on the logical position and original tile size
        const colIndex = Math.floor(scaledX / TILE_PIXEL_SIZE);
        const rowIndex = Math.floor(scaledY / TILE_PIXEL_SIZE);

        if (
          rowIndex >= 0 &&
          rowIndex < tilesPerLength &&
          colIndex >= 0 &&
          colIndex < tilesPerWidth
        ) {
          colorTile(rowIndex, colIndex);
        }
      }
    },
    [
      isDrawing,
      isPanning,
      lastTouchPanPos,
      tilesPerLength,
      tilesPerWidth,
      colorTile,
      zoomLevel,
      initialPinchDistance,
      pinchSensitivity,
      isFitToScreenMode,
      resetContainerToDefault,
    ]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDrawing(false);
    setIsPanning(false);
    setLastTouchPanPos(null);
    setInitialPinchDistance(null);
    if (gridContainerRef.current) {
      gridContainerRef.current.style.cursor = shiftPressed ? "grab" : "default"; // Reset cursor
    }
  }, [shiftPressed]);

  // Handler for zoom buttons and slider
  const handleZoomChange = useCallback(
    (newZoom: number) => {
      if (isFitToScreenMode) resetContainerToDefault();
      setZoomLevel(newZoom);
    },
    [isFitToScreenMode, resetContainerToDefault]
  );

  // New function to fit the grid entirely into view
  const handleFitToScreen = useCallback(() => {
    if (
      !gridContainerRef.current ||
      tilesPerWidth === 0 ||
      tilesPerLength === 0
    )
      return;

    const parentContainer = gridContainerRef.current.parentElement;
    if (!parentContainer) return;

    const parentPaddingLeft = parseInt(
      getComputedStyle(parentContainer).paddingLeft
    );
    const parentPaddingRight = parseInt(
      getComputedStyle(parentContainer).paddingRight
    );
    const parentPaddingTop = parseInt(
      getComputedStyle(parentContainer).paddingTop
    );
    const parentPaddingBottom = parseInt(
      getComputedStyle(parentContainer).paddingBottom
    );

    // Available space for the grid within its parent (CardContent)
    const availableWidth =
      parentContainer.clientWidth - parentPaddingLeft - parentPaddingRight;
    const availableHeight =
      parentContainer.clientHeight - parentPaddingTop - parentPaddingBottom;

    const gridActualWidth = tilesPerWidth * TILE_PIXEL_SIZE;
    const gridActualHeight = tilesPerLength * TILE_PIXEL_SIZE;

    // Calculate zoom needed to fit width and height
    const zoomToFitWidth = availableWidth / gridActualWidth;
    const zoomToFitHeight = availableHeight / gridActualHeight;

    // Use the smaller zoom to ensure both dimensions fit, with a small padding factor
    let newZoom = Math.min(zoomToFitWidth, zoomToFitHeight) * 0.95; // 5% padding

    // Clamp the new zoom level within min/max bounds
    newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));

    setZoomLevel(newZoom);

    // Calculate the container's dimensions based on the new zoom level
    const finalScaledHeight = gridActualHeight * newZoom;

    // Define minimum height for the container to prevent it from shrinking too much
    // Using a responsive approach for min-height: 500px for mobile, 600px for desktop
    const minHeightForFitScreen = isMobile ? 500 : 600;

    // Set the container's dimensions dynamically, ensuring minimum height
    setContainerDynamicDimensions({
      width: "100%", // Keep outer container full width when fitting
      height: `${Math.max(minHeightForFitScreen, finalScaledHeight)}px`, // Ensure height is at least minHeightForFitScreen
    });
    setIsFitToScreenMode(true); // Activate fit to screen mode

    // Reset scroll to top-left when fitting to screen
    gridContainerRef.current.scrollLeft = 0;
    gridContainerRef.current.scrollTop = 0;
  }, [tilesPerWidth, tilesPerLength, isMobile]);

  // Function to load a design's state into the designer
  const loadDesignState = useCallback((design: SavedDesign) => {
    setIsLoadingGrid(true); // Start loader
    setWidth(design.width);
    setLength(design.length);
    setSelectedColor(design.selectedColor || TILE_COLORS[0]);
    setTiles(design.tiles); // This is the authoritative update for tiles
    setCurrentProjectId(design.id);
    setCurrentProjectName(design.name);
    setNewProjectName("");
    // Update derived tile dimensions based on loaded design
    setTilesPerWidth(design.tilesPerWidth);
    setTilesPerLength(design.tilesPerLength);
    setTimeout(() => setIsLoadingGrid(false), 500); // Stop loader after a delay
  }, []);

  // Callback to initialize a default blank design when no project is loaded
  const initializeDefaultDesign = useCallback(() => {
    const defaultTileColor = TILE_COLORS[0];
    const defaultWidth = 4;
    const defaultLength = 4;

    setWidth(defaultWidth);
    setLength(defaultLength);
    setSelectedColor(defaultTileColor);
    setCurrentProjectId(null); // No project currently open
    setCurrentProjectName(null);
    setNewProjectName(""); // Clear the new project name input field

    // Create a new grid with default dimensions and color
    const newTiles: TileData[][] = [];
    const initialTilesPerWidth = Math.ceil(defaultWidth / METERS_PER_TILE);
    const initialTilesPerLength = Math.ceil(defaultLength / METERS_PER_TILE);

    for (let i = 0; i < initialTilesPerLength; i++) {
      const row: TileData[] = [];
      for (let j = 0; j < initialTilesPerWidth; j++) {
        row.push({
          color: defaultTileColor.value,
          colorName: defaultTileColor.name,
        });
      }
      newTiles.push(row);
    }
    setTiles(newTiles);
    setTilesPerWidth(initialTilesPerWidth);
    setTilesPerLength(initialTilesPerLength);
  }, []); // No external dependencies

  // Handler to fill all tiles in the grid with the currently selected color
  const fillAllTiles = () => {
    const newTiles = tiles.map((row) =>
      row.map(() => ({
        color: selectedColor.value,
        colorName: selectedColor.name,
      }))
    );
    setTiles(newTiles);
  };

  // Handler to create a checkerboard pattern using the currently selected color and the default black
  const createCheckerboard = () => {
    const newTiles = tiles.map((row, rowIndex) =>
      row.map((_, colIndex) => {
        const isEven = (rowIndex + colIndex) % 2 === 0;
        const color = isEven ? TILE_COLORS[0] : selectedColor; // Alternate between default black and selected color
        return {
          color: color.value,
          colorName: color.name,
        };
      })
    );
    setTiles(newTiles);
  };

  // Helper function to save or update a design, returns the saved design or null on failure
  const saveCurrentDesign = useCallback(
    (name: string, id?: string): SavedDesign | null => {
      let designId = id || generateUniqueId();
      const designName = name.trim();

      const existingDesigns: SavedDesign[] = JSON.parse(
        localStorage.getItem(DESIGNER_STATE_KEY) || "[]"
      );

      if (!id && existingDesigns.some((d) => d.name === designName)) {
        toast.error(`Er bestaat al een project met de naam "${designName}".`, {
          duration: 3000,
          closeButton: true,
        });
        return null;
      }

      if (!id && existingDesigns.length >= MAX_PROJECTS_LIMIT) {
        toast.error(
          `Maximaal ${MAX_PROJECTS_LIMIT} projecten toegestaan. Verwijder een oud project om een nieuw project op te slaan.`,
          {
            duration: 5000,
            closeButton: true,
          }
        );
        return null;
      }

      const design: SavedDesign = {
        id: designId,
        name: designName,
        selectedColor: selectedColor,
        date: new Date().toLocaleDateString("nl-NL"),
        width,
        length,
        tiles: [...tiles],
        tilesPerWidth,
        tilesPerLength,
        totalTilesWithWaste,
      };

      let updatedDesigns: SavedDesign[];
      const existingIndex = existingDesigns.findIndex(
        (d) => d.id === design.id
      );

      if (existingIndex !== -1) {
        updatedDesigns = [...existingDesigns];
        updatedDesigns[existingIndex] = design;
      } else {
        updatedDesigns = [...existingDesigns, design];
      }

      localStorage.setItem(DESIGNER_STATE_KEY, JSON.stringify(updatedDesigns));
      setSavedDesigns(updatedDesigns);
      setCurrentProjectId(design.id);
      setCurrentProjectName(design.name);
      localStorage.setItem(
        CURRENT_PROJECT_KEY,
        JSON.stringify({ id: design.id, name: design.name })
      );

      return design;
    },
    [
      generateUniqueId,
      selectedColor,
      width,
      length,
      tiles,
      tilesPerWidth,
      tilesPerLength,
      totalTilesWithWaste,
      setSavedDesigns,
      setCurrentProjectId,
      setCurrentProjectName,
    ]
  );

  // Main save logic for handling both updating an existing project and saving a new one
  const handleSaveDesign = () => {
    if (currentProjectId && currentProjectName) {
      const savedDesign = saveCurrentDesign(
        currentProjectName,
        currentProjectId
      );
      if (savedDesign) {
        toast.success(`Project "${currentProjectName}" is bijgewerkt.`, {
          duration: 3000,
          closeButton: true,
        });
      }
    } else {
      setNewProjectName("");
      setShowSaveDialog(true);
    }
  };

  // Function called when confirming to save a *new* project
  const confirmNewSave = () => {
    if (!newProjectName.trim()) {
      toast.error("Voer een project naam in", {
        duration: 3000,
        closeButton: true,
      });
      return;
    }
    const savedDesign = saveCurrentDesign(newProjectName);
    if (savedDesign) {
      setNewProjectName("");
      setShowSaveDialog(false);
      toast.success(`Project "${savedDesign.name}" succesvol opgeslagen!`, {
        duration: 3000,
        closeButton: true,
      });
    }
  };

  // Handler to open the "Load Design" dialog and refresh the list of saved designs
  const loadSavedDesigns = () => {
    const designs = JSON.parse(
      localStorage.getItem(DESIGNER_STATE_KEY) || "[]"
    );
    setSavedDesigns(designs);
    setShowLoadDialog(true);
  };

  // Handler to load a specific design from the list of saved designs
  const loadDesign = (design: SavedDesign) => {
    setIsProjectLoading(true);
    loadDesignState(design);
    localStorage.setItem(
      CURRENT_PROJECT_KEY,
      JSON.stringify({ id: design.id, name: design.name })
    );
    setShowLoadDialog(false);
    toast.success(`Project "${design.name}" geladen!`, {
      duration: 3000,
      closeButton: true,
    });
    setTimeout(() => {
      setIsProjectLoading(false);
      resetContainerToDefault(); // Reset to default container sizing after load
    }, 50);
  };

  // Handler to delete a specific design from local storage
  const deleteDesign = (designId: string) => {
    const updatedDesigns = savedDesigns.filter((d) => d.id !== designId);
    localStorage.setItem(DESIGNER_STATE_KEY, JSON.stringify(updatedDesigns));
    setSavedDesigns(updatedDesigns);

    if (currentProjectId === designId) {
      setCurrentProjectId(null);
      setCurrentProjectName(null);
      localStorage.removeItem(CURRENT_PROJECT_KEY);
      initializeDefaultDesign();
      toast.info("Huidig project verwijderd. Standaardontwerp geladen.", {
        duration: 4000,
        closeButton: true,
      });
    } else {
      toast.success("Ontwerp succesvol verwijderd.", {
        duration: 3000,
        closeButton: true,
      });
    }
  };

  // Handler for creating a new, blank project
  const handleNewProject = () => {
    if (currentProjectId) {
      toast.info(
        "Weet je zeker dat je het huidige project wilt sluiten en een nieuw, leeg project wilt starten? Niet-opgeslagen wijzigingen gaan verloren.",
        {
          duration: 5000,
          action: {
            label: "Ja, start nieuw",
            onClick: () => {
              setCurrentProjectId(null);
              setCurrentProjectName(null);
              localStorage.removeItem(CURRENT_PROJECT_KEY);
              initializeDefaultDesign();
              toast.success("Nieuw project gestart.", {
                duration: 3000,
                closeButton: true,
              });
            },
          },
          closeButton: true,
        }
      );
    } else {
      initializeDefaultDesign();
      toast.info("Nieuw project gestart.", {
        duration: 3000,
        closeButton: true,
      });
    }
  };

  // Handler to save the current design and navigate to the quote page with the project ID
  const handleRequestQuote = () => {
    let projectToNavigateWith: SavedDesign | null = null;
    let toastMessage = "";

    if (currentProjectId && currentProjectName) {
      projectToNavigateWith = saveCurrentDesign(
        currentProjectName,
        currentProjectId
      );
      if (projectToNavigateWith) {
        toastMessage = `Huidig project "${currentProjectName}" opgeslagen voor offerteaanvraag.`;
      }
    } else {
      const randomNumberString = Math.floor(
        10000000 + Math.random() * 90000000
      ).toString();
      const generatedName = `offerte-${randomNumberString}`;
      projectToNavigateWith = saveCurrentDesign(generatedName);
      if (projectToNavigateWith) {
        toastMessage = `Nieuw project "${projectToNavigateWith.name}" opgeslagen voor offerteaanvraag.`;
      }
    }

    if (projectToNavigateWith && projectToNavigateWith.id) {
      toast.success(toastMessage, {
        duration: 3000,
        closeButton: true,
      });

      setTimeout(() => {
        // In a real Next.js app, you'd use router.push for client-side navigation.
        // For this immersive, window.location.href = is used for simplicity.
        window.location.href = `/offerte?projectId=${projectToNavigateWith.id}`;
      }, 3000);
    } else {
      toast.error(
        "Kan project niet opslaan of genereren voor offerteaanvraag.",
        {
          duration: 5000,
          closeButton: true,
        }
      );
    }
  };

  // Handler to export the current design as a PNG image
  const exportDesign = () => {
    if (!gridContainerRef.current) {
      // Use gridContainerRef
      toast.error("Kan het ontwerp niet exporteren. Raster niet gevonden.", {
        duration: 3000,
        closeButton: true,
      });
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      toast.error("Browser ondersteunt geen canvas-weergave.", {
        duration: 3000,
        closeButton: true,
      });
      return;
    }

    const exportTileSize = 40; // Size of each tile in the exported image, independent of display TILE_PIXEL_SIZE
    canvas.width = tilesPerWidth * exportTileSize;
    canvas.height = tilesPerLength * exportTileSize;

    tiles.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        ctx.fillStyle = tile.color;
        ctx.fillRect(
          colIndex * exportTileSize,
          rowIndex * exportTileSize,
          exportTileSize,
          exportTileSize
        );

        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1;
        ctx.strokeRect(
          colIndex * exportTileSize,
          rowIndex * exportTileSize,
          exportTileSize,
          exportTileSize
        );
      });
    });

    canvas.toBlob((blob) => {
      if (!blob) {
        toast.error("Fout bij het genereren van de afbeelding.", {
          duration: 3000,
          closeButton: true,
        });
        return;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentProjectName ? currentProjectName + "-" : ""}powertiles-ontwerp-${width}x${length}m-${new Date().toISOString().split("T")[0]}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  // Handler to export a summary of the current design as a text file
  const exportSummary = () => {
    const colorCounts: { [key: string]: number } = {};

    tiles.forEach((row) => {
      row.forEach((tile) => {
        colorCounts[tile.colorName] = (colorCounts[tile.colorName] || 0) + 1;
      });
    });

    const summary = `
PowerTiles Vloer Ontwerp Samenvatting
=====================================

Projectnaam: ${currentProjectName || "Niet opgeslagen"}
- Afmetingen: ${width}m x ${length}m (${(width * length).toFixed(1)} m²)
- Tegels: ${tilesPerWidth} x ${tilesPerLength} = ${totalTiles} stuks
- Inclusief snijverlies (10%): ${totalTilesWithWaste} stuks

Kleurverdeling:
${Object.entries(colorCounts)
  .map(([color, count]) => `- ${color}: ${count} tegels`)
  .join("\n")}

Gegenereerd op: ${new Date().toLocaleDateString("nl-NL")} om ${new Date().toLocaleTimeString("nl-NL")}
PowerTiles - Transform Your Space. Unleash the Power.
    `.trim();

    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentProjectName ? currentProjectName + "-" : ""}powertiles-samenvatting-${width}x${length}m-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Effect to initialize or load project data on component mount
  useEffect(() => {
    const existingDesigns: SavedDesign[] = JSON.parse(
      localStorage.getItem(DESIGNER_STATE_KEY) || "[]"
    );
    setSavedDesigns(existingDesigns);

    const storedCurrentProject = JSON.parse(
      localStorage.getItem(CURRENT_PROJECT_KEY) || "null"
    );

    let needsInitializeDefault = true;

    if (
      storedCurrentProject &&
      storedCurrentProject.id &&
      storedCurrentProject.name
    ) {
      const foundProject = existingDesigns.find(
        (design) => design.id === storedCurrentProject.id
      );

      // if (foundProject) {
      //   // Temporarily set flag to disable dimension effect while project is being loaded
      //   setIsProjectLoading(true);
      //   loadDesignState(foundProject); // This will set all relevant states, including 'tiles'

      //   // Only show the toast if it hasn't been shown during this mount/remount cycle
      //   if (!initialLoadToastShownRef.current) {
      //     toast.success(`Project "${foundProject.name}" automatisch geladen.`, {
      //       duration: 3000,
      //       closeButton: true,
      //     });
      //     initialLoadToastShownRef.current = true; // Mark as shown
      //   }

      //   // Reset the flag after a short delay to allow all state updates to process
      //   const timer = setTimeout(() => setIsProjectLoading(false), 50);
      //   needsInitializeDefault = false; // Project was loaded, no need for default init
      //   return () => {
      //     clearTimeout(timer);
      //     initialLoadToastShownRef.current = false; // Reset on unmount
      //   };
      // } else {
      //   localStorage.removeItem(CURRENT_PROJECT_KEY); // Clean up invalid stored current project key
      // }
    }

    if (needsInitializeDefault) {
      initializeDefaultDesign(); // Fallback to default if no valid project loaded
    }
  }, [initializeDefaultDesign, loadDesignState]); // Dependencies for useCallback functions

  // Debounce effect for width and length inputs
  useEffect(() => {
    // Clear previous timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Start loader immediately when width or length changes
    setIsLoadingGrid(true);

    // Set new timeout
    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedWidth(width);
      setDebouncedLength(length);
      // Loader will be turned off in the next effect that depends on debounced values
    }, DEBOUNCE_DELAY);

    // Cleanup on unmount or if dependencies change before timeout
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [width, length]); // Depends on immediate width and length changes

  // Effect to re-render the tile grid when debounced width or length dimensions change
  useEffect(() => {
    if (isProjectLoading) {
      return;
    }

    const widthVal = parseFloat(debouncedWidth.toString());
    const lengthVal = parseFloat(debouncedLength.toString());

    const isValidWidthInput =
      !isNaN(widthVal) &&
      widthVal >= MIN_GRID_DIMENSION_METERS &&
      widthVal <= MAX_GRID_DIMENSION_METERS;
    const isValidLengthInput =
      !isNaN(lengthVal) &&
      lengthVal >= MIN_GRID_DIMENSION_METERS &&
      lengthVal <= MAX_GRID_DIMENSION_METERS;

    const newIsDimensionsValid = isValidWidthInput && isValidLengthInput;

    // Only update isDimensionsValid if it has actually changed
    if (newIsDimensionsValid !== isDimensionsValid) {
      setIsDimensionsValid(newIsDimensionsValid);
    }

    if (newIsDimensionsValid) {
      const newTilesPerWidth = Math.ceil(widthVal / METERS_PER_TILE);
      const newTilesPerLength = Math.ceil(lengthVal / METERS_PER_TILE);

      // Only update tiles and derived dimensions if they actually need to change
      if (
        newTilesPerWidth !== tilesPerWidth ||
        newTilesPerLength !== tilesPerLength
      ) {
        setTilesPerWidth(newTilesPerWidth);
        setTilesPerLength(newTilesPerLength);

        const newTiles: TileData[][] = [];
        const currentDefaultColor = selectedColor || TILE_COLORS[0];

        for (let i = 0; i < newTilesPerLength; i++) {
          const row: TileData[] = [];
          for (let j = 0; j < newTilesPerWidth; j++) {
            // Populate with existing tile color if available, otherwise default
            const existingTile = tiles[i]?.[j];
            row.push(
              existingTile
                ? { ...existingTile }
                : {
                    color: currentDefaultColor.value,
                    colorName: currentDefaultColor.name,
                  }
            );
          }
          newTiles.push(row);
        }
        setTiles(newTiles);
      }
    } else {
      // If inputs are invalid, reset grid dimensions and clear tiles state IF NOT ALREADY EMPTY/ZERO
      if (tilesPerWidth !== 0 || tilesPerLength !== 0 || tiles.length > 0) {
        setTilesPerWidth(0);
        setTilesPerLength(0);
        setTiles([]);
      }
    }
    // Always turn off the loader after processing the debounced values
    setIsLoadingGrid(false);
    resetContainerToDefault();
  }, [
    debouncedWidth, // Now depends on debounced values
    debouncedLength, // Now depends on debounced values
    selectedColor,
    isProjectLoading,
    resetContainerToDefault,
    tilesPerWidth,
    tilesPerLength,
    isDimensionsValid,
    tiles // Keep tiles here for checking existingTile for color preservation
  ]);

  return (
    <div className="min-h-screen ">
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Vloer Designer
          </h1>
          <p className="text-xl text-muted-foreground">
            Ontwerp uw eigen garagevloer met onze geventileerde PVC-tegels
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Controls Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Dimensions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Afmetingen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="width">Breedte (meter)</Label>
                  <Input
                    id="width"
                    type="number"
                    min={MIN_GRID_DIMENSION_METERS.toString()}
                    max={MAX_GRID_DIMENSION_METERS.toString()}
                    step="0.1"
                    value={width}
                    onChange={(e) => {
                      // Update immediate width state
                      setWidth(
                        Number.parseFloat(e.target.value) ||
                          MIN_GRID_DIMENSION_METERS
                      );
                    }}
                    placeholder={`Min ${MIN_GRID_DIMENSION_METERS} - Max ${MAX_GRID_DIMENSION_METERS}`}
                  />
                </div>
                <div className="space-y-2"></div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="length">Lengte (meter)</Label>
                  <Input
                    id="length"
                    type="number"
                    min={MIN_GRID_DIMENSION_METERS.toString()}
                    max={MAX_GRID_DIMENSION_METERS.toString()}
                    step="0.1"
                    value={length}
                    onChange={(e) => {
                      // Update immediate length state
                      setLength(
                        Number.parseFloat(e.target.value) ||
                          MIN_GRID_DIMENSION_METERS
                      );
                    }}
                    placeholder={`Min ${MIN_GRID_DIMENSION_METERS} - Max ${MAX_GRID_DIMENSION_METERS}`}
                  />
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Oppervlakte:{" "}
                    <span className="font-semibold">
                      {width} x {length} = {(width * length).toFixed(1)} m²
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tegels:{" "}
                    <span className="font-semibold">
                      {tilesPerWidth} x {tilesPerLength} = {totalTiles} stuks
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground pt-2">
                    Grid weergave: {tiles[0]?.length || 0} x {tiles.length || 0}{" "}
                    = {tiles.length * (tiles[0]?.length || 0)} tegels
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Color Selection Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Kleuren
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Predefined colors from TILE_COLORS */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {TILE_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color)}
                      className={`w-full h-10 rounded border-2 transition-all ${
                        selectedColor.value === color.value
                          ? "border-primary ring-2 ring-primary ring-opacity-50" // Highlight selected color
                          : "border-muted-foreground hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Geselecteerd:{" "}
                  <span className="font-semibold">{selectedColor.name}</span>
                </p>

                <div className="space-y-2">
                  <Button
                    onClick={fillAllTiles}
                    className="w-full"
                  >
                    Alle Tegels Vullen
                  </Button>
                  <Button
                    onClick={createCheckerboard}
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    Schaakbord Patroon
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Zoom Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ZoomIn className="h-5 w-5" />
                  Zoom
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-md font-semibold">
                  Zoom Level ({Math.round(zoomLevel * 100)}%)
                </p>
                <Slider
                  min={MIN_ZOOM}
                  max={MAX_ZOOM}
                  step={0.1}
                  value={[zoomLevel]}
                  onValueChange={(val) => handleZoomChange(val[0])}
                  className="w-full rounded-md"
                />
                <div className="flex flex-wrap justify-between gap-2 mt-8">
                  <Button
                    onClick={() =>
                      handleZoomChange(Math.max(MIN_ZOOM, zoomLevel - 0.2))
                    }
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    Zoom Uit
                  </Button>
                  <Button
                    onClick={() =>
                      handleZoomChange(Math.min(MAX_ZOOM, zoomLevel + 0.2))
                    }
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    Zoom In
                  </Button>
                  <Button
                    onClick={() => handleZoomChange(INITIAL_ZOOM)}
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    Reset Zoom
                  </Button>
                  <Button
                    onClick={handleFitToScreen}
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    Fit to Screen
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pinch Sensitivity Slider */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fingerprint className="h-5 w-5" />
                  Gevoeligheid
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <h4 className="text-md font-semibold">
                  Pinch Gevoeligheid ({pinchSensitivity.toFixed(3)})
                </h4>
                <Slider
                  min={0.001}
                  max={0.02}
                  step={0.001}
                  value={[pinchSensitivity]}
                  onValueChange={(val) => setPinchSensitivity(val[0])}
                  className="w-full rounded-md"
                />
              </CardContent>
            </Card>

            {/* Calculation Results Card */}
            <Card className="bg-accent">
              <CardHeader>
                <CardTitle>Berekening</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Tegels nodig:</span>
                  <span className="font-semibold">{totalTiles}</span>
                </div>
                <div className="flex justify-between">
                  <span>Snijverlies ({wastePercentage}%):</span>
                  <span className="font-semibold">
                    {totalTilesWithWaste - totalTiles}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Totaal te bestellen:</span>
                  <span className="font-bold text-primary">
                    {totalTilesWithWaste}
                  </span>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={handleRequestQuote}
                >
                  <span className="flex items-center gap-2 text-foreground">
                    Offerte Aanvragen
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Grid Area */}
          <div className="lg:col-span-3 order-first lg:order-none">
            <Card className="gap-0">
              <CardHeader>
                <div className="flex flex-col items-start justify-between gap-y-4">
                  <CardTitle className="flex flex-wrap gap-2">
                    Uw Ontwerp
                    {currentProjectName && (
                      <span className="text-sm text-muted-foreground">
                        (Project: {currentProjectName})
                      </span>
                    )}
                    {!currentProjectName && (
                      <span className="text-sm text-muted-foreground">
                        (Niet opgeslagen)
                      </span>
                    )}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {/* New Project Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="border"
                      onClick={handleNewProject}
                    >
                      <X className="size-4" />
                      Nieuw Project
                    </Button>

                    {/* Save Button & Dialog */}
                    <Dialog
                      open={showSaveDialog}
                      onOpenChange={setShowSaveDialog}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="border"
                          onClick={handleSaveDesign}
                        >
                          <Save className="size-4" />
                          Opslaan
                        </Button>
                      </DialogTrigger>
                      {!currentProjectId && showSaveDialog && (
                        <DialogContent className="sm:max-w-md ">
                          <DialogHeader>
                            <DialogTitle>Ontwerp Opslaan</DialogTitle>
                            <DialogDescription>
                              Sla het ontwerp op om het later raad te plegen.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex items-center gap-2">
                            <div className="grid flex-1 gap-2">
                              <Label
                                htmlFor="newProjectName"
                                className="text-background"
                              >
                                Projectnaam
                              </Label>
                              <Input
                                id="newProjectName"
                                value={newProjectName}
                                onChange={(e) =>
                                  setNewProjectName(e.target.value)
                                }
                                placeholder={`Bijv. Garage Ontwerp ${new Date().getFullYear()}`}
                              />
                            </div>
                          </div>
                          <DialogFooter className="sm:justify-start">
                            <div className="flex gap-2">
                              <Button
                                onClick={confirmNewSave}
                                disabled={!newProjectName.trim()}
                                className="text-background"
                              >
                                Opslaan
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={() => setShowSaveDialog(false)}
                              >
                                Annuleren
                              </Button>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>

                    {/* Load Button & Dialog */}
                    <Dialog
                      open={showLoadDialog}
                      onOpenChange={setShowLoadDialog}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="border relative"
                          onClick={loadSavedDesigns}
                        >
                          <FolderOpen className="size-4" />
                          Laden
                          <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                            {savedDesigns.length || 0}
                          </span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md w-max">
                        <DialogHeader>
                          <DialogTitle>Opgeslagen Ontwerpen</DialogTitle>
                          <DialogDescription>
                            Raadpleeg alle opgeslagen ontwerpen.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {savedDesigns.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">
                              Geen opgeslagen ontwerpen gevonden
                            </p>
                          ) : (
                            savedDesigns.map((design) => (
                              <div
                                key={design.id}
                                className="flex items-center justify-between gap-x-6 p-4 border rounded-lg bg-accent"
                              >
                                <div>
                                  <h3 className="font-semibold">
                                    {design.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {design.width}m x {design.length}m -{" "}
                                    {design.tilesPerWidth *
                                      design.tilesPerLength}{" "}
                                    tegels - {design.date}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  {currentProjectId !== design.id && (
                                    <Button
                                      size="sm"
                                      onClick={() => loadDesign(design)}
                                      className="text-background"
                                    >
                                      Laden
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => deleteDesign(design.id)}
                                    className=""
                                  >
                                    Verwijderen
                                  </Button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Export Design Button */}
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="border"
                        onClick={exportDesign}
                      >
                        <Download className="size-4" />
                        Exporteren als PNG
                      </Button>
                    </div>
                    {/* Export Summary Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="border"
                      onClick={exportSummary}
                    >
                      Samenvatting
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-4 mt-2">
                {/* Replaced CardDescription with div for instructions */}
                <div className="text-xs text-left mr-auto">
                  Klik, sleep of veeg om tegels te kleuren.
                  <br />
                  {isMobile ? (
                    <>
                      <span className="font-semibold">Mobile:</span>
                      Gebruik één vinger om te kleuren, twee vingers om te
                      knijpen en te zoomen en drie vingers om te pannen.
                    </>
                  ) : (
                    <>
                      <span className="font-semibold">Desktop:</span> Houd{" "}
                      `Shift` ingedrukt en sleep met de linkermuisknop om te
                      pannen, of scroll met `Shift` om te zoomen.
                    </>
                  )}
                </div>
                {isDimensionsValid && tilesPerWidth > 0 && tilesPerLength > 0 ? (
                  <div
                    // Added flexbox classes to the container to center the grid when it's smaller than the container
                    className={`relative overflow-auto border-2 border-gray-300 rounded-lg shadow-inner bg-gray-50 touch-none select-none max-w-full flex items-center justify-center ${
                      isFitToScreenMode ? "w-full" : "max-h-[80vh]"
                    }`}
                    style={{
                      width: containerDynamicDimensions.width,
                      height: containerDynamicDimensions.height,
                      cursor: isPanning
                        ? "grabbing"
                        : shiftPressed // Check shiftPressed here
                          ? "grab"
                          : "default",
                    }}
                    ref={gridContainerRef}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseUp}
                    onWheel={handleWheel}
                    onTouchEnd={handleTouchEnd}
                    onTouchMove={handleTouchMove}
                  >
                    {isLoadingGrid && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                        <p className="ml-4 text-primary font-semibold">
                          Laden...
                        </p>
                      </div>
                    )}
                    <div
                      className="grid bg-white border border-gray-200"
                      style={{
                        gridTemplateColumns: `repeat(${tilesPerWidth}, ${TILE_PIXEL_SIZE}px)`,
                        gridTemplateRows: `repeat(${tilesPerLength}, ${TILE_PIXEL_SIZE}px)`,
                        width: `${tilesPerWidth * TILE_PIXEL_SIZE}px`,
                        height: `${tilesPerLength * TILE_PIXEL_SIZE}px`,
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: "center", // Changed from "top left"
                      }}
                    >
                      {tiles.map((row, rowIndex) =>
                        row.map((tile, colIndex) => (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            className="tile border border-gray-200 transition-colors duration-75 ease-in-out"
                            style={{ backgroundColor: tile.color }}
                            onMouseDown={(e) =>
                              handleMouseDown(e, rowIndex, colIndex)
                            }
                            onTouchStart={(e) =>
                              handleTouchStart(e, rowIndex, colIndex)
                            }
                          />
                        ))
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-md text-muted-foreground bg-accent border p-4 rounded-lg">
                    Voer geldige rasterafmetingen (min.{" "}
                    {MIN_GRID_DIMENSION_METERS} tot max.{" "}
                    {MAX_GRID_DIMENSION_METERS} meter) in om te beginnen met
                    ontwerpen.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
