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
} from "lucide-react";

export default function GymVloerPage() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white py-4 px-6 border-b">
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Link
                href="/producten"
                className="inline-flex items-center text-primary hover:text-[#6BC91A] transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar Producten
              </Link>
              <div className="space-y-4">
                <Badge className="bg-[#7ED321] text-black px-4 py-2 text-sm font-semibold">
                  Professional Grade
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
                  Gym Vloer
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Extra hard geperste rubbertegels, speciaal ontwikkeld voor
                  intensieve fitness en CrossFit training. Bestand tegen zware
                  gewichten en apparaten.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold"
              >
                <Link href="/offerte">Offerte Aanvragen</Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/gym-floor-tiles.png"
                alt="Professionele gym vloer met fitnessapparatuur"
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
                  <CardTitle className="text-2xl text-black">
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
                  <CardTitle className="text-2xl text-black">
                    Certificeringen & Testen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-16 h-16 bg-[#7ED321] rounded-full flex items-center justify-center">
                        <Volume2 className="h-8 w-8 text-black" />
                      </div>
                      <h4 className="font-semibold text-black">
                        Geluidsreductie
                      </h4>
                      <p className="text-sm text-gray-600">
                        Officieel getest voor geluidsdemping
                      </p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-16 h-16 bg-[#7ED321] rounded-full flex items-center justify-center">
                        <Leaf className="h-8 w-8 text-black" />
                      </div>
                      <h4 className="font-semibold text-black">
                        Luchtkwaliteit
                      </h4>
                      <p className="text-sm text-gray-600">
                        Gecertificeerd voor binnenlucht
                      </p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-16 h-16 bg-[#7ED321] rounded-full flex items-center justify-center">
                        <Shield className="h-8 w-8 text-black" />
                      </div>
                      <h4 className="font-semibold text-black">Veiligheid</h4>
                      <p className="text-sm text-gray-600">
                        Voldoet aan alle veiligheidsnormen
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-black">
                    Toepassingen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-black">
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
                      <h4 className="font-semibold text-black">Commercieel</h4>
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
                  <CardTitle className="text-xl text-black">
                    Technische Specificaties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Materiaal:</span>
                      <span className="font-medium text-black">
                        Fijn rubbergranulaat
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Afmetingen:</span>
                      <span className="font-medium text-black">50x50 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dikte:</span>
                      <span className="font-medium text-black">15-20 mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hardheid:</span>
                      <span className="font-medium text-black">
                        Extra hard geperst
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Oppervlak:</span>
                      <span className="font-medium text-black">
                        Gestructureerd
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Installatie:</span>
                      <span className="font-medium text-black">
                        Puzzelsysteem
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Onderhoud:</span>
                      <span className="font-medium text-black">
                        Makkelijk schoon
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-black flex items-center">
                    <Palette className="h-5 w-5 mr-2 text-primary" />
                    Beschikbare Kleuren
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    Voeg hier uw kleuropties toe via het admin panel
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {/* Placeholder color swatches */}
                    <div className="aspect-square bg-gray-800 rounded border-2 border-gray-300"></div>
                    <div className="aspect-square bg-gray-600 rounded border-2 border-gray-300"></div>
                    <div className="aspect-square bg-blue-800 rounded border-2 border-gray-300"></div>
                    <div className="aspect-square bg-red-800 rounded border-2 border-gray-300"></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-black flex items-center">
                    <Camera className="h-5 w-5 mr-2 text-primary" />
                    Fotogalerij
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Upload hier extra productfoto's en installatie-voorbeelden
                  </p>
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
      <section className="py-16 bg-black text-muted">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Klaar voor uw professionele gym vloer?
          </h2>
          <p className="text-xl text-gray-300">
            Vraag een vrijblijvende offerte aan en ontdek wat PowerTiles voor uw
            trainingsruimte kan betekenen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold"
            >
              <Link href="/offerte">Offerte Aanvragen</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-muted hover:bg-white hover:text-black bg-transparent"
            >
              <Link href="/contact">Contact Opnemen</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
