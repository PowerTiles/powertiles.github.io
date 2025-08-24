import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CheckCircle,
  Palette,
  Camera,
  Lightbulb,
  Zap,
  Settings,
  ArrowRight,
} from "lucide-react";

export default function HexagonaleLEDVerlichtingPage() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-foreground py-4 px-6 border-b">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-primary">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/producten" className="text-gray-500 hover:text-primary">
            Producten
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-gray-900 font-medium">
            Hexagonale LED-verlichting
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-6 bg-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/producten"
            className="inline-flex lg:hidden items-center text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar Producten
          </Link>
          <div className="grid lg:grid-cols-2 gap-y-6 gap-x-12 items-start">
            <div className="space-y-6">
              <Link
                href="/producten"
                className="hidden lg:inline-flex items-center text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar Producten
              </Link>
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="text-background px-4 py-2 text-sm font-semibold"
                >
                  Innovatieve Technologie
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-background leading-tight">
                  Hexagonale LED-verlichting
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Revolutionaire LED-verlichtingssystemen die uw ruimte
                  transformeren met moderne hexagonale patronen en slimme
                  besturing.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="text-background font-semibold mt-6"
              >
                <Link href="/offerte">Offerte Aanvragen</Link>
              </Button>
            </div>
            <div className="relative order-first lg:order-none">
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
      <section className="py-16 text-accent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-background">
                    Productbeschrijving
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Onze hexagonale LED-verlichting combineert functionaliteit
                    met een adembenemend visueel effect. Het geometrische
                    hexagonale patroon creëert een moderne, futuristische
                    uitstraling die perfect past in garages, showrooms en
                    werkplaatsen.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Het systeem is volledig aanpasbaar qua kleur, intensiteit en
                    patronen, waardoor u de perfecte sfeer kunt creëren voor
                    elke gelegenheid. Van functionele werkverlichting tot
                    sfeervolle accentverlichting.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-background">
                    Technische Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <Lightbulb className="h-8 w-8 text-background" />
                      </div>
                      <h4 className="font-semibold text-background">
                        Smart Control
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        App-besturing voor kleur en intensiteit
                      </p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <Zap className="h-8 w-8 text-background" />
                      </div>
                      <h4 className="font-semibold text-background">
                        Energie Efficiënt
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        LED-technologie met laag verbruik
                      </p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <Settings className="h-8 w-8 text-background" />
                      </div>
                      <h4 className="font-semibold text-background">Modulair</h4>
                      <p className="text-sm text-muted-foreground">
                        Uitbreidbaar systeem naar wens
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-background">
                    Toepassingen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-background">Residentieel</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Luxe garages</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Home theaters</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Game rooms</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Werkplaatsen</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-background">Commercieel</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Autoshowrooms</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Retail spaces</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            Evenementenruimtes
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
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
                  <CardTitle className="text-xl text-background">
                    Technische Specificaties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">LED Type:</span>
                      <span className="font-medium text-background">
                        RGB + Warm White
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vermogen:</span>
                      <span className="font-medium text-background">
                        12W per paneel
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Spanning:</span>
                      <span className="font-medium text-background">24V DC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Levensduur:</span>
                      <span className="font-medium text-background">
                        50.000+ uur
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Besturing:</span>
                      <span className="font-medium text-background">WiFi + App</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Installatie:</span>
                      <span className="font-medium text-background">
                        Plug & Play
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Garantie:</span>
                      <span className="font-medium text-background">5 jaar</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-background flex items-center">
                    <Palette className="h-5 w-5 mr-2 text-primary" />
                    Kleur Opties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Miljoenen kleuren mogelijk via RGB-technologie
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-foreground border rounded"></div>
                      <span className="text-sm text-gray-700">
                        Warm wit (3000K)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="text-sm text-gray-700">
                        Koel wit (6000K)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded"></div>
                      <span className="text-sm text-gray-700">
                        RGB (16+ miljoen kleuren)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-background flex items-center">
                    <Camera className="h-5 w-5 mr-2 text-primary" />
                    Fotogalerij
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="aspect-square bg-gray-200 rounded flex items-center justify-center">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="aspect-square bg-gray-200 rounded flex items-center justify-center">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent/70 text-muted">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Transformeer uw ruimte met LED-verlichting
          </h2>
          <p className="text-xl text-muted-foreground">
            Ontdek de mogelijkheden van onze hexagonale LED-systemen en creëer
            een unieke sfeer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/offerte">
              <Button size="lg" className="text-background">
                Offerte Aanvragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-foreground text-muted hover:bg-foreground hover:text-background bg-transparent"
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
