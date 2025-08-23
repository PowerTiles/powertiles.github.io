"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function QuotePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        {/* Success Message */}
        <div className="py-20 text-accent">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="bg-foreground rounded-lg shadow-xl p-12">
              <div className="w-20 h-20 bg-[#7ED321] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-black" />
              </div>
              <h1 className="text-3xl font-bold text-black mb-4">
                Bedankt voor uw aanvraag!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Uw offerteaanvraag is succesvol verzonden. Wij nemen binnen 24
                uur contact met u op om uw project te bespreken en een
                gepersonaliseerde offerte op te stellen.
              </p>
              <div className="space-y-4 text-left text-accent p-6 rounded-lg mb-8">
                <h3 className="font-semibold text-black">Wat gebeurt er nu?</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    Wij bekijken uw aanvraag binnen 2 uur
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    Een specialist neemt contact met u op
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />U
                    ontvangt een gedetailleerde offerte
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold"
                >
                  <Link href="/">Terug naar Home</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-muted"
                >
                  <Link href="#contact">Contact Opnemen</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Quote Form */}
      <div className="py-12 text-accent">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <Button
              asChild
              variant="ghost"
              className="text-black hover:text-primary p-0"
            >
              <Link href="/" className="flex items-center">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Terug naar Home
              </Link>
            </Button>
          </div>

          <Card className="shadow-xl">
            <CardHeader className="bg-black text-muted rounded-t-lg">
              <CardTitle className="text-3xl font-bold">
                Offerte Aanvragen
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Vertel ons over uw project en ontvang een gepersonaliseerde
                offerte binnen 24 uur
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-black border-b border-gray-200 pb-2">
                    Contactgegevens
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-black font-medium">
                        Naam *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        className="border-gray-300 focus:border-[#7ED321] focus:ring-[#7ED321]"
                        placeholder="Uw volledige naam"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-black font-medium">
                        E-mail *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="border-gray-300 focus:border-[#7ED321] focus:ring-[#7ED321]"
                        placeholder="uw.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-black font-medium">
                      Telefoonnummer *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="border-gray-300 focus:border-[#7ED321] focus:ring-[#7ED321]"
                      placeholder="+32 xxx xx xx xx"
                    />
                  </div>
                </div>

                {/* Project Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-black border-b border-gray-200 pb-2">
                    Projectinformatie
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="space-type"
                        className="text-black font-medium"
                      >
                        Soort ruimte *
                      </Label>
                      <Select name="space-type" required>
                        <SelectTrigger className="border-gray-300 focus:border-[#7ED321] focus:ring-[#7ED321]">
                          <SelectValue placeholder="Selecteer ruimte type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="garage">Garage</SelectItem>
                          <SelectItem value="home-gym">Home Gym</SelectItem>
                          <SelectItem value="workshop">Werkplaats</SelectItem>
                          <SelectItem value="other">Anders</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="surface-area"
                        className="text-black font-medium"
                      >
                        Oppervlakte (m²) *
                      </Label>
                      <Input
                        id="surface-area"
                        name="surface-area"
                        type="number"
                        required
                        className="border-gray-300 focus:border-[#7ED321] focus:ring-[#7ED321]"
                        placeholder="bijv. 50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="tile-type"
                      className="text-black font-medium"
                    >
                      Gewenst type tegel
                    </Label>
                    <Select name="tile-type">
                      <SelectTrigger className="border-gray-300 focus:border-[#7ED321] focus:ring-[#7ED321]">
                        <SelectValue placeholder="Selecteer tegel type (optioneel)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ventilated">
                          Geventileerde PVC-tegels
                        </SelectItem>
                        <SelectItem value="smooth-light">
                          Gladde kliktegels (lichte belasting)
                        </SelectItem>
                        <SelectItem value="smooth-heavy">
                          Gladde kliktegels (zware belasting)
                        </SelectItem>
                        <SelectItem value="led-lighting">
                          Met LED-verlichting
                        </SelectItem>
                        <SelectItem value="unsure">Nog niet zeker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Services */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-black border-b border-gray-200 pb-2">
                    Extra services
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="installation"
                        name="services"
                        value="installation"
                        className="border-gray-300 data-[state=checked]:bg-[#7ED321] data-[state=checked]:border-[#7ED321]"
                      />
                      <Label
                        htmlFor="installation"
                        className="text-black font-medium"
                      >
                        Professionele installatie gewenst
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="lighting"
                        name="services"
                        value="lighting"
                        className="border-gray-300 data-[state=checked]:bg-[#7ED321] data-[state=checked]:border-[#7ED321]"
                      />
                      <Label
                        htmlFor="lighting"
                        className="text-black font-medium"
                      >
                        LED-verlichting toevoegen
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="painting"
                        name="services"
                        value="painting"
                        className="border-gray-300 data-[state=checked]:bg-[#7ED321] data-[state=checked]:border-[#7ED321]"
                      />
                      <Label
                        htmlFor="painting"
                        className="text-black font-medium"
                      >
                        Schilderwerken (muren/plafond)
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-black border-b border-gray-200 pb-2">
                    Extra informatie
                  </h3>
                  <div className="space-y-2">
                    <Label
                      htmlFor="additional-info"
                      className="text-black font-medium"
                    >
                      Extra wensen of opmerkingen
                    </Label>
                    <Textarea
                      id="additional-info"
                      name="additional-info"
                      rows={4}
                      className="border-gray-300 focus:border-[#7ED321] focus:ring-[#7ED321]"
                      placeholder="Vertel ons meer over uw project, specifieke wensen, timing, etc."
                    />
                  </div>
                </div>

                {/* Privacy Agreement */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacy"
                      name="privacy"
                      required
                      className="border-gray-300 data-[state=checked]:bg-[#7ED321] data-[state=checked]:border-[#7ED321] mt-1"
                    />
                    <Label
                      htmlFor="privacy"
                      className="text-sm text-gray-600 leading-relaxed"
                    >
                      Ik ga akkoord met de verwerking van mijn gegevens voor het
                      opstellen van een offerte. PowerTiles respecteert uw
                      privacy en gebruikt uw gegevens uitsluitend voor dit doel.
                      *
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#7ED321] hover:bg-[#6BC91A] text-black font-semibold text-lg py-4"
                  >
                    Offerte Aanvragen
                  </Button>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    U ontvangt binnen 24 uur een gepersonaliseerde offerte van
                    ons team
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
