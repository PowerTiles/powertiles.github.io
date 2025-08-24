"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Save, Palette, Calculator, FolderOpen } from "lucide-react";

// Available tile colors
const TILE_COLORS = [
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

interface TileData {
  color: string;
  colorName: string;
}

interface SavedDesign {
  id: string;
  name: string;
  date: string;
  width: number;
  length: number;
  tiles: TileData[][];
  totalTiles: number;
  totalTilesWithWaste: number;
}

// Local storage key
const DESIGNER_STATE_KEY = "powerTilesDesigner";

export default function VloerDesigner() {
  const [width, setWidth] = useState<number>(4);
  const [length, setLength] = useState<number>(4);
  const [selectedColor, setSelectedColor] = useState(TILE_COLORS[0]);
  const [tiles, setTiles] = useState<TileData[][]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const tilesPerRow = Math.ceil(width / 0.4); // tilesWidth
  const tilesPerColumn = Math.ceil(length / 0.4); // tilesLength
  const totalTiles = tilesPerRow * tilesPerColumn;
  const wastePercentage = 10; // 10% waste factor
  const totalTilesWithWaste = Math.ceil(
    totalTiles * (1 + wastePercentage / 100)
  );

  // Save designer state to local storage
  const saveDesignerState = useCallback(
    (updatedTiles?: TileData[][]) => {
      const data = {
        width,
        length,
        selectedColor,
        tiles: updatedTiles || tiles,
        tilesPerRow,
        tilesPerColumn,
        totalTilesWithWaste,
      };
      localStorage.setItem(DESIGNER_STATE_KEY, JSON.stringify(data));
    },
    [width, length, selectedColor, tiles]
  );

  // Persist state whenever key values change
  // useEffect(() => {
  //   saveDesignerState();
  // }, [width, length, selectedColor, tiles, saveDesignerState]);

  // This useEffect replaces both the "persist state" and "initializeGrid" effects
  useEffect(() => {
    const stored = localStorage.getItem(DESIGNER_STATE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        // Validate required keys
        const hasAllData =
          parsed.width &&
          parsed.length &&
          parsed.selectedColor &&
          parsed.tiles &&
          Array.isArray(parsed.tiles);

        if (hasAllData) {
          // Restore saved state
          setWidth(parsed.width);
          setLength(parsed.length);
          setSelectedColor(parsed.selectedColor);
          setTiles(parsed.tiles);
          return;
        } else {
          localStorage.removeItem(DESIGNER_STATE_KEY);
        }
      } catch (err) {
        localStorage.removeItem(DESIGNER_STATE_KEY);
      }
    }

    // Initialize defaults if no valid saved data
    const defaultTiles: TileData[][] = [];
    const defaultTileColor = TILE_COLORS[0];
    setWidth(4);
    setLength(4);
    setSelectedColor(defaultTileColor);

    for (let i = 0; i < tilesPerColumn; i++) {
      const row: TileData[] = [];
      for (let j = 0; j < tilesPerRow; j++) {
        row.push({
          color: defaultTileColor.value,
          colorName: defaultTileColor.name,
        });
      }
      defaultTiles.push(row);
    }
    setTiles(defaultTiles);

    // Save the default state immediately
    saveDesignerState();
  }, []);

  // Handle tile click to change color
  const handleTileClick = (rowIndex: number, colIndex: number) => {
    const newTiles = [...tiles];
    newTiles[rowIndex][colIndex] = {
      color: selectedColor.value,
      colorName: selectedColor.name,
    };
    setTiles(newTiles);
  };

  // Fill all tiles with selected color
  const fillAllTiles = () => {
    const newTiles = tiles.map((row) =>
      row.map(() => ({
        color: selectedColor.value,
        colorName: selectedColor.name,
      }))
    );
    setTiles(newTiles);
  };

  // Create checkerboard pattern
  const createCheckerboard = () => {
    const newTiles = tiles.map((row, rowIndex) =>
      row.map((_, colIndex) => {
        const isEven = (rowIndex + colIndex) % 2 === 0;
        const color = isEven ? TILE_COLORS[0] : selectedColor;
        return {
          color: color.value,
          colorName: color.name,
        };
      })
    );
    setTiles(newTiles);
  };

  // Save design functionality
  const saveDesign = () => {
    if (!projectName.trim()) {
      alert("Voer een projectnaam in");
      return;
    }

    const design: SavedDesign = {
      id: Date.now().toString(),
      name: projectName,
      date: new Date().toLocaleDateString("nl-NL"),
      width,
      length,
      tiles: [...tiles],
      totalTiles,
      totalTilesWithWaste,
    };

    const existingDesigns = JSON.parse(
      localStorage.getItem("powerTilesDesigns") || "[]"
    );
    const updatedDesigns = [...existingDesigns, design];
    localStorage.setItem("powerTilesDesigns", JSON.stringify(updatedDesigns));
    setSavedDesigns(updatedDesigns);
    setShowSaveDialog(false);
    setProjectName("");
    alert("Ontwerp opgeslagen!");
  };

  // Load designs functionality
  const loadSavedDesigns = () => {
    const designs = JSON.parse(
      localStorage.getItem("powerTilesDesigns") || "[]"
    );
    setSavedDesigns(designs);
    setShowLoadDialog(true);
  };

  // Load specific design functionality
  const loadDesign = (design: SavedDesign) => {
    setWidth(design.width);
    setLength(design.length);
    setTiles(design.tiles);
    setShowLoadDialog(false);
    alert(`Ontwerp "${design.name}" geladen!`);
  };

  // Delete design functionality
  const deleteDesign = (designId: string) => {
    const updatedDesigns = savedDesigns.filter((d) => d.id !== designId);
    localStorage.setItem("powerTilesDesigns", JSON.stringify(updatedDesigns));
    setSavedDesigns(updatedDesigns);
  };

  // Export functionality
  const exportDesign = () => {
    if (!gridRef.current) return;

    // Create a canvas to draw the design
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tileSize = 20;
    canvas.width = tilesPerRow * tileSize;
    canvas.height = tilesPerColumn * tileSize;

    // Draw the tiles
    tiles.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        ctx.fillStyle = tile.color;
        ctx.fillRect(
          colIndex * tileSize,
          rowIndex * tileSize,
          tileSize,
          tileSize
        );

        // Add border
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

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `powertiles-ontwerp-${width}x${length}m-${new Date().toISOString().split("T")[0]}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  // Export summary functionality
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

Projectdetails:
- Afmetingen: ${width}m x ${length}m (${(width * length).toFixed(1)} m²)
- Tegels: ${tilesPerRow} x ${tilesPerColumn} = ${totalTiles} stuks
- Inclusief snijverlies (10%): ${totalTilesWithWaste} stuks

Kleurverdeling:
${Object.entries(colorCounts)
  .map(([color, count]) => `- ${color}: ${count} tegels`)
  .join("\n")}

Gegenereerd op: ${new Date().toLocaleDateString("nl-NL")} om ${new Date().toLocaleTimeString("nl-NL")}
PowerTiles - Transform Your Space. Unleash the Power.
    `.trim();

    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `powertiles-samenvatting-${width}x${length}m-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="bg-foreground max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-background mb-4">
            Vloer Designer
          </h1>
          <p className="text-xl text-muted-foreground">
            Ontwerp uw eigen garagevloer met onze geventileerde PVC-tegels
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Dimensions */}
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
                      {tilesPerRow} x {tilesPerColumn} = {totalTiles} stuks
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground pt-2">
                    Grid weergave: {tiles.length} x {tiles[0]?.length || 0} ={" "}
                    {tiles.length * (tiles[0]?.length || 0)} tegels
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Color Selection */}
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
                          ? "border-primary ring-2 ring-primary ring-opacity-50"
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

            {/* Calculation Results */}
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
                <Button className="w-full mt-4 text-background">
                  <Link
                    href={`/offerte?width=${width}&length=${length}&totalTiles=${totalTiles}&totalTilesWithWaste=${totalTilesWithWaste}`}
                    className="flex items-center gap-2"
                  >
                    Offerte Aanvragen
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Grid Area */}
          <div className="lg:col-span-3 order-first lg:order-none">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Uw Ontwerp</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="border"
                      onClick={() => saveDesignerState}
                    >
                      <FolderOpen className="h-4 w-4 mr-2" />
                      Opslaan in browser
                    </Button>
                    <Dialog
                      open={showSaveDialog}
                      onOpenChange={setShowSaveDialog}
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="border">
                          <Save className="h-4 w-4 mr-2" />
                          Opslaan
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ontwerp Opslaan</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="projectName">Projectnaam</Label>
                            <Input
                              id="projectName"
                              value={projectName}
                              onChange={(e) => setProjectName(e.target.value)}
                              placeholder="Bijv. Garage Ontwerp 2024"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={saveDesign}
                              className="bg-primary hover:bg-[#6BC91A] text-background"
                            >
                              Opslaan
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setShowSaveDialog(false)}
                            >
                              Annuleren
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="border"
                      onClick={loadSavedDesigns}
                    >
                      <FolderOpen className="h-4 w-4 mr-2" />
                      Laden
                    </Button>

                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="border"
                        onClick={exportDesign}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Exporteren
                      </Button>
                    </div>
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
                      gridTemplateColumns: `repeat(${tilesPerRow}, 1fr)`,
                      maxWidth: `${Math.min(600, tilesPerRow * 20 + +(tilesPerRow - 1) * 5)}px`,
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

        <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Opgeslagen Ontwerpen</DialogTitle>
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
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold">{design.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {design.width}m x {design.length}m - {design.totalTiles}{" "}
                        tegels - {design.date}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => loadDesign(design)}
                        className="bg-primary hover:bg-[#6BC91A] text-background"
                      >
                        Laden
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteDesign(design.id)}
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
      </div>
    </div>
  );
}
