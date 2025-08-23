"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, Save, Palette, Calculator, FolderOpen } from "lucide-react"

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
]

interface TileData {
  color: string
  colorName: string
}

interface SavedDesign {
  id: string
  name: string
  date: string
  width: number
  length: number
  tiles: TileData[][]
  totalTiles: number
  tilesWithWaste: number
}

export default function VloerDesigner() {
  const [width, setWidth] = useState<number>(4)
  const [length, setLength] = useState<number>(4)
  const [selectedColor, setSelectedColor] = useState(TILE_COLORS[0])
  const [tiles, setTiles] = useState<TileData[][]>([])
  const [projectName, setProjectName] = useState<string>("")
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([])
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showLoadDialog, setShowLoadDialog] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const tilesWidth = Math.ceil(width / 0.4)
  const tilesLength = Math.ceil(length / 0.4)
  const totalTiles = tilesWidth * tilesLength
  const wastePercentage = 10 // 10% waste factor
  const tilesWithWaste = Math.ceil(totalTiles * (1 + wastePercentage / 100))

  // Initialize grid when dimensions change
  const initializeGrid = useCallback(() => {
    const newTiles: TileData[][] = []
    for (let i = 0; i < tilesLength; i++) {
      const row: TileData[] = []
      for (let j = 0; j < tilesWidth; j++) {
        row.push({
          color: TILE_COLORS[0].value,
          colorName: TILE_COLORS[0].name,
        })
      }
      newTiles.push(row)
    }
    setTiles(newTiles)
  }, [tilesWidth, tilesLength])

  useEffect(() => {
    initializeGrid()
  }, [initializeGrid])

  // Handle tile click to change color
  const handleTileClick = (rowIndex: number, colIndex: number) => {
    const newTiles = [...tiles]
    newTiles[rowIndex][colIndex] = {
      color: selectedColor.value,
      colorName: selectedColor.name,
    }
    setTiles(newTiles)
  }

  // Fill all tiles with selected color
  const fillAllTiles = () => {
    const newTiles = tiles.map((row) =>
      row.map(() => ({
        color: selectedColor.value,
        colorName: selectedColor.name,
      })),
    )
    setTiles(newTiles)
  }

  // Create checkerboard pattern
  const createCheckerboard = () => {
    const newTiles = tiles.map((row, rowIndex) =>
      row.map((_, colIndex) => {
        const isEven = (rowIndex + colIndex) % 2 === 0
        const color = isEven ? TILE_COLORS[0] : selectedColor
        return {
          color: color.value,
          colorName: color.name,
        }
      }),
    )
    setTiles(newTiles)
  }

  // Save design functionality
  const saveDesign = () => {
    if (!projectName.trim()) {
      alert("Voer een projectnaam in")
      return
    }

    const design: SavedDesign = {
      id: Date.now().toString(),
      name: projectName,
      date: new Date().toLocaleDateString("nl-NL"),
      width,
      length,
      tiles: [...tiles],
      totalTiles,
      tilesWithWaste,
    }

    const existingDesigns = JSON.parse(localStorage.getItem("powerTilesDesigns") || "[]")
    const updatedDesigns = [...existingDesigns, design]
    localStorage.setItem("powerTilesDesigns", JSON.stringify(updatedDesigns))
    setSavedDesigns(updatedDesigns)
    setShowSaveDialog(false)
    setProjectName("")
    alert("Ontwerp opgeslagen!")
  }

  // Load designs functionality
  const loadSavedDesigns = () => {
    const designs = JSON.parse(localStorage.getItem("powerTilesDesigns") || "[]")
    setSavedDesigns(designs)
    setShowLoadDialog(true)
  }

  // Load specific design functionality
  const loadDesign = (design: SavedDesign) => {
    setWidth(design.width)
    setLength(design.length)
    setTiles(design.tiles)
    setShowLoadDialog(false)
    alert(`Ontwerp "${design.name}" geladen!`)
  }

  // Delete design functionality
  const deleteDesign = (designId: string) => {
    const updatedDesigns = savedDesigns.filter((d) => d.id !== designId)
    localStorage.setItem("powerTilesDesigns", JSON.stringify(updatedDesigns))
    setSavedDesigns(updatedDesigns)
  }

  // Export functionality
  const exportDesign = () => {
    if (!gridRef.current) return

    // Create a canvas to draw the design
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const tileSize = 20
    canvas.width = tilesWidth * tileSize
    canvas.height = tilesLength * tileSize

    // Draw the tiles
    tiles.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        ctx.fillStyle = tile.color
        ctx.fillRect(colIndex * tileSize, rowIndex * tileSize, tileSize, tileSize)

        // Add border
        ctx.strokeStyle = "#333"
        ctx.lineWidth = 1
        ctx.strokeRect(colIndex * tileSize, rowIndex * tileSize, tileSize, tileSize)
      })
    })

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return

      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `powertiles-ontwerp-${width}x${length}m-${new Date().toISOString().split("T")[0]}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    })
  }

  // Export summary functionality
  const exportSummary = () => {
    const colorCounts: { [key: string]: number } = {}

    tiles.forEach((row) => {
      row.forEach((tile) => {
        colorCounts[tile.colorName] = (colorCounts[tile.colorName] || 0) + 1
      })
    })

    const summary = `
PowerTiles Vloer Ontwerp Samenvatting
=====================================

Projectdetails:
- Afmetingen: ${width}m × ${length}m (${(width * length).toFixed(1)} m²)
- Tegels: ${tilesWidth} × ${tilesLength} = ${totalTiles} stuks
- Inclusief snijverlies (10%): ${tilesWithWaste} stuks

Kleurverdeling:
${Object.entries(colorCounts)
  .map(([color, count]) => `- ${color}: ${count} tegels`)
  .join("\n")}

Gegenereerd op: ${new Date().toLocaleDateString("nl-NL")} om ${new Date().toLocaleTimeString("nl-NL")}
PowerTiles - Transform Your Space. Unleash the Power.
    `.trim()

    const blob = new Blob([summary], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `powertiles-samenvatting-${width}x${length}m-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/powertiles-logo-complete.png"
                alt="PowerTiles - Transform Your Space. Unleash the Power."
                width={240}
                height={64}
                className="h-16 w-auto"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-[#7ED321] transition-colors">
              Home
            </Link>
            <Link href="/producten" className="hover:text-[#7ED321] transition-colors">
              Producten
            </Link>
            <Link href="/designer-tool" className="text-[#7ED321] font-semibold">
              Designer Tool
            </Link>
            <Link href="/over-ons" className="hover:text-[#7ED321] transition-colors">
              Over Ons
            </Link>
            <Link href="/contact" className="hover:text-[#7ED321] transition-colors">
              Contact
            </Link>
          </nav>
          <Link href="/offerte">
            <Button className="bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold">Offerte Aanvragen</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">Vloer Designer</h1>
          <p className="text-xl text-gray-600">Ontwerp uw eigen garagevloer met onze geventileerde PVC-tegels</p>
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
                <div>
                  <Label htmlFor="width">Breedte (meter)</Label>
                  <Input
                    id="width"
                    type="number"
                    min="1"
                    max="20"
                    step="0.1"
                    value={width}
                    onChange={(e) => {
                      setWidth(Number.parseFloat(e.target.value) || 1)
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="length">Lengte (meter)</Label>
                  <Input
                    id="length"
                    type="number"
                    min="1"
                    max="20"
                    step="0.1"
                    value={length}
                    onChange={(e) => {
                      setLength(Number.parseFloat(e.target.value) || 1)
                    }}
                  />
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-600">
                    Oppervlakte:{" "}
                    <span className="font-semibold">
                      {width} × {length} = {(width * length).toFixed(1)} m²
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Tegels:{" "}
                    <span className="font-semibold">
                      {tilesWidth} × {tilesLength} = {totalTiles} stuks
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Grid weergave: {tiles.length} × {tiles[0]?.length || 0} = {tiles.length * (tiles[0]?.length || 0)}{" "}
                    tegels
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
                          ? "border-[#7ED321] ring-2 ring-[#7ED321] ring-opacity-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Geselecteerd: <span className="font-semibold">{selectedColor.name}</span>
                </p>
                <div className="space-y-2">
                  <Button onClick={fillAllTiles} className="w-full bg-[#7ED321] hover:bg-[#6BC91A] text-black">
                    Alle Tegels Vullen
                  </Button>
                  <Button onClick={createCheckerboard} variant="outline" className="w-full bg-transparent">
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
                  <span className="font-semibold">{tilesWithWaste - totalTiles}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Totaal bestellen:</span>
                  <span className="font-bold text-[#7ED321]">{tilesWithWaste}</span>
                </div>
                <Button className="w-full mt-4 bg-[#7ED321] hover:bg-[#6BC91A] text-black">
                  <Link
                    href={`/offerte?design=true&width=${width}&length=${length}&totalTiles=${totalTiles}&tilesWithWaste=${tilesWithWaste}&surface=${(width * length).toFixed(1)}`}
                    className="flex items-center gap-2"
                  >
                    Offerte Aanvragen
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Grid Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Uw Ontwerp</CardTitle>
                  <div className="flex gap-2">
                    <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
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
                            <Button onClick={saveDesign} className="bg-[#7ED321] hover:bg-[#6BC91A] text-black">
                              Opslaan
                            </Button>
                            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                              Annuleren
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm" onClick={loadSavedDesigns}>
                      <FolderOpen className="h-4 w-4 mr-2" />
                      Laden
                    </Button>

                    <div className="relative">
                      <Button variant="outline" size="sm" onClick={exportDesign}>
                        <Download className="h-4 w-4 mr-2" />
                        Exporteren
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" onClick={exportSummary}>
                      Samenvatting
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-4 overflow-auto">
                  <div
                    ref={gridRef}
                    className="grid gap-1 mx-auto"
                    style={{
                      gridTemplateColumns: `repeat(${tilesWidth}, 1fr)`,
                      maxWidth: `${Math.min(600, tilesWidth * 20)}px`,
                    }}
                  >
                    {tiles.map((row, rowIndex) =>
                      row.map((tile, colIndex) => (
                        <button
                          key={`${rowIndex}-${colIndex}`}
                          onClick={() => handleTileClick(rowIndex, colIndex)}
                          className="aspect-square border border-gray-300 hover:border-gray-500 transition-colors"
                          style={{
                            backgroundColor: tile.color,
                            minWidth: "20px",
                            minHeight: "20px",
                          }}
                          title={`${tile.colorName} (${rowIndex + 1}, ${colIndex + 1})`}
                        />
                      )),
                    )}
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-4">Klik op een tegel om de kleur te wijzigen</p>
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
                <p className="text-gray-500 text-center py-8">Geen opgeslagen ontwerpen gevonden</p>
              ) : (
                savedDesigns.map((design) => (
                  <div key={design.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{design.name}</h3>
                      <p className="text-sm text-gray-600">
                        {design.width}m × {design.length}m - {design.totalTiles} tegels - {design.date}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => loadDesign(design)}
                        className="bg-[#7ED321] hover:bg-[#6BC91A] text-black"
                      >
                        Laden
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteDesign(design.id)}>
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
  )
}
