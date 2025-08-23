import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, Palette, Camera, Wrench, Shield, Package } from "lucide-react"

export default function RandstukkenAccessoiresPage() {
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
          <span className="text-gray-900 font-medium">Randstukken & Accessoires</span>
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
                  Professionele Afwerking
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight">Randstukken & Accessoires</h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Essentiële afwerkingsstukken voor een professionele, complete vloerinstallatie. Van randstroken tot
                  hoekstukken - alles voor de perfecte finish.
                </p>
              </div>
              <Button asChild size="lg" className="bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold">
                <Link href="/offerte">Offerte Aanvragen</Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/edge-pieces-accessories.png"
                alt="Randstukken en accessoires voor vloerinstallatie"
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
                    Onze randstukken en accessoires zijn de finishing touch die uw vloerproject van goed naar
                    uitzonderlijk tillen. Deze essentiële componenten zorgen niet alleen voor een professionele
                    uitstraling, maar beschermen ook de randen van uw vloer tegen beschadiging.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Verkrijgbaar in verschillende kleuren en materialen om perfect aan te sluiten bij uw gekozen
                    vloertegels. Elk accessoire is ontworpen voor eenvoudige installatie en langdurige duurzaamheid.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-black">Product Categorieën</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#7ED321] rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-black" />
                        </div>
                        <h4 className="font-semibold text-black text-lg">Randstroken</h4>
                      </div>
                      <ul className="space-y-2 ml-15">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Rechte randstroken</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Afgeschuinde randen</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Verschillende hoogtes</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#7ED321] rounded-lg flex items-center justify-center">
                          <Shield className="h-6 w-6 text-black" />
                        </div>
                        <h4 className="font-semibold text-black text-lg">Hoekstukken</h4>
                      </div>
                      <ul className="space-y-2 ml-15">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Binnen- en buitenhoeken</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">90° hoekverbindingen</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Naadloze afwerking</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#7ED321] rounded-lg flex items-center justify-center">
                          <Wrench className="h-6 w-6 text-black" />
                        </div>
                        <h4 className="font-semibold text-black text-lg">Overgangsprofielen</h4>
                      </div>
                      <ul className="space-y-2 ml-15">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Vloer naar vloer overgangen</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Hoogteverschil compensatie</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Deurdrempels</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#7ED321] rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-black" />
                        </div>
                        <h4 className="font-semibold text-black text-lg">Installatie Accessoires</h4>
                      </div>
                      <ul className="space-y-2 ml-15">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Bevestigingsmateriaal</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Lijmen en kitten</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Installatietools</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-black">Waarom Randstukken Essentieel Zijn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-black">Functionele Voordelen</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Bescherming tegen randschade</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Vochtafdichting</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Veilige overgangen</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Langere levensduur vloer</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-black">Esthetische Voordelen</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Professionele uitstraling</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Naadloze afwerking</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Kleurcoördinatie mogelijk</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-[#7ED321] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Verhoogde waarde ruimte</span>
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
                      <span className="text-gray-600">Materiaal:</span>
                      <span className="font-medium text-black">PVC / Rubber</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lengtes:</span>
                      <span className="font-medium text-black">50cm - 200cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hoogtes:</span>
                      <span className="font-medium text-black">7mm - 20mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bevestiging:</span>
                      <span className="font-medium text-black">Klik / Lijm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Onderhoud:</span>
                      <span className="font-medium text-black">Onderhoudsvrij</span>
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
                    Beschikbare Kleuren
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">Passend bij alle PowerTiles vloeren</p>
                  <div className="grid grid-cols-4 gap-2">
                    {/* Placeholder color swatches */}
                    <div className="aspect-square bg-gray-800 rounded border-2 border-gray-300"></div>
                    <div className="aspect-square bg-gray-600 rounded border-2 border-gray-300"></div>
                    <div className="aspect-square bg-blue-600 rounded border-2 border-gray-300"></div>
                    <div className="aspect-square bg-red-600 rounded border-2 border-gray-300"></div>
                    <div className="aspect-square bg-green-600 rounded border-2 border-gray-300"></div>
                    <div className="aspect-square bg-yellow-600 rounded border-2 border-gray-300"></div>
                    <div className="aspect-square bg-white rounded border-2 border-gray-300"></div>
                    <div className="aspect-square bg-orange-600 rounded border-2 border-gray-300"></div>
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
          <h2 className="text-3xl lg:text-4xl font-bold">Maak uw vloerproject compleet</h2>
          <p className="text-xl text-gray-300">
            Vraag een offerte aan voor de perfecte randstukken en accessoires bij uw PowerTiles vloer.
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
