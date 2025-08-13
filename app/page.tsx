import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, ArrowRight, Wrench, Dumbbell, Car } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/powertiles-logo-complete.png"
              alt="PowerTiles - Transform Your Space. Unleash the Power."
              width={600}
              height={180}
              className="h-32 w-auto"
            />
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-[#7ED321] transition-colors">
              Home
            </Link>
            <Link href="/producten" className="hover:text-[#7ED321] transition-colors">
              Producten
            </Link>
            <Link href="/vloer-designer" className="hover:text-[#7ED321] transition-colors">
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

      {/* Hero Section */}
      <section id="home" className="bg-black text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-[#7ED321] text-black px-4 py-2 text-sm font-semibold">
                  Premium Modulaire Vloeren
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Premium modular floors for garages and home gyms
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Transformeer uw garage, home gym of werkplaats met onze hoogwaardige PVC-klikvloeren. Kracht, luxe en
                  professionaliteit in elke tegel.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/offerte">
                  <Button size="lg" className="bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold px-8">
                    Vraag Offerte Aan
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/vloer-designer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                  >
                    Probeer Designer Tool
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden">
                <Image
                  src="/powertiles-hero-new.png"
                  alt="Premium PVC garage flooring with green sports car"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Tiles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Onze Specialisaties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              PowerTiles biedt premium modulaire vloeroplossingen voor verschillende toepassingen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7ED321]">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-black rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-[#7ED321] transition-colors">
                  <Car className="h-8 w-8 text-white group-hover:text-black" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">Voor Garages</CardTitle>
                <CardDescription className="text-gray-600">
                  Professionele vloeren die bestand zijn tegen olie, chemicaliën en zware belasting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-[#7ED321] mr-2" />
                    Oliebestendig
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-[#7ED321] mr-2" />
                    Zware belasting
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-[#7ED321] mr-2" />
                    Eenvoudige reiniging
                  </li>
                </ul>
                <Link href="/producten">
                  <Button className="w-full bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold">Meer Info</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7ED321]">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-black rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-[#7ED321] transition-colors">
                  <Dumbbell className="h-8 w-8 text-white group-hover:text-black" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">Voor Home Gyms</CardTitle>
                <CardDescription className="text-gray-600">
                  Schokabsorberende vloeren perfect voor fitness en krachttraining
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-[#7ED321] mr-2" />
                    Schokabsorberend
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-[#7ED321] mr-2" />
                    Geluidsdemping
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-[#7ED321] mr-2" />
                    Antislip oppervlak
                  </li>
                </ul>
                <Link href="/producten">
                  <Button className="w-full bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold">Meer Info</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7ED321]">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-black rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-[#7ED321] transition-colors">
                  <Wrench className="h-8 w-8 text-white group-hover:text-black" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">Voor Werkplaatsen</CardTitle>
                <CardDescription className="text-gray-600">
                  Duurzame vloeren voor industriële en professionele omgevingen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-[#7ED321] mr-2" />
                    Chemicaliënbestendig
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-[#7ED321] mr-2" />
                    Slijtvast
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-[#7ED321] mr-2" />
                    Professionele uitstraling
                  </li>
                </ul>
                <Link href="/producten">
                  <Button className="w-full bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold">Meer Info</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Onze Producten</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek ons uitgebreid assortiment hoogwaardige PVC-klikvloeren en accessoires
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
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
              <CardHeader className="flex-grow">
                <CardTitle className="text-black">Geventileerde PVC-tegels</CardTitle>
                <CardDescription>Perfect voor garages met drainage en ventilatie</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link href="/offerte">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">Offerte Aanvragen</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="relative overflow-hidden">
                <Image
                  src="/smooth-click-tiles.jpeg"
                  alt="Gladde kliktegels met zichtbare klikmechanisme"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="flex-grow">
                <CardTitle className="text-black">Gladde Kliktegels</CardTitle>
                <CardDescription>Voor lichte en zware belasting toepassingen</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link href="/offerte">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">Offerte Aanvragen</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
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
              <CardHeader className="flex-grow">
                <CardTitle className="text-black">Gym Vloer</CardTitle>
                <CardDescription>
                  Extra hard geperste rubbertegels, bestand tegen zware gewichten. Geschikt voor fitness en CrossFit met
                  geluidsreductie en luchtkwaliteitcertificaat.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link href="/offerte">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">Offerte Aanvragen</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
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
              <CardHeader className="flex-grow">
                <CardTitle className="text-black">Hexagonale LED-verlichting</CardTitle>
                <CardDescription>Innovatieve verlichtingsoplossingen</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link href="/offerte">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">Offerte Aanvragen</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="relative overflow-hidden">
                <Image
                  src="/edge-pieces-accessories.png"
                  alt="Randstukken & accessoires voor modulaire vloeren"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="flex-grow">
                <CardTitle className="text-black">Randstukken & Accessoires</CardTitle>
                <CardDescription>Complete afwerking voor uw vloer</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link href="/offerte">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">Offerte Aanvragen</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose PowerTiles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-[#7ED321] text-black px-4 py-2 text-sm font-semibold">Waarom PowerTiles?</Badge>
                <h2 className="text-4xl font-bold text-black">Kwaliteit die het verschil maakt</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Bij PowerTiles kiezen we bewust voor premium kwaliteit boven goedkope alternatieven. Onze vloeren zijn
                  een investering die jarenlang meegaat.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#7ED321] rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Premium Materialen</h3>
                    <p className="text-gray-600">Alleen de beste PVC-materialen voor maximale duurzaamheid</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#7ED321] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Professionele Installatie</h3>
                    <p className="text-gray-600">Optionele vakkundige plaatsing door onze ervaren monteurs</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#7ED321] rounded-full flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Belgische Kwaliteit</h3>
                    <p className="text-gray-600">Lokale service en ondersteuning voor al uw vragen</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/premium-quality-badge.png"
                alt="Premium Quality - PowerTiles kwaliteit"
                width={200}
                height={200}
                className="rounded-lg shadow-xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Klaar om uw ruimte te transformeren?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Vraag vandaag nog een vrijblijvende offerte aan en ontdek wat PowerTiles voor u kan betekenen.
          </p>
          <Link href="/offerte">
            <Button size="lg" className="bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold px-12 py-4 text-lg">
              Offerte Aanvragen
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
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
                width={300}
                height={90}
                className="h-12 w-auto"
              />
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
                  <Link href="/producten" className="hover:text-white transition-colors">
                    Geventileerde Tegels
                  </Link>
                </li>
                <li>
                  <Link href="/producten" className="hover:text-white transition-colors">
                    Gladde Kliktegels
                  </Link>
                </li>
                <li>
                  <Link href="/producten" className="hover:text-white transition-colors">
                    Gym Vloer
                  </Link>
                </li>
                <li>
                  <Link href="/producten" className="hover:text-white transition-colors">
                    LED-verlichting
                  </Link>
                </li>
                <li>
                  <Link href="/producten" className="hover:text-white transition-colors">
                    Accessoires
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#7ED321]">Service</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/vloer-designer" className="hover:text-white transition-colors">
                    Vloer Designer Tool
                  </Link>
                </li>
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
