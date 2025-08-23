"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Wrench,
  Instagram,
} from "lucide-react";
import { submitContactForm } from "@/lib/actions";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setSubmitResult(null);

    const result = await submitContactForm(formData);
    setSubmitResult(result);
    setIsSubmitting(false);

    if (result.success) {
      // Reset form on success
      const form = document.getElementById("contact-form") as HTMLFormElement;
      form?.reset();
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-muted py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Heeft u vragen over onze producten of wilt u een offerte aanvragen?
            We staan klaar om u te helpen.
          </p>
        </div>
      </section>

      {/* Contact Form & Company Info */}
      <section className="py-20 text-accent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-[#7ED321] text-black px-4 py-2 text-sm font-semibold">
                  Contactformulier
                </Badge>
                <h2 className="text-4xl font-bold text-black">
                  Stuur ons een bericht
                </h2>
                <p className="text-xl text-gray-600">
                  Heeft u vragen over onze producten of diensten? Vul het
                  formulier in en we nemen zo snel mogelijk contact met u op.
                </p>
              </div>

              <Card className="border-2">
                <CardContent className="p-8">
                  <form
                    id="contact-form"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      await handleSubmit(formData);
                    }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Voornaam *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Uw voornaam"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Achternaam *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Uw achternaam"
                          required
                        />
                      </div>
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

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefoonnummer</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+32 xxx xx xx xx"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Onderwerp *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Waar gaat uw vraag over?"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Plaatsing voorkeur</Label>
                      <RadioGroup
                        name="installation"
                        defaultValue="zelf"
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="zelf" id="zelf" />
                          <Label htmlFor="zelf" className="text-sm font-normal">
                            Ik wil de vloer zelf plaatsen
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="powertiles" id="powertiles" />
                          <Label
                            htmlFor="powertiles"
                            className="text-sm font-normal"
                          >
                            PowerTiles moet de plaatsing verzorgen
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Bericht *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Beschrijf uw vraag of project in detail..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold py-3"
                    >
                      {isSubmitting
                        ? "Bezig met versturen..."
                        : "Bericht Versturen"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

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

            {/* Company Information */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-black text-primary px-4 py-2 text-sm font-semibold">
                  Bedrijfsgegevens
                </Badge>
                <h2 className="text-4xl font-bold text-black">
                  PowerTiles België
                </h2>
                <p className="text-xl text-gray-600">
                  Uw betrouwbare partner voor premium modulaire PVC-vloeren
                </p>
              </div>

              <Card className="border-2">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-black">
                      Contactgegevens
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <span className="text-gray-700">
                          info@powertiles.be
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <span className="text-gray-700">+32 475 21 96 35</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-gray-700">
                          BTW: BE 1024.559.728
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6 space-y-4">
                    <h3 className="text-xl font-bold text-black">
                      Openingstijden
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Maandag - Vrijdag</span>
                        <span className="text-gray-700">8:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Zaterdag</span>
                        <span className="text-gray-700">9:00 - 16:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Zondag</span>
                        <span className="text-gray-700">Gesloten</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6 space-y-4">
                    <h3 className="text-xl font-bold text-black">
                      Onze Services
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <span className="text-gray-700">
                          Gratis advies & offerte
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Wrench className="h-5 w-5 text-primary" />
                        <span className="text-gray-700">
                          Professionele installatie
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="text-gray-700">Snelle levering</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Link href="/offerte">
                <Button className="w-full bg-black hover:bg-gray-800 text-muted font-semibold py-3">
                  Direct Offerte Aanvragen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7ED321]">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-[#7ED321] rounded-full w-16 h-16 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">
                  Telefoon
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600">Bel ons voor directe hulp</p>
                <a
                  href="tel:+32475219635"
                  className="text-2xl font-bold text-primary hover:text-[#6BC91A] transition-colors block"
                >
                  +32 475 21 96 35
                </a>
                <p className="text-sm text-gray-500">Ma-Vr: 8:00 - 18:00</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7ED321]">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-black rounded-full w-16 h-16 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">
                  E-mail
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600">Stuur ons een bericht</p>
                <a
                  href="mailto:info@powertiles.be"
                  className="text-xl font-bold text-primary hover:text-[#6BC91A] transition-colors block"
                >
                  info@powertiles.be
                </a>
                <p className="text-sm text-gray-500">
                  We reageren binnen 24 uur
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7ED321]">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-[#7ED321] rounded-full w-16 h-16 flex items-center justify-center">
                  <Instagram className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">
                  Social Media
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600">Volg ons voor inspiratie</p>
                <a
                  href="#"
                  className="text-xl font-bold text-primary hover:text-[#6BC91A] transition-colors block"
                >
                  @PowerTiles
                </a>
                <p className="text-sm text-gray-500">Projectfoto's & tips</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Veelgestelde Vragen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hier vindt u antwoorden op de meest gestelde vragen over onze
              producten en diensten
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl text-black">
                  Bieden jullie ook installatie aan?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ja, we bieden optionele professionele installatie door onze
                  ervaren monteurs. Dit zorgt voor een perfect eindresultaat en
                  bespaart u tijd.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl text-black">
                  Hoe lang duurt de levering?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Standaard producten leveren we binnen 5-10 werkdagen. Voor
                  speciale kleuren of grote projecten kan dit iets langer duren.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl text-black">
                  Kan ik eerst een monster ontvangen?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Natuurlijk! We versturen graag gratis monsters zodat u de
                  kwaliteit en kleur kunt beoordelen voordat u bestelt.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl text-black">
                  Wat is de garantie op de vloeren?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Onze premium PVC-vloeren komen met uitgebreide garantie. De
                  exacte voorwaarden bespreken we graag tijdens uw offerte.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-muted">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Klaar om te starten?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Neem vandaag nog contact met ons op voor een vrijblijvende offerte
            of persoonlijk advies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/offerte">
              <Button
                size="lg"
                className="bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold px-8"
              >
                Offerte Aanvragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="tel:+32475219635">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-muted hover:bg-foreground hover:text-black bg-transparent"
              >
                <Phone className="mr-2 h-5 w-5" />
                Direct Bellen
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
