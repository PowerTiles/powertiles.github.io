"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowRight,
  Calculator,
  Clock,
  Shield,
  Star,
  Palette,
} from "lucide-react";
import { submitQuoteForm } from "@/lib/actions";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface DesignData {
  width: number;
  length: number;
  totalTiles: number;
  tilesWithWaste: number;
  surface: number;
}

export default function OffertePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
  } | null>(null);
  const [designData, setDesignData] = useState<DesignData | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const hasDesign = searchParams.get("design") === "true";
    if (hasDesign) {
      const width = Number.parseFloat(searchParams.get("width") || "0");
      const length = Number.parseFloat(searchParams.get("length") || "0");
      const totalTiles = Number.parseInt(searchParams.get("totalTiles") || "0");
      const tilesWithWaste = Number.parseInt(
        searchParams.get("tilesWithWaste") || "0"
      );
      const surface = Number.parseFloat(searchParams.get("surface") || "0");

      if (width && length && totalTiles && tilesWithWaste && surface) {
        setDesignData({ width, length, totalTiles, tilesWithWaste, surface });
      }
    }
  }, [searchParams]);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setSubmitResult(null);

    if (designData) {
      formData.append("designWidth", designData.width.toString());
      formData.append("designLength", designData.length.toString());
      formData.append("designTotalTiles", designData.totalTiles.toString());
      formData.append(
        "designTilesWithWaste",
        designData.tilesWithWaste.toString()
      );
      formData.append("designSurface", designData.surface.toString());
    }

    const result = await submitQuoteForm(formData);
    setSubmitResult(result);
    setIsSubmitting(false);

    if (result.success) {
      // Reset form on success
      const form = document.getElementById("quote-form") as HTMLFormElement;
      form?.reset();
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-muted py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Offerte Aanvragen</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Vraag een vrijblijvende offerte aan voor uw project. We berekenen de
            beste oplossing voor uw specifieke situatie.
          </p>
        </div>
      </section>

      {designData && (
        <section className="py-8 bg-[#7ED321]">
          <div className="max-w-4xl mx-auto px-6">
            <Card className="border-2 border-black">
              <CardHeader className="bg-black text-muted">
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Uw Designer Tool Ontwerp
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-foreground">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-black mb-2">
                      Afmetingen
                    </h4>
                    <p className="text-gray-600">
                      {designData.width}m × {designData.length}m
                    </p>
                    <p className="text-gray-600">
                      Oppervlakte: {designData.surface} m²
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-2">
                      Tegels Berekening
                    </h4>
                    <p className="text-gray-600">
                      Tegels nodig: {designData.totalTiles} stuks
                    </p>
                    <p className="text-gray-600">
                      Inclusief snijverlies: {designData.tilesWithWaste} stuks
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-800">
                    <strong>✓ Ontwerp gedetecteerd:</strong> Uw designer tool
                    gegevens zijn automatisch ingevuld in deze offerte.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="py-16 text-accent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="mx-auto p-3 bg-[#7ED321] rounded-full w-12 h-12 flex items-center justify-center">
                <Calculator className="h-6 w-6 text-black" />
              </div>
              <h3 className="font-semibold text-black">Gratis Offerte</h3>
              <p className="text-sm text-gray-600">Geen verborgen kosten</p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto p-3 bg-black rounded-full w-12 h-12 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-black">Snelle Reactie</h3>
              <p className="text-sm text-gray-600">Binnen 24 uur antwoord</p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto p-3 bg-[#7ED321] rounded-full w-12 h-12 flex items-center justify-center">
                <Shield className="h-6 w-6 text-black" />
              </div>
              <h3 className="font-semibold text-black">Persoonlijk Advies</h3>
              <p className="text-sm text-gray-600">Op maat gemaakt</p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto p-3 bg-black rounded-full w-12 h-12 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-black">Premium Kwaliteit</h3>
              <p className="text-sm text-gray-600">Alleen het beste</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20 bg-foreground">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              Vertel ons over uw project
            </h2>
            <p className="text-xl text-gray-600">
              Vul onderstaand formulier in en ontvang binnen 24 uur een
              persoonlijke offerte
            </p>
          </div>

          <Card className="border-2 border-gray-200">
            <CardHeader className="text-accent">
              <CardTitle className="text-2xl text-black text-center">
                Offerteformulier
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form id="quote-form" action={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-black border-b pb-2">
                    Contactgegevens
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Naam *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Uw volledige naam"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mailadres *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="uw.email@voorbeeld.be"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefoonnummer *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+32 xxx xx xx xx"
                      required
                    />
                  </div>
                </div>

                {/* Project Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-black border-b pb-2">
                    Projectinformatie
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="roomType">Soort ruimte *</Label>
                      <Select name="roomType" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer type ruimte" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="garage">Garage</SelectItem>
                          <SelectItem value="gym">Home Gym</SelectItem>
                          <SelectItem value="werkplaats">Werkplaats</SelectItem>
                          <SelectItem value="showroom">Showroom</SelectItem>
                          <SelectItem value="anders">Anders</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surface">Oppervlakte (in m²) *</Label>
                      <Input
                        id="surface"
                        name="surface"
                        type="number"
                        placeholder="bijv. 50"
                        defaultValue={designData?.surface || ""}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tileType">Gewenst type tegel *</Label>
                    <Select name="tileType" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer type tegel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="geventileerd">
                          Geventileerde PVC-tegels
                        </SelectItem>
                        <SelectItem value="glad-licht">
                          Gladde kliktegels (lichte belasting)
                        </SelectItem>
                        <SelectItem value="glad-zwaar">
                          Gladde kliktegels (zware belasting)
                        </SelectItem>
                        <SelectItem value="gym">
                          Gym vloer (rubbertegels)
                        </SelectItem>
                        <SelectItem value="combinatie">
                          Combinatie van verschillende types
                        </SelectItem>
                        <SelectItem value="advies">
                          Ik wil advies over het beste type
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Services */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-black border-b pb-2">
                    Extra diensten
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="installation" name="installation" />
                      <Label
                        htmlFor="installation"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Professionele installatie gewenst
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="lighting" name="lighting" />
                      <Label
                        htmlFor="lighting"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Hexagonale LED-verlichting
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="accessories" name="accessories" />
                      <Label
                        htmlFor="accessories"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Randstukken en accessoires
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="painting" name="painting" />
                      <Label
                        htmlFor="painting"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Schilderwerken (muren/plafond)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="consultation" name="consultation" />
                      <Label
                        htmlFor="consultation"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Gratis adviesgesprek op locatie
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-black border-b pb-2">
                    Extra informatie
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="wishes">Extra wensen of opmerkingen</Label>
                    <Textarea
                      id="wishes"
                      name="wishes"
                      placeholder="Beschrijf hier eventuele specifieke wensen, kleurvoorkeuren, timing, of andere belangrijke details voor uw project..."
                      rows={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Gewenste planning</Label>
                    <Select name="timeline">
                      <SelectTrigger>
                        <SelectValue placeholder="Wanneer wilt u starten?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">Zo snel mogelijk</SelectItem>
                        <SelectItem value="month">Binnen 1 maand</SelectItem>
                        <SelectItem value="quarter">
                          Binnen 3 maanden
                        </SelectItem>
                        <SelectItem value="flexible">Flexibel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Privacy */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="privacy" name="privacy" required />
                    <Label
                      htmlFor="privacy"
                      className="text-sm leading-relaxed"
                    >
                      Ik ga akkoord met de verwerking van mijn gegevens voor het
                      opstellen van een offerte. PowerTiles gebruikt uw gegevens
                      uitsluitend voor dit doel en deelt deze niet met derden. *
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="newsletter" name="newsletter" />
                    <Label
                      htmlFor="newsletter"
                      className="text-sm leading-relaxed"
                    >
                      Ik wil graag op de hoogte blijven van nieuwe producten en
                      aanbiedingen van PowerTiles
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold py-4 text-lg"
                >
                  {isSubmitting
                    ? "Bezig met versturen..."
                    : "Offerte Aanvragen"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                {/* Success/Error Messages */}
                {submitResult && (
                  <div
                    className={`p-4 rounded-lg ${submitResult.success ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}
                  >
                    {submitResult.success
                      ? submitResult.message
                      : submitResult.error}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ... existing code for rest of the page ... */}
      {/* What Happens Next */}
      <section className="py-20 text-accent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Wat gebeurt er nu?
            </h2>
            <p className="text-xl text-gray-600">
              Ons proces na het versturen van uw offerteaanvraag
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-[#7ED321] rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">1</span>
                </div>
                <CardTitle className="text-xl text-black">
                  Bevestiging
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  U ontvangt direct een bevestiging van uw aanvraag per e-mail
                  met een uniek referentienummer.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-black rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <CardTitle className="text-xl text-black">Analyse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Onze experts analyseren uw project en stellen de beste
                  oplossing samen op basis van uw wensen.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-[#7ED321] rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">3</span>
                </div>
                <CardTitle className="text-xl text-black">Offerte</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Binnen 24 uur ontvangt u een gedetailleerde offerte met alle
                  specificaties en prijzen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Wat onze klanten zeggen
            </h2>
            <p className="text-xl text-gray-600">
              Ervaringen van tevreden PowerTiles klanten
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-primary fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Fantastische service van PowerTiles! De offerte was duidelijk
                  en de installatie perfect uitgevoerd. Onze garage ziet er nu
                  professioneel uit."
                </p>
                <div className="font-semibold text-black">
                  - Marc V., Antwerpen
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-primary fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Kwaliteit staat voorop bij PowerTiles. De vloer in onze home
                  gym is perfect en het advies was uitstekend. Zeker een
                  aanrader!"
                </p>
                <div className="font-semibold text-black">- Sarah D., Gent</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-muted">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Nog vragen?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Neem gerust contact met ons op voor meer informatie of een
            persoonlijk gesprek over uw project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold px-8"
              >
                Contact Opnemen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="tel:+32475219635">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-muted hover:bg-foreground hover:text-black bg-transparent"
              >
                Direct Bellen
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
