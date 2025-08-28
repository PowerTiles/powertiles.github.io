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
  Droplets,
  Shield,
  Wrench,
  ArrowRight,
} from "lucide-react";

export default function GeventileerdePVCTegelsPage() {
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
          <span className="text-gray-900 font-medium">
            Geventileerde PVC-tegels
          </span>
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
                  className="px-4 py-2 text-sm font-semibold"
                >
                  Meest Populair
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Geventileerde PVC-tegels
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Premium kwaliteit PVC-tegels met geïntegreerde ventilatie voor
                  optimale drainage en luchtstroom. Perfect voor garages en
                  werkplaatsen.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="text-foreground font-semibold mt-6"
              >
                <Link href="/offerte">Offerte Aanvragen</Link>
              </Button>
            </div>
            <div className="relative order-first lg:order-none">
              <Image
                src="/ventilated-pvc-tiles.webp"
                alt="Geventileerde PVC-tegels in verschillende kleuren"
                width={600}
                height={400}
                className="w-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 text-accent bg-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Productbeschrijving
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Onze geventileerde PVC-tegels zijn speciaal ontworpen voor
                    ruimtes waar drainage en ventilatie cruciaal zijn. Het
                    unieke geventileerde ontwerp zorgt voor optimale luchtstroom
                    en voorkomt vochtophoping, waardoor ze ideaal zijn voor
                    garages, werkplaatsen en andere industriële toepassingen.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Deze tegels zijn oliebestendig, chemisch resistent en kunnen
                    zware belastingen aan. Het kliksysteem maakt installatie
                    eenvoudig en zorgt voor een naadloze, professionele
                    afwerking.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Unieke Eigenschappen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <Droplets className="h-8 w-8 text-foreground" />
                      </div>
                      <h4 className="font-semibold">
                        Drainage
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Optimale afvoer van vloeistoffen
                      </p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <Shield className="h-8 w-8 text-foreground" />
                      </div>
                      <h4 className="font-semibold">
                        Oliebestendig
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Resistent tegen oliën en chemicaliën
                      </p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <Wrench className="h-8 w-8 text-foreground" />
                      </div>
                      <h4 className="font-semibold">
                        Zware Belasting
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Geschikt voor zwaar verkeer
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Toepassingen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold">
                        Residentieel
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
                          <span className="text-gray-700">Kelders</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Tuinhuizen</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">
                        Commercieel
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            Autowerkplaatsen
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            Industriële ruimtes
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Magazijnen</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Servicestations</span>
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
                  <CardTitle className="text-xl">
                    Technische Specificaties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Materiaal:</span>
                      <span className="font-medium">
                        Premium PVC
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Afmetingen:</span>
                      <span className="font-medium">
                        50x50 cm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dikte:</span>
                      <span className="font-medium">
                        7-12 mm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gewicht:</span>
                      <span className="font-medium">
                        1.8 kg/m²
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Belasting:</span>
                      <span className="font-medium">
                        Tot 25 ton/m²
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Installatie:</span>
                      <span className="font-medium">
                        Kliksysteem
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Onderhoud:</span>
                      <span className="font-medium">
                        Onderhoudsvrij
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Palette className="h-5 w-5 mr-2 text-primary" />
                    Beschikbare Kleuren
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-6">
                    Alle kleuren van onze fabrikant Performance Floor
                  </p>
                  <div className="grid grid-cols-5 gap-3">
                    {[
                      { name: "Wit", color: "#FFFFFF", border: true },
                      { name: "Zwart", color: "#000000" },
                      { name: "Donkergrijs", color: "#404040" },
                      { name: "Reflexblauw", color: "#0066CC" },
                      { name: "Wit-Aluminium", color: "#F0F0F0", border: true },
                      { name: "Grijs-Aluminium", color: "#C0C0C0" },
                      { name: "Geel", color: "#FFFF00" },
                      { name: "Oranje", color: "#FF8000" },
                      { name: "Rood", color: "#FF0000" },
                      { name: "Geel-Groen", color: "#80FF00" },
                      { name: "Groen", color: "#00FF00" },
                      { name: "Lichtgrijs", color: "#D3D3D3" },
                      { name: "Blauw", color: "#0000FF" },
                      { name: "Antracietgrijs", color: "#2F2F2F" },
                      { name: "Bruin", color: "#8B4513" },
                      { name: "Ivoor", color: "#FFFFF0", border: true },
                      { name: "Grijs-Bruin", color: "#8B7355" },
                      { name: "Mint", color: "#98FB98" },
                      { name: "Limoen", color: "#32CD32" },
                      { name: "Turquoise", color: "#40E0D0" },
                      { name: "Lichtblauw", color: "#ADD8E6" },
                      { name: "Roze", color: "#FFC0CB" },
                      { name: "Violet", color: "#8A2BE2" },
                      { name: "Donkerblauw", color: "#00008B" },
                      { name: "Ultramarijnblauw", color: "#4169E1" },
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
                  <CardTitle className="text-xl flex items-center">
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
      <section className="py-16 bg-foreground/35 text-muted">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Klaar voor uw nieuwe garagevloer?
          </h2>
          <p className="text-xl text-muted-foreground">
            Vraag een vrijblijvende offerte aan en ontdek wat PowerTiles voor u
            kan betekenen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/offerte">
              <Button
                size="lg"
                className="text-foreground"
              >
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
