import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Star,
  ArrowRight,
  Wrench,
  Dumbbell,
  Car,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="text-muted py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm font-semibold"
                >
                  Premium Modulaire Vloeren
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Premium modular floors for garages and home gyms
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transformeer uw garage, home gym of werkplaats met onze
                  hoogwaardige PVC-klikvloeren. Kracht, luxe en
                  professionaliteit in elke tegel.
                </p>
              </div>
              <div className="flex flex-col min-[440px]:flex-row gap-4">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="text-background font-semibold px-8"
                  >
                    Vraag Offerte Aan
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/designer-tool">
                  <Button size="lg" variant="outline">
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
                  className="max-h-[600px] h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Tiles */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-background mb-4">
              Onze Specialisaties
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              PowerTiles biedt premium modulaire vloeroplossingen voor
              verschillende toepassingen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group justify-between hover:shadow-xl transition-all duration-300 border-2 hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-background rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Car className="h-8 w-8 text-muted group-hover:text-background" />
                </div>
                <CardTitle className="text-2xl font-bold text-background">
                  Voor Garages
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Professionele vloeren die bestand zijn tegen olie, chemicaliën
                  en zware belasting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    Oliebestendig
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    Zware belasting
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    Eenvoudige reiniging
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/producten" className="w-full">
                  <Button className="w-full">
                    Meer Info
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="group justify-between hover:shadow-xl transition-all duration-300 border-2 hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-background rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Dumbbell className="h-8 w-8 text-muted group-hover:text-background" />
                </div>
                <CardTitle className="text-2xl font-bold text-background">
                  Voor Home Gyms
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Schokabsorberende vloeren perfect voor fitness en
                  krachttraining
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    Schokabsorberend
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    Geluidsdemping
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    Antislip oppervlak
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/producten" className="w-full">
                  <Button className="w-full">
                    Meer Info
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="group justify-between hover:shadow-xl transition-all duration-300 border-2 hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-background rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Wrench className="h-8 w-8 text-muted group-hover:text-background" />
                </div>
                <CardTitle className="text-2xl font-bold text-background">
                  Voor Werkplaatsen
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Duurzame vloeren voor industriële en professionele omgevingen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    Chemicaliënbestendig
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    Slijtvast
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    Professionele uitstraling
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/producten" className="w-full">
                  <Button className="w-full">
                    Meer Info
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-background mb-4">
              Onze Producten
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ontdek ons uitgebreid assortiment hoogwaardige PVC-klikvloeren en
              accessoires
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            <Link href="/producten/geventileerde-pvc-tegels" className="block">
              <Card className="group hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer">
                <div className="relative overflow-hidden">
                  <Image
                    src="/ventilated-pvc-tiles.webp"
                    alt="Geventileerde PVC-tegels in verschillende kleuren"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-background">
                    Populair
                  </Badge>
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-background">
                    Geventileerde PVC-tegels
                  </CardTitle>
                  <CardDescription>
                    Perfect voor garages met drainage en ventilatie
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button className="w-full bg-background hover:bg-gray-800 text-muted">
                    Meer Info
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/producten/gladde-kliktegels" className="block">
              <Card className="group hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer">
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
                  <CardTitle className="text-background">
                    Gladde Kliktegels
                  </CardTitle>
                  <CardDescription>
                    Voor lichte en zware belasting toepassingen
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button className="w-full bg-background hover:bg-gray-800 text-muted">
                    Meer Info
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/producten/gym-vloer" className="block">
              <Card className="group hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer">
                <div className="relative overflow-hidden">
                  <Image
                    src="/gym-floor-tiles.png"
                    alt="Gym vloer rubbertegels voor fitness en CrossFit"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-background">
                    Fitness
                  </Badge>
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-background">Gym Vloer</CardTitle>
                  <CardDescription>
                    Extra hard geperste rubbertegels, bestand tegen zware
                    gewichten. Geschikt voor fitness en CrossFit met
                    geluidsreductie en luchtkwaliteitcertificaat.
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button className="w-full bg-background hover:bg-gray-800 text-muted">
                    Meer Info
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link
              href="/producten/hexagonale-led-verlichting"
              className="block"
            >
              <Card className="group hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer">
                <div className="relative overflow-hidden">
                  <Image
                    src="/hexagonal-led-lighting.png"
                    alt="Hexagonale LED-verlichting"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-background">
                    Nieuw
                  </Badge>
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-background">
                    Hexagonale LED-verlichting
                  </CardTitle>
                  <CardDescription>
                    Innovatieve verlichtingsoplossingen
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button className="w-full bg-background hover:bg-gray-800 text-muted">
                    Meer Info
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/producten/randstukken-accessoires" className="block">
              <Card className="group hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer">
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
                  <CardTitle className="text-background">
                    Randstukken & Accessoires
                  </CardTitle>
                  <CardDescription>
                    Complete afwerking voor uw vloer
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button className="w-full bg-background hover:bg-gray-800 text-muted">
                    Meer Info
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose PowerTiles */}
      <section className="py-20 text-accent bg-accent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="px-4 py-2 text-sm font-semibold">
                  Waarom PowerTiles?
                </Badge>
                <h2 className="text-4xl font-bold text-background">
                  Kwaliteit die het verschil maakt
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Bij PowerTiles kiezen we bewust voor premium kwaliteit boven
                  goedkope alternatieven. Onze vloeren zijn een investering die
                  jarenlang meegaat.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-background mb-2">
                      Premium Materialen
                    </h3>
                    <p className="text-muted-foreground">
                      Alleen de beste PVC-materialen voor maximale duurzaamheid
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-background mb-2">
                      Professionele Installatie
                    </h3>
                    <p className="text-muted-foreground">
                      Optionele vakkundige plaatsing door onze ervaren monteurs
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-background mb-2">
                      Belgische Kwaliteit
                    </h3>
                    <p className="text-muted-foreground">
                      Lokale service en ondersteuning voor al uw vragen
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/premium-quality-new.png"
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
      <section className="py-20 bg-muted/70 text-muted">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">
            Klaar om uw ruimte te transformeren?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vraag vandaag nog een vrijblijvende offerte aan en ontdek wat
            PowerTiles voor u kan betekenen.
          </p>
          <Link href="/offerte">
            <Button
              size="lg"
              className="text-background"
            >
              Offerte Aanvragen
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
