"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Download, Save, Palette, Calculator, FolderOpen, X } from "lucide-react"; // Icons for UI

// Interface for tile colors
export interface color {
  name: string;
  value: string;
}

// Predefined tile colors
const TILE_COLORS: color[] = [
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

// Interface for individual tile data
export interface TileData {
  color: string;
  colorName: string;
}

// Interface for a saved design project
export interface SavedDesign {
  id: string; // Unique identifier for the project
  name: string; // Name of the project
  selectedColor?: color; // The color selected in the palette when saved
  date: string; // Date when the project was last saved
  width: number;
  length: number;
  tiles: TileData[][]; // 2D array representing the tile grid
  tilesPerWidth: number;
  tilesPerLength: number;
  totalTilesWithWaste: number;
}

// Local storage keys for saving designs and the current project
const DESIGNER_STATE_KEY = "powerTilesDesigns"; // Stores all saved projects
const CURRENT_PROJECT_KEY = "powerTilesCurrentProject"; // Stores the ID and name of the last opened project

// Fixed variable indicating the maximum number of projects a user can store
const MAX_PROJECTS_LIMIT = 10;

export default function VloerDesigner() {
  // State for floor dimensions
  const [width, setWidth] = useState<number>(4);
  const [length, setLength] = useState<number>(4);
  // State for the currently selected color in the palette
  const [selectedColor, setSelectedColor] = useState<color>(TILE_COLORS[0]);
  // State for the 2D array representing the tile grid
  const [tiles, setTiles] = useState<TileData[][]>([]);

  // State for the name input when saving a *new* project
  const [newProjectName, setNewProjectName] = useState<string>("");
  // State for the ID of the currently loaded project
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  // State for the name of the currently loaded project
  const [currentProjectName, setCurrentProjectName] = useState<string | null>(null);

  // States for controlling dialog visibility
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);

  // New state to manage when a project is being loaded, to prevent other effects from interfering
  const [isProjectLoading, setIsProjectLoading] = useState(false);

  // Ref to track if the initial auto-load toast has been shown
  const initialLoadToastShownRef = useRef(false);

  // Ref for the grid container to facilitate canvas export
  const gridRef = useRef<HTMLDivElement>(null);

  // Derived calculations for tile dimensions and waste
  const tilesPerWidth = Math.ceil(width / 0.4);
  const tilesPerLength = Math.ceil(length / 0.4);
  const totalTiles = tilesPerWidth * tilesPerLength;
  const wastePercentage = 10; // 10% waste factor
  const totalTilesWithWaste = Math.ceil(
    totalTiles * (1 + wastePercentage / 100)
  );

  // Helper function to generate a unique ID for new projects
  const generateUniqueId = useCallback(() => crypto.randomUUID(), []);

  // Function to load a design's state into the designer
  const loadDesignState = useCallback((design: SavedDesign) => {
    // These state updates will be batched by React
    setWidth(design.width);
    setLength(design.length);
    setSelectedColor(design.selectedColor || TILE_COLORS[0]);
    setTiles(design.tiles); // This is the authoritative update for tiles
    setCurrentProjectId(design.id);
    setCurrentProjectName(design.name);
    setNewProjectName("");
  }, []); // No need for isProjectLoading here, it's managed by the calling useEffect

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
    const initialTilesPerWidth = Math.ceil(defaultWidth / 0.4);
    const initialTilesPerLength = Math.ceil(defaultLength / 0.4);

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
  }, []); // No external dependencies

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

    if (storedCurrentProject && storedCurrentProject.id && storedCurrentProject.name) {
      const foundProject = existingDesigns.find(
        (design) => design.id === storedCurrentProject.id
      );

      if (foundProject) {
        // Temporarily set flag to disable dimension effect while project is being loaded
        setIsProjectLoading(true);
        loadDesignState(foundProject); // This will set all relevant states, including 'tiles'
        
        // Only show the toast if it hasn't been shown during this mount/remount cycle
        if (!initialLoadToastShownRef.current) {
          toast.success(`Project "${foundProject.name}" automatisch geladen.`, {
            duration: 3000,
            closeButton: true,
          });
          initialLoadToastShownRef.current = true; // Mark as shown
        }

        // Reset the flag after a short delay to allow all state updates to process
        const timer = setTimeout(() => setIsProjectLoading(false), 50);
        needsInitializeDefault = false; // Project was loaded, no need for default init
        return () => {
          clearTimeout(timer);
          initialLoadToastShownRef.current = false; // Reset on unmount
        };
      } else {
        localStorage.removeItem(CURRENT_PROJECT_KEY); // Clean up invalid stored current project key
      }
    }

    if (needsInitializeDefault) {
      initializeDefaultDesign(); // Fallback to default if no valid project loaded
    }
  }, [initializeDefaultDesign, loadDesignState]); // Dependencies for useCallback functions

  // Effect to re-render the tile grid when width or length dimensions change
  useEffect(() => {
    // If a project is currently being loaded, bypass this effect.
    // The loadDesignState function directly sets the tiles array.
    if (isProjectLoading) {
      return;
    }

    // Determine the current dimensions of the 'tiles' state for comparison
    const currentGridHeight = tiles.length;
    const currentGridWidth = tiles.length > 0 ? tiles[0]?.length : 0;

    // Only proceed if the current grid's dimensions differ from the target dimensions.
    // This prevents unnecessary updates and preserves the loaded project's tile data
    // if its dimensions already match.
    if (currentGridHeight === tilesPerLength && currentGridWidth === tilesPerWidth) {
      return; // Dimensions match, no need to resize or rebuild the grid from this effect.
    }

    // If dimensions don't match, we need to create a new grid adapted to the new size.
    const newTiles: TileData[][] = [];
    const currentDefaultColor = selectedColor || TILE_COLORS[0];

    for (let i = 0; i < tilesPerLength; i++) {
      const row: TileData[] = [];
      for (let j = 0; j < tilesPerWidth; j++) {
        const existingTile = tiles[i]?.[j]; // Refer to the current state of 'tiles'
        row.push(
          existingTile
            ? { ...existingTile } // Deep copy existing tile content to new grid
            : { color: currentDefaultColor.value, colorName: currentDefaultColor.name } // Fill new areas with default color
        );
      }
      newTiles.push(row);
    }
    setTiles(newTiles); // Update the state with the newly sized grid
  }, [width, length, tilesPerWidth, tilesPerLength, selectedColor, isProjectLoading]); // 'tiles' is intentionally NOT a dependency here to prevent loops

  // Handler for clicking on an individual tile to change its color
  const handleTileClick = (rowIndex: number, colIndex: number) => {
    const newTiles = [...tiles]; // Create a shallow copy of the tile grid
    // Update the color of the clicked tile
    newTiles[rowIndex][colIndex] = {
      color: selectedColor.value,
      colorName: selectedColor.name,
    };
    setTiles(newTiles); // Update the state with the new tile grid
  };

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
  const saveCurrentDesign = useCallback((name: string, id?: string): SavedDesign | null => {
    let designId = id || generateUniqueId();
    const designName = name.trim();

    // Retrieve existing designs to check for uniqueness/limit
    const existingDesigns: SavedDesign[] = JSON.parse(
        localStorage.getItem(DESIGNER_STATE_KEY) || "[]"
    );

    // Check for uniqueness for *new* projects (if an ID is not provided)
    if (!id && existingDesigns.some((d) => d.name === designName)) {
        toast.error(`Er bestaat al een project met de naam "${designName}".`, {
            duration: 3000,
            closeButton: true,
        });
        return null; // Indicate failure
    }

    // Check project limit only for *new* projects
    if (!id && existingDesigns.length >= MAX_PROJECTS_LIMIT) {
        toast.error(`Maximaal ${MAX_PROJECTS_LIMIT} projecten toegestaan. Verwijder een oud project om een nieuw project op te slaan.`, {
            duration: 5000,
            closeButton: true,
        });
        return null; // Indicate failure
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
    const existingIndex = existingDesigns.findIndex((d) => d.id === design.id);

    if (existingIndex !== -1) {
        // Update existing project
        updatedDesigns = [...existingDesigns];
        updatedDesigns[existingIndex] = design;
    } else {
        // Add new project
        updatedDesigns = [...existingDesigns, design];
    }

    localStorage.setItem(DESIGNER_STATE_KEY, JSON.stringify(updatedDesigns));
    setSavedDesigns(updatedDesigns);
    setCurrentProjectId(design.id);
    setCurrentProjectName(design.name);
    localStorage.setItem(CURRENT_PROJECT_KEY, JSON.stringify({ id: design.id, name: design.name }));

    return design; // Return the successfully saved design object
  }, [generateUniqueId, selectedColor, width, length, tiles, tilesPerWidth, tilesPerLength, totalTilesWithWaste, setSavedDesigns, setCurrentProjectId, setCurrentProjectName]); // Dependencies for useCallback


  // Main save logic for handling both updating an existing project and saving a new one
  const handleSaveDesign = () => {
    if (currentProjectId && currentProjectName) {
      // Project is already open, update it directly
      const savedDesign = saveCurrentDesign(currentProjectName, currentProjectId);
      if (savedDesign) {
        toast.success(`Project "${currentProjectName}" is bijgewerkt.`, {
          duration: 3000,
          closeButton: true,
        });
      }
    } else {
      // No project open, show dialog to ask for a new project name
      setNewProjectName(""); // Ensure input field is clear
      setShowSaveDialog(true);
    }
  };

  // Function called when confirming to save a *new* project (from the dialog)
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
    // Set the flag before loading and reset after a short delay
    setIsProjectLoading(true);
    loadDesignState(design); // Apply the design's state to the designer
    // Store the newly loaded project as the current project in local storage
    localStorage.setItem(CURRENT_PROJECT_KEY, JSON.stringify({ id: design.id, name: design.name }));
    setShowLoadDialog(false); // Close the load dialog
    toast.success(`Project "${design.name}" geladen!`, {
      duration: 3000,
      closeButton: true,
    });
    // Reset the flag after a short delay to allow all state updates to process
    setTimeout(() => setIsProjectLoading(false), 50);
  };

  // Handler to delete a specific design from local storage
  const deleteDesign = (designId: string) => {
    const updatedDesigns = savedDesigns.filter((d) => d.id !== designId);
    localStorage.setItem(DESIGNER_STATE_KEY, JSON.stringify(updatedDesigns));
    setSavedDesigns(updatedDesigns);

    // If the deleted design was the currently open project, reset the designer
    if (currentProjectId === designId) {
      setCurrentProjectId(null);
      setCurrentProjectName(null);
      localStorage.removeItem(CURRENT_PROJECT_KEY); // Clear current project from local storage
      initializeDefaultDesign(); // Reset to a default blank design
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
    if (currentProjectId) { // If a project is currently open
      toast.info("Weet je zeker dat je het huidige project wilt sluiten en een nieuw, leeg project wilt starten? Niet-opgeslagen wijzigingen gaan verloren.", {
        duration: 5000,
        action: {
          label: "Ja, start nieuw",
          onClick: () => {
            setCurrentProjectId(null);
            setCurrentProjectName(null);
            localStorage.removeItem(CURRENT_PROJECT_KEY); // Clear current project from local storage
            initializeDefaultDesign();
            toast.success("Nieuw project gestart.", {
              duration: 3000,
              closeButton: true,
            });
          },
        },
        closeButton: true,
      });
    } else { // No project currently open, proceed directly
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
        // Project is already open, save (update) it
        projectToNavigateWith = saveCurrentDesign(currentProjectName, currentProjectId);
        if (projectToNavigateWith) {
            toastMessage = `Huidig project "${currentProjectName}" opgeslagen voor offerteaanvraag.`;
        }
    } else {
        // No project open, create a new one with a generated name
        // Generate a random 8-digit number string
        const randomNumberString = Math.floor(10000000 + Math.random() * 90000000).toString();
        const generatedName = `offerte-${randomNumberString}`;
        projectToNavigateWith = saveCurrentDesign(generatedName);
        if (projectToNavigateWith) {
            toastMessage = `Nieuw project "${projectToNavigateWith.name}" opgeslagen voor offerteaanvraag.`;
        }
    }

    if (projectToNavigateWith && projectToNavigateWith.id) {
        // Display toast message
        toast.success(toastMessage, {
            duration: 3000, // Make sure toast is visible for at least 3 seconds
            closeButton: true,
        });

        // Introduce a delay before navigating
        setTimeout(() => {
            window.location.href = `/offerte?projectId=${projectToNavigateWith.id}`;
        }, 3000); // 3-second delay
    } else {
        toast.error("Kan project niet opslaan of genereren voor offerteaanvraag.", {
            duration: 5000,
            closeButton: true,
        });
    }
  };


  // Handler to export the current design as a PNG image
  const exportDesign = () => {
    if (!gridRef.current) {
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

    const tileSize = 40; // Size of each tile in the exported image
    canvas.width = tilesPerWidth * tileSize;
    canvas.height = tilesPerLength * tileSize;

    // Draw each tile onto the canvas
    tiles.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        ctx.fillStyle = tile.color;
        ctx.fillRect(
          colIndex * tileSize,
          rowIndex * tileSize,
          tileSize,
          tileSize
        );

        // Add a border to each tile for clear separation
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1;
        ctx.strokeRect(
          colIndex * tileSize,
          rowIndex * tileSize,
          tileSize,
          tileSize
        );
      });
    });

    // Convert the canvas content to a PNG blob and trigger a download
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
      // Construct filename, including project name if available
      a.download = `${currentProjectName ? currentProjectName + "-" : ""}powertiles-ontwerp-${width}x${length}m-${new Date().toISOString().split("T")[0]}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up the object URL
    }, "image/png"); // Specify PNG format
  };

  // Handler to export a summary of the current design as a text file
  const exportSummary = () => {
    const colorCounts: { [key: string]: number } = {};

    // Count the occurrences of each color in the grid
    tiles.forEach((row) => {
      row.forEach((tile) => {
        colorCounts[tile.colorName] = (colorCounts[tile.colorName] || 0) + 1;
      });
    });

    // Construct the summary text
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

    // Create a Blob for the text file and trigger a download
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    // Construct filename, including project name if available
    a.download = `${currentProjectName ? currentProjectName + "-" : ""}powertiles-samenvatting-${width}x${length}m-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the object URL
  };

  return (
    <div className="min-h-screen bg-foreground">
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-background mb-4">
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
                    min="1"
                    max="20"
                    step="0.1"
                    value={width}
                    className="max-w-[240px]"
                    onChange={(e) => {
                      setWidth(Number.parseFloat(e.target.value) || 1);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="length">Lengte (meter)</Label>
                  <Input
                    id="length"
                    type="number"
                    min="1"
                    max="20"
                    step="0.1"
                    value={length}
                    className="max-w-[240px]"
                    onChange={(e) => {
                      setLength(Number.parseFloat(e.target.value) || 1);
                    }}
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
                    Grid weergave: {tiles.length} x {tiles[0]?.length || 0} ={" "}
                    {tiles.length * (tiles[0]?.length || 0)} tegels
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
                    className="w-full text-background"
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

            {/* Calculation Results Card */}
            <Card>
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
                <Button className="w-full mt-4 text-background" onClick={handleRequestQuote}>
                  <span className="flex items-center gap-2">
                    Offerte Aanvragen
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Grid Area */}
          <div className="lg:col-span-3 order-first lg:order-none">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    Uw Ontwerp
                    {/* Display current project name or "Not saved" */}
                    {currentProjectName && (
                      <span className="text-sm text-muted-foreground ml-2">
                        (Project: {currentProjectName})
                      </span>
                    )}
                    {!currentProjectName && (
                      <span className="text-sm text-muted-foreground ml-2">
                        (Niet opgeslagen)
                      </span>
                    )}
                  </CardTitle>
                  <div className="flex gap-2">
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
                      open={showSaveDialog} // Control dialog visibility
                      onOpenChange={setShowSaveDialog}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="border"
                          onClick={handleSaveDesign} // Calls main save logic
                        >
                          <Save className="size-4" />
                          Opslaan
                        </Button>
                      </DialogTrigger>
                      {/* Dialog content is only rendered if no project is currently open (for new saves) */}
                      {!currentProjectId && showSaveDialog && (
                        <DialogContent className="sm:max-w-md bg-foreground text-background">
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
                                className="text-background"
                              />
                            </div>
                          </div>
                          <DialogFooter className="sm:justify-start">
                            <div className="flex gap-2">
                              <Button
                                onClick={confirmNewSave} // Calls logic to confirm new save
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
                          onClick={loadSavedDesigns} // Triggers fetching and opening dialog
                        >
                          <FolderOpen className="size-4" />
                          Laden
                          {/* Notification circle for number of saved designs */}
                          <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                            {savedDesigns.length || 0}
                          </span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md bg-foreground text-background w-max">
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
                                  {/* Conditionally render "Laden" button based on current project */}
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
                                    className="bg-foreground"
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
              <CardContent>
                <div className="bg-foreground border rounded-lg p-4 overflow-auto">
                  <div
                    ref={gridRef}
                    className="grid gap-1 mx-auto"
                    style={{
                      gridTemplateColumns: `repeat(${tilesPerWidth}, 1fr)`,
                      // Max width calculation to keep the grid responsive yet constrained
                      maxWidth: `${Math.min(600, tilesPerWidth * 20 + +(tilesPerWidth - 1) * 5)}px`,
                    }}
                  >
                    {tiles.map((row, rowIndex) =>
                      row.map((tile, colIndex) => (
                        <button
                          key={`${rowIndex}-${colIndex}`}
                          onClick={() => handleTileClick(rowIndex, colIndex)}
                          className="aspect-square border border-muted-foreground hover:border-gray-500 transition-colors"
                          style={{
                            backgroundColor: tile.color,
                            minWidth: "20px",
                            minHeight: "20px",
                          }}
                          title={`${tile.colorName} (${rowIndex + 1}, ${colIndex + 1})`}
                        />
                      ))
                    )}
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Klik op een tegel om de kleur te wijzigen
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
