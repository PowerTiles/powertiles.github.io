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
  ArrowRight,
} from "lucide-react";

export default function GladdeKliktegelsPage() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className=" py-4 px-6 border-b">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-primary">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/producten" className="text-gray-500 hover:text-primary">
            Producten
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-gray-900 font-medium">Gladde Kliktegels</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-6 ">
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
                  Premium Kwaliteit
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-background leading-tight">
                  Gladde Kliktegels
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Strakke, gladde oppervlakken voor een professionele
                  uitstraling. Perfect voor ruimtes waar een clean, moderne look
                  gewenst is.
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
                src="/smooth-click-tiles.jpeg"
                alt="Gladde kliktegels in verschillende kleuren"
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
                    Onze gladde kliktegels bieden een strakke, professionele
                    uitstraling die perfect past in moderne garages,
                    werkplaatsen en showrooms. Het gladde oppervlak is niet
                    alleen esthetisch aantrekkelijk, maar ook praktisch in
                    onderhoud en reiniging.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Deze tegels zijn verkrijgbaar in verschillende uitvoeringen
                    voor zowel lichte als zware belasting, waardoor ze geschikt
                    zijn voor diverse toepassingen - van thuisgarages tot
                    professionele werkplaatsen.
                  </p>
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
                        Lichte Belasting
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Thuisgarages</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Hobbyruimtes</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Kantoorruimtes</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Showrooms</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-background">
                        Zware Belasting
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            Professionele werkplaatsen
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            Industriële garages
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Magazijnen</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            Productieruimtes
                          </span>
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
                        Premium PVC
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
                        7-12 mm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Oppervlak:</span>
                      <span className="font-medium text-background">Glad</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Installatie:</span>
                      <span className="font-medium text-background">
                        Kliksysteem
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Onderhoud:</span>
                      <span className="font-medium text-background">
                        Onderhoudsvrij
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
                  <p className="text-muted-foreground text-sm mb-6">
                    Alle kleuren van onze fabrikant Performance Floor
                  </p>
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
            Klaar voor uw nieuwe vloer?
          </h2>
          <p className="text-xl text-muted-foreground">
            Vraag een vrijblijvende offerte aan en ontdek wat PowerTiles voor u
            kan betekenen.
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
                className="border-foreground text-muted hover: hover:text-background bg-transparent"
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
