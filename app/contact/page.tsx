"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Wrench,
  Instagram,
  AlertCircleIcon,
  CheckCircle2Icon,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    success: Boolean;
    title: string;
    description: string;
    listOptions?: string[];
  }>({
    success: false,
    title: "",
    description: "",
  });

  // 0. Define your form validation schema
  const contactFormSchema = z.object({
    firstName: z
      .string()
      .min(1, {
        message: "Gelieve uw voornaam in te vullen.",
      })
      .max(100, {
        message: "Voornaam kan maximaal 100 karakters bevatten.",
      }),
    lastName: z
      .string()
      .min(1, {
        message: "Gelieve uw achternaam in te vullen.",
      })
      .max(100, {
        message: "Achternaam kan maximaal 100 karakters bevatten.",
      }),
    email: z
      .string()
      .min(1, { message: "Gelieve uw e-mailadres in te vullen." })
      .email({ message: "Gelieve een geldig e-mailadres in te vullen." }),
    phone: z
      .string()
      .min(12, {
        message: "Telefoonnumber moet minimaal 12 karakters bevatten.",
      })
      .max(16, { message: "Telefoonnummer kan maximaal 16 cijfers bevatten." })
      .regex(/^\+[0-9]+$/, {
        message:
          "Telefoonnummer moet beginnen met + en alleen cijfers bevatten.",
      })
      .optional(),
    subject: z
      .string()
      .min(1, { message: "Gelieve het onderwerp in te vullen." })
      .max(200, { message: "Onderwerp kan maximaal 200 karakters bevatten." }),
    message: z
      .string()
      .min(1, { message: "Gelieve een bericht in te vullen." })
      .max(1000, { message: "Bericht kan maximaal 1000 karakters bevatten." }),
    _honey: z.string().optional(),
  });

  // 1. Define your form.
  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    // Do something with the form values.
    // This will be type-safe and validated.
    try {
      setIsLoading(true);

      // Prepare form data for FormSubmit
      const formData = new FormData();

      // Hidden Inputs
      formData.append("_template", "box"); // Use the "box" email template
      formData.append("_honey", values._honey || ""); // Honeypot field (empty if not bot)
      formData.append("_cc", "info@powertiles.be");
      formData.append(
        "_subject",
        `Vraag van ${values.firstName} ${values.lastName}`
      );

      formData.append("Voornaam", values.firstName);
      formData.append("Achternaam", values.lastName);
      formData.append("email", values.email);
      if (values.phone) formData.append("Telefoonnummer", values.phone);
      formData.append("Onderwerp", values.subject);
      formData.append("Bericht", values.message);

      // Optional: specify FormSubmit options
      // formData.append("_captcha", "false"); // disable captcha if desired
      // formData.append("_next", "https://yourdomain.com/thank-you"); // redirect after submission

      const response = await fetch(
        "https://formsubmit.co/milan.jacqmotte@outlook.be",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Show success message
      setMessage({
        success: true,
        title: "Bericht verzonden!",
        description: "Bedankt voor uw bericht. We nemen spoedig contact op.",
      });

      contactForm.reset();
    } catch (error) {
      // Show error message
      setMessage({
        success: false,
        title: "Er is iets misgegaan.",
        description:
          "Uw bericht kon niet worden verzonden.\nProbeer het opnieuw of neem contact op via:",
        listOptions: [
          "Telefoon: +32 475 21 96 35",
          "Email: info@powertiles.be",
        ],
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className=" text-muted py-16 bg-foreground">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Heeft u vragen over onze producten of wilt u een offerte aanvragen?
            We staan klaar om u te helpen.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid min-[875px]:grid-cols-3 gap-8 mb-16">
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-primary rounded-full w-16 h-16 flex items-center justify-center">
                  <Phone className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold">Telefoon</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Bel ons voor directe hulp
                </p>
                <a
                  href="tel:+32475219635"
                  className="text-xl font-bold text-primary hover:text-primary/80 transition-colors block"
                >
                  +32 475 21 96 35
                </a>
                <p className="text-sm text-gray-500">Ma-Vr: 8:00 - 18:00</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 border-3 border-primary rounded-full w-16 h-16 flex items-center justify-center">
                  <Mail className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold">E-mail</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-foreground">Stuur ons een bericht</p>
                <a
                  href="mailto:info@powertiles.be"
                  className="text-xl font-bold text-primary hover:text-primary/80 transition-colors block"
                >
                  info@powertiles.be
                </a>
                <p className="text-sm text-gray-500">
                  We reageren binnen 24 uur
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-primary rounded-full w-16 h-16 flex items-center justify-center">
                  <Instagram className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  Social Media
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Volg ons voor inspiratie
                </p>
                <a
                  href="https://www.instagram.com/powertiles.be"
                  className="text-xl font-bold text-primary hover:text-primary/80 transition-colors block"
                >
                  @PowerTiles
                </a>
                <p className="text-sm text-gray-500">Projectfoto's & tips</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form & Company Info */}
      <section className="bg-accent text-accent">
        <div className="grid lg:grid-cols-2">
          {/* Company Information */}
          <div className="bg-[repeating-linear-gradient(45deg,theme(colors.gray.300)_0_2px,transparent_1px_12px)]">
            <div className="max-w-7xl mx-auto py-20 px-10 space-y-8 ">
              <div className="space-y-4">
                <Badge className="px-4 py-2 text-sm font-semibold">
                  Onze bedrijfsgegevens
                </Badge>
                <h2 className="text-4xl font-bold text-foreground">
                  PowerTiles België
                </h2>
                <p className="text-xl text-muted-foreground">
                  Uw betrouwbare partner voor premium modulaire PVC-vloeren
                </p>
              </div>

              <Card className="border-2">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Contactgegevens</h3>
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
                    <h3 className="text-xl font-bold">Openingstijden</h3>
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
                    <h3 className="text-xl font-bold">Onze Services</h3>
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
                <Button
                  variant="outline"
                  className="w-full font-semibold py-3 bg-foreground"
                >
                  Direct Offerte Aanvragen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div
            id="contact-formulier"
            className="max-w-4xl mx-auto py-20 px-6 order-first lg:order-none"
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="px-4 py-2 text-sm font-semibold">
                  Contactformulier
                </Badge>
                <h2 className="text-4xl font-bold text-foreground">
                  Stuur ons een bericht
                </h2>
                <p className="text-xl text-muted-foreground">
                  Heeft u vragen over onze producten of diensten? Vul het
                  formulier in en we nemen zo snel mogelijk contact met u op.
                </p>
              </div>

              <Card className="border-2">
                <CardContent className="p-8">
                  <Form {...contactForm}>
                    <form
                      onSubmit={contactForm.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={contactForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem className="h-min">
                              <FormLabel>Voornaam*</FormLabel>
                              <FormControl>
                                <Input placeholder="Uw voornaam" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={contactForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem className="h-min">
                              <FormLabel>Achternaam*</FormLabel>
                              <FormControl>
                                <Input placeholder="Uw achternaam" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={contactForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="h-min">
                              <FormLabel>E-mailadres*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="uw.email@voorbeeld.be"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={contactForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="h-min">
                              <FormLabel>Telefoonnummer*</FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  inputMode="tel"
                                  autoComplete="tel"
                                  placeholder="+xx xxx xx xx xx"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={contactForm.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem className="h-min">
                            <FormLabel>Onderwerp*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Waar gaat uw vraag over?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contactForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem className="h-min">
                            <FormLabel>Bericht*</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Beschrijf uw vraag of project in detail..."
                                rows={6}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contactForm.control}
                        name="_honey"
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            tabIndex={-1}
                            autoComplete="off"
                            className="hidden"
                          />
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full font-semibold"
                      >
                        {isLoading
                          ? "Bezig met verzenden..."
                          : "Bericht verzenden"}
                      </Button>

                      {message.title !== "" &&
                        (message.success ? (
                          <Alert className="bg-green-100 border-2 border-green-400">
                            <CheckCircle2Icon />
                            <AlertTitle>{message.title}</AlertTitle>
                            <AlertDescription>
                              {message.description}
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <Alert className="bg-red-100 border-2 border-red-400">
                            <AlertCircleIcon />
                            <AlertTitle>{message.title}</AlertTitle>
                            <AlertDescription>
                              {message.description}
                              {message.listOptions &&
                                message.listOptions.length > 0 && (
                                  <ul className="list-inside list-disc text-sm">
                                    {message.listOptions.map(
                                      (option, index) => (
                                        <li key={index}>{option}</li>
                                      )
                                    )}
                                  </ul>
                                )}
                            </AlertDescription>
                          </Alert>
                        ))}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Veelgestelde Vragen</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hier vindt u antwoorden op de meest gestelde vragen over onze
              producten en diensten
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">
                  Bieden jullie ook installatie aan?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ja, we bieden optionele professionele installatie door onze
                  ervaren monteurs. Dit zorgt voor een perfect eindresultaat en
                  bespaart u tijd.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">
                  Hoe lang duurt de levering?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Standaard producten leveren we binnen 5-10 werkdagen. Voor
                  speciale kleuren of grote projecten kan dit iets langer duren.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">
                  Kan ik eerst een monster ontvangen?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Natuurlijk! We versturen graag gratis monsters zodat u de
                  kwaliteit en kleur kunt beoordelen voordat u bestelt.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">
                  Wat is de garantie op de vloeren?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Onze premium PVC-vloeren komen met uitgebreide garantie. De
                  exacte voorwaarden bespreken we graag tijdens uw offerte.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground/35 text-muted">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Klaar om te starten?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Neem vandaag nog contact met ons op voor een vrijblijvende offerte
            of persoonlijk advies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/offerte">
              <Button size="lg" className="text-foreground">
                Offerte Aanvragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="tel:+32475219635">
              <Button
                size="lg"
                variant="outline"
                className="border-background text-muted hover: hover:text-foreground bg-transparent"
              >
                <Phone className="mr-2 h-5 w-5" />
                Direct Bellen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
