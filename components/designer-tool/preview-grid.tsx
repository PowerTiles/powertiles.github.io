"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, X, ZoomOut } from "lucide-react"; // Icons for internal zoom buttons

// Grid constants
export const TILE_PIXEL_SIZE = 24;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 5.0;
const INITIAL_ZOOM = 1.0;
const DEFAULT_PINCH_SENSITIVITY = 0.005;

// Interface for individual tile data
export interface TileData {
  color: string;
  colorName: string;
}

// Interface for PreviewGrid props
interface PreviewGridProps {
  tiles: TileData[][];
  containerHeight?: string; // Optional height for the container, default to 600px
}

export default function PreviewGrid({
  tiles,
  containerHeight = "600px",
}: PreviewGridProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(INITIAL_ZOOM);
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
  const [shiftPressed, setShiftPressed] = useState<boolean>(false);
  const [pinchSensitivity] = useState<number>(DEFAULT_PINCH_SENSITIVITY); // pinchSensitivity fixed internally for preview
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const gridContainerRef = useRef<HTMLDivElement>(null);

  const tilesPerWidth = tiles.length > 0 ? tiles[0].length : 0;
  const tilesPerLength = tiles.length;

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
    window.addEventListener("resize", detectMobile);

    return () => {
      window.removeEventListener("resize", detectMobile);
    };
  }, []);

  // Event listeners for Shift key for desktop panning/zooming
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

  // --- Mouse Event Handlers for Panning and Zooming ---
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!gridContainerRef.current) return;

      if (shiftPressed) {
        // Desktop panning with Shift
        setIsPanning(true);
        setLastMousePos({ x: e.clientX, y: e.clientY });
        gridContainerRef.current.style.cursor = "grabbing";
      }
    },
    [shiftPressed]
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
      }
    },
    [isPanning, lastMousePos]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    setLastMousePos(null);
    if (gridContainerRef.current) {
      gridContainerRef.current.style.cursor = shiftPressed ? "grab" : "default";
    }
  }, [shiftPressed]);

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (shiftPressed) {
        // Desktop zoom with Shift key
        const zoomFactor = 0.1;
        let newZoomLevel = zoomLevel;

        if (e.deltaY < 0) {
          newZoomLevel = Math.min(MAX_ZOOM, zoomLevel + zoomFactor);
        } else {
          newZoomLevel = Math.max(MIN_ZOOM, zoomLevel - zoomFactor);
        }
        setZoomLevel(newZoomLevel);
      }
    },
    [zoomLevel, shiftPressed]
  );

  // --- Touch Event Handlers for Panning (1-finger) and Pinch-Zoom (2-finger) ---
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!gridContainerRef.current) return;

      if (e.touches.length === 1) {
        // Mobile: One finger for Panning
        setIsPanning(true);
        const avgPos = getAverageTouchPosition(e.touches as any);
        setLastTouchPanPos({ x: avgPos.x, y: avgPos.y });
        setInitialPinchDistance(null); // Reset pinch state
      } else if (e.touches.length === 2) {
        // Mobile: Two fingers for Pinch Zoom
        setInitialPinchDistance(getPinchDistance(e.touches as any));
        setLastTouchPanPos(null); // Reset pan state for 2 fingers
        setIsPanning(false); // Ensure panning is off
      }
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!gridContainerRef.current) return;

      if (e.touches.length === 1 && isPanning && lastTouchPanPos) {
        // Mobile: 1-finger pan
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
        let newZoomLevel = zoomLevel + deltaDistance * pinchSensitivity;
        newZoomLevel = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoomLevel));

        if (Math.abs(deltaDistance) > 3) {
          setZoomLevel(newZoomLevel);
          setInitialPinchDistance(currentPinchDistance);
        }
      }
    },
    [
      isPanning,
      lastTouchPanPos,
      zoomLevel,
      initialPinchDistance,
      pinchSensitivity,
    ]
  );

  const handleTouchEnd = useCallback(() => {
    setIsPanning(false);
    setLastTouchPanPos(null);
    setInitialPinchDistance(null);
  }, []);

  // Handler for internal zoom buttons
  const handleInternalZoomChange = (factor: number) => {
    let newZoomLevel = zoomLevel * factor;
    newZoomLevel = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoomLevel));
    setZoomLevel(newZoomLevel);
  };

  const currentCursor = isPanning
    ? "grabbing"
    : shiftPressed
      ? "grab"
      : "default";

  return (
    <div className="relative">
      {/* Internal Zoom Buttons with sticky positioning */}
      <div className="absolute bottom-3 left-3 flex flex-col gap-2 z-20">
        <Button
          size="icon"
          className="bg-foreground text-background shadow-md"
          onClick={() => handleInternalZoomChange(0.8)} // Zoom out
        >
          <ZoomOut className="h-4 w-4" />{" "}
          {/* Using X and rotating for a '-' effect */}
        </Button>
        <Button
          size="icon"
          className="bg-foreground text-background shadow-md"
          onClick={() => handleInternalZoomChange(1.25)} // Zoom in
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
      <div
        className={`relative overflow-auto border-2 border-gray-300 rounded-lg shadow-inner bg-gray-50 touch-none select-none max-w-full flex items-center justify-center`}
        style={{
          width: "100%",
          height: containerHeight,
          cursor: currentCursor,
        }}
        ref={gridContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {tilesPerWidth > 0 && tilesPerLength > 0 ? (
          <>
            <div
              className="grid bg-white border border-gray-200"
              style={{
                gridTemplateColumns: `repeat(${tilesPerWidth}, ${TILE_PIXEL_SIZE}px)`,
                gridTemplateRows: `repeat(${tilesPerLength}, ${TILE_PIXEL_SIZE}px)`,
                width: `${tilesPerWidth * TILE_PIXEL_SIZE}px`,
                height: `${tilesPerLength * TILE_PIXEL_SIZE}px`,
                transform: `scale(${zoomLevel})`,
                transformOrigin: "center",
              }}
            >
              {tiles.map((row, rowIndex) =>
                row.map((tile, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="tile border border-gray-200 transition-colors duration-75 ease-in-out"
                    style={{ backgroundColor: tile.color }}
                  />
                ))
              )}
            </div>
          </>
        ) : (
          <div className="text-md text-muted-foreground bg-accent border p-4 rounded-lg">
            Geen rastergegevens beschikbaar voor preview.
          </div>
        )}
      </div>
    </div>
  );
}
