import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Star, Shield, Award, Users, Target, Heart } from "lucide-react"

export default function OverOnsPage() {
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
            <Link href="/producten" className="hover:text-[#7ED321] transition-colors">
              Producten
            </Link>
            <Link href="/vloer-designer" className="hover:text-[#7ED321] transition-colors">
              Designer Tool
            </Link>
            <Link href="/over-ons" className="text-[#7ED321] font-semibold">
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
          <h1 className="text-5xl font-bold mb-6">Over PowerTiles</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Uw Belgische partner voor premium modulaire PVC-klikvloeren. Kracht, luxe en professionaliteit in elke
            tegel.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-[#7ED321] text-black px-4 py-2 text-sm font-semibold">Ons Verhaal</Badge>
                <h2 className="text-4xl font-bold text-black">PowerTiles: Kracht en Luxe Verenigd</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  PowerTiles is een Belgische onderneming gespecialiseerd in de verkoop en optionele plaatsing van
                  modulaire PVC-klikvloeren voor garages, home gyms en werkplaatsen.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Het merk staat voor kracht, luxe en een professionele uitstraling — zowel voor wagens (horsepower) als
                  mensen (fitness, power). We geloven in kwaliteit die het verschil maakt en kiezen bewust voor premium
                  materialen boven goedkope alternatieven.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/powertiles-hero-new.png"
                alt="PowerTiles premium garage flooring"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Onze Missie & Visie</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We transformeren ruimtes met premium vloeroplossingen die kracht en elegantie uitstralen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7ED321]">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-[#7ED321] rounded-full w-16 h-16 flex items-center justify-center">
                  <Target className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">Onze Missie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center leading-relaxed">
                  PowerTiles transformeert garages, home gyms en werkplaatsen met hoogwaardige modulaire vloeren die
                  kracht, luxe en professionaliteit uitstralen. We bieden niet alleen producten, maar complete
                  oplossingen die uw ruimte naar een hoger niveau tillen.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7ED321]">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-black rounded-full w-16 h-16 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-[#7ED321]" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">Onze Visie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center leading-relaxed">
                  We streven ernaar de toonaangevende Belgische leverancier te zijn van premium modulaire vloeren,
                  bekend om onze onwrikbare focus op kwaliteit, innovatie en klanttevredenheid. Elke ruimte verdient de
                  kracht van PowerTiles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose PowerTiles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-[#7ED321] text-black px-4 py-2 text-sm font-semibold mb-6">Waarom PowerTiles?</Badge>
            <h2 className="text-4xl font-bold text-black mb-4">Kwaliteit Boven Alles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bij PowerTiles kiezen we bewust voor premium kwaliteit boven goedkope alternatieven. Onze vloeren zijn een
              investering die jarenlang meegaat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-[#7ED321] rounded-full w-16 h-16 flex items-center justify-center">
                  <Award className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-xl font-bold text-black">Premium Materialen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Alleen de beste PVC-materialen voor maximale duurzaamheid en een luxueuze uitstraling die jaren
                  meegaat.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-black rounded-full w-16 h-16 flex items-center justify-center">
                  <Users className="h-8 w-8 text-[#7ED321]" />
                </div>
                <CardTitle className="text-xl font-bold text-black">Professionele Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Van advies tot optionele vakkundige plaatsing - onze ervaren monteurs zorgen voor een perfect
                  resultaat.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-[#7ED321] rounded-full w-16 h-16 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-xl font-bold text-black">Belgische Kwaliteit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Lokale service en ondersteuning met de betrouwbaarheid en kwaliteit waar België om bekend staat.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Onze Waarden</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deze kernwaarden sturen alles wat we doen bij PowerTiles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto p-4 bg-[#7ED321] rounded-full w-16 h-16 flex items-center justify-center">
                <Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black">Kracht</h3>
              <p className="text-gray-600">
                Onze vloeren zijn gebouwd om te presteren onder de zwaarste omstandigheden.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto p-4 bg-black rounded-full w-16 h-16 flex items-center justify-center">
                <Award className="h-8 w-8 text-[#7ED321]" />
              </div>
              <h3 className="text-xl font-bold text-black">Luxe</h3>
              <p className="text-gray-600">
                Elke tegel straalt elegantie en verfijning uit voor een premium uitstraling.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto p-4 bg-[#7ED321] rounded-full w-16 h-16 flex items-center justify-center">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black">Professionaliteit</h3>
              <p className="text-gray-600">
                Van eerste contact tot eindresultaat - alles met de hoogste professionele standaarden.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto p-4 bg-black rounded-full w-16 h-16 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-[#7ED321]" />
              </div>
              <h3 className="text-xl font-bold text-black">Kwaliteit</h3>
              <p className="text-gray-600">Geen compromissen - alleen de beste materialen en vakmanschap.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-[#7ED321] text-black px-4 py-2 text-sm font-semibold">Bedrijfsgegevens</Badge>
                <h2 className="text-4xl font-bold text-black">PowerTiles België</h2>
                <div className="space-y-4 text-lg text-gray-600">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#7ED321]" />
                    <span>Belgische onderneming</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#7ED321]" />
                    <span>BTW: BE 1024.559.728</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#7ED321]" />
                    <span>Gespecialiseerd in modulaire PVC-vloeren</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#7ED321]" />
                    <span>Optionele professionele plaatsing</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/premium-quality-new.png"
                alt="PowerTiles Premium Quality"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Klaar om samen te werken?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ontdek wat PowerTiles voor uw ruimte kan betekenen. Van advies tot installatie - wij staan voor u klaar.
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
