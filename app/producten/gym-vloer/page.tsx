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
  Shield,
  Volume2,
  Leaf,
  ArrowRight,
} from "lucide-react";

export default function GymVloerPage() {
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
          <span className="text-gray-900 font-medium">Gym Vloer</span>
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
                  Professional Grade
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-background leading-tight">
                  Gym Vloer
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Extra hard geperste rubbertegels, speciaal ontwikkeld voor
                  intensieve fitness en CrossFit training. Bestand tegen zware
                  gewichten en apparaten.
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
                src="/gym-floor-tiles.png"
                alt="Professionele gym vloer met fitnessapparatuur"
                width={600}
                height={400}
                className="w-full object-cover rounded-lg shadow-lg"
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
                    Deze rubbertegel is extra hard geperst en gemaakt van fijn
                    rubbergranulaat, waardoor hij bestand is tegen zware
                    gewichten en apparaten. De dichte structuur maakt hem
                    makkelijk schoon te houden en zorgt voor optimale
                    duurzaamheid in intensieve trainingsomgevingen.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Geschikt voor fitness en CrossFit, met geluidsreductietest
                    en luchtkwaliteitcertificaat. Deze vloer biedt de perfecte
                    combinatie van veiligheid, comfort en prestaties voor elke
                    trainingsruimte.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-background">
                    Certificeringen & Testen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <Volume2 className="h-8 w-8 text-background" />
                      </div>
                      <h4 className="font-semibold text-background">
                        Geluidsreductie
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Officieel getest voor geluidsdemping
                      </p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <Leaf className="h-8 w-8 text-background" />
                      </div>
                      <h4 className="font-semibold text-background">
                        Luchtkwaliteit
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Gecertificeerd voor binnenlucht
                      </p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <Shield className="h-8 w-8 text-background" />
                      </div>
                      <h4 className="font-semibold text-background">
                        Veiligheid
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Voldoet aan alle veiligheidsnormen
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
                      <h4 className="font-semibold text-background">
                        Fitness & Training
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Home gyms</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">CrossFit boxes</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            Gewichthefruimtes
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            Functionele training
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-background">
                        Commercieel
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Fitnesscentra</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Sportscholen</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            Revalidatiecentra
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Sportcomplexen</span>
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
                      <span className="text-muted-foreground">Materiaal:</span>
                      <span className="font-medium text-background">
                        Fijn rubbergranulaat
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Afmetingen:</span>
                      <span className="font-medium text-background">
                        50x50 cm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dikte:</span>
                      <span className="font-medium text-background">
                        15-20 mm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hardheid:</span>
                      <span className="font-medium text-background">
                        Extra hard geperst
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Oppervlak:</span>
                      <span className="font-medium text-background">
                        Gestructureerd
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Installatie:</span>
                      <span className="font-medium text-background">
                        Puzzelsysteem
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Onderhoud:</span>
                      <span className="font-medium text-background">
                        Makkelijk schoon
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-background flex items-center">
                    <Palette className="h-5 w-5 mr-2 text-primary" />
                    Beschikbare Kleuren
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-3">
                    {/* Placeholder color swatches */}
                    {[
                      { name: "Zwart", color: "#1e2939", border: true },
                      { name: "Grijs", color: "#4a5565" },
                      { name: "Blauw", color: "#155dfc" },
                      { name: "Rood", color: "#e7000b" },
                    ].map((colorOption, index) => (
                      <div key={index} className="group cursor-pointer">
                        <div
                          className={`aspect-square rounded-lg transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg ${
                            colorOption.border
                              ? "border-2 border-muted-foreground"
                              : ""
                          }`}
                          style={{ backgroundColor: colorOption.color }}
                          title={colorOption.name}
                        ></div>
                        <p className="text-xs text-center mt-1 text-muted-foreground group-hover:text-primary transition-colors">
                          {colorOption.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-4 italic">
                    * Kleuren kunnen afwijken van de werkelijke productkleuren
                    door schermweergave
                  </p>
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
            Klaar voor uw professionele gym vloer?
          </h2>
          <p className="text-xl text-muted-foreground">
            Vraag een vrijblijvende offerte aan en ontdek wat PowerTiles voor uw
            trainingsruimte kan betekenen.
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
