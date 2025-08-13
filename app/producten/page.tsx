import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Star, Shield, Wrench } from "lucide-react"

export default function ProductenPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Image
                src="/powertiles-logo-complete.png"
                alt="PowerTiles - Transform Your Space. Unleash the Power."
                width={600}
                height={180}
                className="h-32 w-auto"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-[#7ED321] transition-colors">
              Home
            </Link>
            <Link href="/producten" className="text-[#7ED321] font-semibold">
              Producten
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

      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge className="bg-[#7ED321] text-black px-4 py-2 text-sm font-semibold mb-6">Premium Producten</Badge>
          <h1 className="text-5xl font-bold mb-6">Onze Producten</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ontdek ons complete assortiment hoogwaardige PVC-klikvloeren en accessoires voor garages, home gyms en
            werkplaatsen
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Geventileerde PVC-tegels */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7ED321]">
              <div className="relative overflow-hidden">
                <Image
                  src="/ventilated-pvc-tiles.webp"
                  alt="Geventileerde PVC-tegels in verschillende kleuren"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-[#7ED321] text-black">Populair</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-black">Geventileerde PVC-tegels</CardTitle>
                <CardDescription>Perfect voor garages met optimale drainage en ventilatie</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-[#7ED321] mr-2" />
                    Oliebestendig & drainage
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-[#7ED321] mr-2" />
                    Zware belasting
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-[#7ED321] mr-2" />
                    Eenvoudige reiniging
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Star className="h-4 w-4 text-[#7ED321] mr-2" />
                    Garages & werkplaatsen
                  </li>
                </ul>
                <div className="flex flex-col gap-2">
                  <Link href="/producten/geventileerde-pvc-tegels">
                    <Button
                      variant="outline"
                      className="w-full border-[#7ED321] text-[#7ED321] hover:bg-[#7ED321] hover:text-black bg-transparent"
                    >
                      Meer Info
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/offerte">
                    <Button className="w-full bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold">
                      Offerte Aanvragen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Gladde Kliktegels */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7ED321]">
              <div className="relative overflow-hidden">
                <Image
                  src="/smooth-click-tiles.jpeg"
                  alt="Gladde kliktegels met zichtbare klikmechanisme"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-black">Gladde Kliktegels</CardTitle>
                <CardDescription>Veelzijdige tegels voor lichte en zware belasting toepassingen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-[#7ED321] mr-2" />
                    Glad oppervlak & klik-systeem
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-[#7ED321] mr-2" />
                    Slijtvast & kleurbestendig
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Star className="h-4 w-4 text-[#7ED321] mr-2" />
                    Lichte & zware belasting
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Star className="h-4 w-4 text-[#7ED321] mr-2" />
                    Diverse kleuren
                  </li>
                </ul>
                <div className="flex flex-col gap-2">
                  <Link href="/producten/gladde-kliktegels">
                    <Button
                      variant="outline"
                      className="w-full border-[#7ED321] text-[#7ED321] hover:bg-[#7ED321] hover:text-black bg-transparent"
                    >
                      Meer Info
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/offerte">
                    <Button className="w-full bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold">
                      Offerte Aanvragen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Gym Vloer */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7ED321]">
              <div className="relative overflow-hidden">
                <Image
                  src="/gym-floor-tiles.png"
                  alt="Gym vloer rubbertegels voor fitness en CrossFit"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-[#7ED321] text-black">Fitness</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-black">Gym Vloer</CardTitle>
                <CardDescription>Extra hard geperste rubbertegels voor zware gewichten en apparaten</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <Shield className="h-4 w-4 text-[#7ED321] mr-2" />
                    Fijn rubbergranulaat
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Shield className="h-4 w-4 text-[#7ED321] mr-2" />
                    Geluidsreductie
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Shield className="h-4 w-4 text-[#7ED321] mr-2" />
                    Luchtkwaliteitcertificaat
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Shield className="h-4 w-4 text-[#7ED321] mr-2" />
                    CrossFit geschikt
                  </li>
                </ul>
                <div className="flex flex-col gap-2">
                  <Link href="/producten/gym-vloer">
                    <Button
                      variant="outline"
                      className="w-full border-[#7ED321] text-[#7ED321] hover:bg-[#7ED321] hover:text-black bg-transparent"
                    >
                      Meer Info
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/offerte">
                    <Button className="w-full bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold">
                      Offerte Aanvragen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Hexagonale LED-verlichting */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7ED321]">
              <div className="relative overflow-hidden">
                <Image
                  src="/hexagonal-led-lighting.png"
                  alt="Hexagonale LED-verlichting"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-[#7ED321] text-black">Nieuw</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-black">Hexagonale LED-verlichting</CardTitle>
                <CardDescription>Innovatieve verlichtingsoplossingen voor moderne ruimtes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <Star className="h-4 w-4 text-[#7ED321] mr-2" />
                    Moderne uitstraling
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Star className="h-4 w-4 text-[#7ED321] mr-2" />
                    Energiezuinig LED
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Star className="h-4 w-4 text-[#7ED321] mr-2" />
                    Eenvoudige installatie
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Star className="h-4 w-4 text-[#7ED321] mr-2" />
                    Dimbaar
                  </li>
                </ul>
                <div className="flex flex-col gap-2">
                  <Link href="/producten/hexagonale-led-verlichting">
                    <Button
                      variant="outline"
                      className="w-full border-[#7ED321] text-[#7ED321] hover:bg-[#7ED321] hover:text-black bg-transparent"
                    >
                      Meer Info
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/offerte">
                    <Button className="w-full bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold">
                      Offerte Aanvragen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Randstukken & Accessoires */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7ED321]">
              <div className="relative overflow-hidden">
                <Image
                  src="/edge-pieces-accessories.png"
                  alt="Randstukken & accessoires voor modulaire vloeren"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-black">Randstukken & Accessoires</CardTitle>
                <CardDescription>Complete afwerking voor een professionele uitstraling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <Wrench className="h-4 w-4 text-[#7ED321] mr-2" />
                    Randstroken
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Wrench className="h-4 w-4 text-[#7ED321] mr-2" />
                    Hoekstukken
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Wrench className="h-4 w-4 text-[#7ED321] mr-2" />
                    Overgangsprofielen
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Wrench className="h-4 w-4 text-[#7ED321] mr-2" />
                    Montage-accessoires
                  </li>
                </ul>
                <div className="flex flex-col gap-2">
                  <Link href="/producten/randstukken-accessoires">
                    <Button
                      variant="outline"
                      className="w-full border-[#7ED321] text-[#7ED321] hover:bg-[#7ED321] hover:text-black bg-transparent"
                    >
                      Meer Info
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/offerte">
                    <Button className="w-full bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold">
                      Offerte Aanvragen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Vragen over onze producten?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Onze experts helpen u graag bij het kiezen van de juiste vloeroplossing voor uw specifieke toepassing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/offerte">
              <Button size="lg" className="bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold px-8">
                Offerte Aanvragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                Contact Opnemen
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/">
                <Image
                  src="/powertiles-logo-footer.png"
                  alt="PowerTiles"
                  width={300}
                  height={90}
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-gray-400">
                Premium modulaire PVC-klikvloeren voor garages, home gyms en werkplaatsen.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#7ED321]">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>info@powertiles.be</p>
                <p>+32 475 21 96 35</p>
                <p>BTW: BE 1024.559.728</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#7ED321]">Producten</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/producten/geventileerde-pvc-tegels" className="hover:text-white transition-colors">
                    Geventileerde Tegels
                  </Link>
                </li>
                <li>
                  <Link href="/producten/gladde-kliktegels" className="hover:text-white transition-colors">
                    Gladde Kliktegels
                  </Link>
                </li>
                <li>
                  <Link href="/producten/gym-vloer" className="hover:text-white transition-colors">
                    Gym Vloer
                  </Link>
                </li>
                <li>
                  <Link href="/producten/hexagonale-led-verlichting" className="hover:text-white transition-colors">
                    LED-verlichting
                  </Link>
                </li>
                <li>
                  <Link href="/producten/randstukken-accessoires" className="hover:text-white transition-colors">
                    Accessoires
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#7ED321]">Service</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/offerte" className="hover:text-white transition-colors">
                    Offerte Aanvragen
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Installatie Service
                  </Link>
                </li>
                <li>
                  <Link href="/over-ons" className="hover:text-white transition-colors">
                    Over PowerTiles
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} PowerTiles. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
