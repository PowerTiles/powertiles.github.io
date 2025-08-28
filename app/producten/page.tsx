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
import { CheckCircle, ArrowRight } from "lucide-react";

export default function ProductenPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-muted py-16 bg-foreground">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Onze Producten</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ontdek ons complete assortiment hoogwaardige PVC-klikvloeren en
            accessoires voor garages, home gyms en werkplaatsen
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Geventileerde PVC-tegels */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary justify-between">
              <div className="relative overflow-hidden">
                <Image
                  src="/ventilated-pvc-tiles.webp"
                  alt="Geventileerde PVC-tegels in verschillende kleuren"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-primary">
                  Populair
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">
                  Geventileerde PVC-tegels
                </CardTitle>
                <CardDescription>
                  Perfect voor garages met optimale drainage en ventilatie
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Oliebestendig & drainage
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Zware belasting
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Eenvoudige reiniging
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Garages & werkplaatsen
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex-col gap-2 w-full">
                <Link className="w-full" href="/producten/geventileerde-pvc-tegels">
                  <Button variant="outline" className="w-full">
                    Meer Info
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link className="w-full" href="/offerte">
                  <Button className="w-full text-foreground font-semibold">
                    Offerte Aanvragen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Gladde Kliktegels */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary justify-between">
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
                <CardTitle className="text-xl">Gladde Kliktegels</CardTitle>
                <CardDescription>
                  Veelzijdige tegels voor lichte en zware belasting toepassingen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Glad oppervlak & klik-systeem
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Slijtvast & kleurbestendig
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Lichte & zware belasting
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Diverse kleuren
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Link className="w-full" href="/producten/gladde-kliktegels">
                  <Button variant="outline" className="w-full">
                    Meer Info
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link className="w-full" href="/offerte">
                  <Button className="w-full text-foreground font-semibold">
                    Offerte Aanvragen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Gym Vloer */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary justify-between">
              <div className="relative overflow-hidden">
                <Image
                  src="/gym-floor-tiles.png"
                  alt="Gym vloer rubbertegels voor fitness en CrossFit"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-primary">
                  Fitness
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Gym Vloer</CardTitle>
                <CardDescription>
                  Extra hard geperste rubbertegels voor zware gewichten en
                  apparaten
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Fijn rubbergranulaat
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Geluidsreductie
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Luchtkwaliteitcertificaat
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    CrossFit geschikt
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Link className="w-full" href="/producten/gym-vloer">
                  <Button variant="outline" className="w-full">
                    Meer Info
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link className="w-full" href="/offerte">
                  <Button className="w-full text-foreground font-semibold">
                    Offerte Aanvragen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Hexagonale LED-verlichting */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary justify-between">
              <div className="relative overflow-hidden">
                <Image
                  src="/hexagonal-led-lighting.png"
                  alt="Hexagonale LED-verlichting"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-primary">
                  Nieuw
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">
                  Hexagonale LED-verlichting
                </CardTitle>
                <CardDescription>
                  Innovatieve verlichtingsoplossingen voor moderne ruimtes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Moderne uitstraling
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Energiezuinig LED
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Eenvoudige installatie
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Dimbaar
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Link className="w-full" href="/producten/hexagonale-led-verlichting">
                  <Button variant="outline" className="w-full">
                    Meer Info
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link className="w-full" href="/offerte">
                  <Button className="w-full text-foreground font-semibold">
                    Offerte Aanvragen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Randstukken & Accessoires */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary justify-between">
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
                <CardTitle className="text-xl">
                  Randstukken & Accessoires
                </CardTitle>
                <CardDescription>
                  Complete afwerking voor een professionele uitstraling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Randstroken
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Hoekstukken
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Overgangsprofielen
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Montage-accessoires
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                  <Link className="w-full" href="/producten/randstukken-accessoires">
                    <Button variant="outline" className="w-full">
                      Meer Info
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link className="w-full" href="/offerte">
                    <Button className="w-full text-foreground font-semibold">
                      Offerte Aanvragen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground/35 text-muted">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">
            Vragen over onze producten?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Onze experts helpen u graag bij het kiezen van de juiste
            vloeroplossing voor uw specifieke toepassing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/offerte">
              <Button size="lg" className="text-foreground">
                Offerte Aanvragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-background text-muted hover: hover:text-foreground bg-transparent"
              >
                Contact Opnemen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
