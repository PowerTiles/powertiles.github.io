import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, Palette, Camera, Lightbulb, Zap, Settings } from "lucide-react"

export default function HexagonaleLEDVerlichtingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Image
                src="/powertiles-logo-complete.png"
                alt="PowerTiles - Transform Your Space. Unleash the Power."
                width={200}
                height={64}
                className="h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-[#7ED321] transition-colors">
              Home
            </Link>
            <Link href="/producten" className="text-[#7ED321]">
              Producten
            </Link>
            <Link href="/designer-tool" className="hover:text-[#7ED321] transition-colors">
              Designer Tool
            </Link>
            <Link href="/over-ons" className="hover:text-[#7ED321] transition-colors">
              Over Ons
            </Link>
            <Link href="/contact" className="hover:text-[#7ED321] transition-colors">
              Contact
            </Link>
          </nav>
          <Button asChild className="bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold">
            <Link href="/offerte">Offerte Aanvragen</Link>
          </Button>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white py-4 px-6 border-b">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-[#7ED321]">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/producten" className="text-gray-500 hover:text-[#7ED321]">
            Producten
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Hexagonale LED-verlichting</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Link
                href="/producten"
                className="inline-flex items-center text-[#7ED321] hover:text-[#6BC91A] transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar Producten
              </Link>
              <div className="space-y-4">
                <Badge className="bg-[#7ED321] text-black px-4 py-2 text-sm font-semibold">
                  Innovatieve Technologie
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight">Hexagonale LED-verlichting</h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Revolutionaire LED-verlichtingssystemen die uw ruimte transformeren met moderne hexagonale patronen en
                  slimme besturing.
                </p>
              </div>
              <Button asChild size="lg" className="bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold">
                <Link href="/offerte">Offerte Aanvragen</Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/hexagonal-led-lighting.png"
                alt="Moderne hexagonale LED-verlichting systeem"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-black">Productbeschrijving</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Onze hexagonale LED-verlichting combineert functionaliteit met een adembenemend visueel effect. Het
                    geometrische hexagonale patroon creëert een moderne, futuristische uitstraling die perfect past in
                    garages, showrooms en werkplaatsen.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Het systeem is volledig aanpasbaar qua kleur, intensiteit en patronen, waardoor u de perfecte sfeer
                    kunt creëren voor elke gelegenheid. Van functionele werkverlichting tot sfeervolle
                    accentverlichting.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-black">Technische Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-16 h-16 bg-[#7ED321] rounded-full flex items-center justify-center">
                        <Lightbulb className="h-8 w-8 text-black" />
                      </div>
                      <h4 className="font-semibold text-black">Smart Control</h4>
                      <p className="text-sm text-gray-600">App-besturing voor kleur en intensiteit</p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-16 h-16 bg-[#7ED321] rounded-full flex items-center justify-center">
                        <Zap className="h-8 w-8 text-black" />
                      </div>
                      <h4 className="font-semibold text-black">Energie Efficiënt</h4>
                      <p className="text-sm text-gray-600">LED-technologie met laag verbruik</p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-16 h-16 bg-[#7ED321] rounded-full flex items-center justify-center">
                        <Settings className="h-8 w-8 text-black" />
                      </div>
                      <h4 className="font-semibold text-black">Modulair</h4>
                      <p className="text-sm text-gray-600">Uitbreidbaar systeem naar wens</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-black">Toepassingen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-black">Residentieel</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Luxe garages</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Home theaters</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Game rooms</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Werkplaatsen</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-black">Commercieel</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Autoshowrooms</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Retail spaces</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Evenementenruimtes</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Kantoren</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Specifications */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-black">Technische Specificaties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">LED Type:</span>
                      <span className="font-medium text-black">RGB + Warm White</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vermogen:</span>
                      <span className="font-medium text-black">12W per paneel</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Spanning:</span>
                      <span className="font-medium text-black">24V DC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Levensduur:</span>
                      <span className="font-medium text-black">50.000+ uur</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Besturing:</span>
                      <span className="font-medium text-black">WiFi + App</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Installatie:</span>
                      <span className="font-medium text-black">Plug & Play</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Garantie:</span>
                      <span className="font-medium text-black">5 jaar</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-black flex items-center">
                    <Palette className="h-5 w-5 mr-2 text-[#7ED321]" />
                    Kleur Opties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">Miljoenen kleuren mogelijk via RGB-technologie</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-white border rounded"></div>
                      <span className="text-sm text-gray-700">Warm wit (3000K)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="text-sm text-gray-700">Koel wit (6000K)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded"></div>
                      <span className="text-sm text-gray-700">RGB (16+ miljoen kleuren)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-black flex items-center">
                    <Camera className="h-5 w-5 mr-2 text-[#7ED321]" />
                    Fotogalerij
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Upload hier extra productfoto's en installatie-voorbeelden</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="aspect-square bg-gray-200 rounded flex items-center justify-center">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="aspect-square bg-gray-200 rounded flex items-center justify-center">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">Transformeer uw ruimte met LED-verlichting</h2>
          <p className="text-xl text-gray-300">
            Ontdek de mogelijkheden van onze hexagonale LED-systemen en creëer een unieke sfeer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold">
              <Link href="/offerte">Offerte Aanvragen</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              <Link href="/contact">Contact Opnemen</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Image
                src="/powertiles-logo-footer.png"
                alt="PowerTiles"
                width={180}
                height={54}
                className="h-10 w-auto"
              />
              <p className="text-gray-400">
                Premium modulaire PVC-klikvloeren voor garages, home gyms en werkplaatsen.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-black">Producten</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/producten/geventileerde-pvc-tegels" className="hover:text-[#7ED321]">
                    Geventileerde PVC-tegels
                  </Link>
                </li>
                <li>
                  <Link href="/producten/gladde-kliktegels" className="hover:text-[#7ED321]">
                    Gladde Kliktegels
                  </Link>
                </li>
                <li>
                  <Link href="/producten/gym-vloer" className="hover:text-[#7ED321]">
                    Gym Vloer
                  </Link>
                </li>
                <li>
                  <Link href="/producten/hexagonale-led-verlichting" className="hover:text-[#7ED321]">
                    LED-verlichting
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-black">Bedrijf</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/over-ons" className="hover:text-[#7ED321]">
                    Over Ons
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#7ED321]">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/offerte" className="hover:text-[#7ED321]">
                    Offerte
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-black">Contact</h4>
              <div className="space-y-2 text-gray-600">
                <p>info@powertiles.be</p>
                <p>+32 475 21 96 35</p>
                <p>BTW: BE 1024.559.728</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2024 PowerTiles. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
