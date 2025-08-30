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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Phone,
  AlertCircleIcon,
  CheckCircle2Icon,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
// Ensure this import path is correct for your project structure
import { SavedDesign } from "@/app/designer-tool/page";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import PreviewGrid from "@/components/designer-tool/preview-grid";

// Local storage key
const DESIGNER_STATE_KEY = "powerTilesDesigns";
const CURRENT_PROJECT_KEY = "powerTilesCurrentProject";

export default function OffertePage() {
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
  const [designData, setDesignData] = useState<SavedDesign | null>(null);
  const [availableDesigns, setAvailableDesigns] = useState<SavedDesign[]>([]); // New state for all saved designs

  const searchParams = useSearchParams();
  const router = useRouter();

  // Helper function to validate a design object
  const isValidDesign = useCallback((design: any): design is SavedDesign => {
    if (!design || typeof design !== "object") return false;

    // Check basic properties for a SavedDesign object
    const hasRequiredStringProps =
      typeof design.id === "string" &&
      typeof design.name === "string" &&
      typeof design.date === "string";

    const hasRequiredNumberProps =
      typeof design.width === "number" &&
      design.width > 0 &&
      typeof design.length === "number" &&
      design.length > 0 &&
      typeof design.tilesPerWidth === "number" &&
      design.tilesPerWidth > 0 &&
      typeof design.tilesPerLength === "number" &&
      design.tilesPerLength > 0 &&
      typeof design.totalTilesWithWaste === "number" &&
      design.totalTilesWithWaste >= 0;

    // Validate tiles is a non-empty 2D array of TileData
    const validTiles =
      Array.isArray(design.tiles) &&
      design.tiles.length > 0 &&
      design.tiles.every(
        (row: any) =>
          Array.isArray(row) &&
          row.length > 0 &&
          row.every(
            (tile: any) =>
              typeof tile === "object" &&
              tile !== null &&
              typeof tile.color === "string" &&
              typeof tile.colorName === "string"
          )
      );

    return hasRequiredStringProps && hasRequiredNumberProps && validTiles;
  }, []); // No dependencies for isValidDesign itself

  function getColorDistribution() {
    const colorCounts: { [key: string]: number } = {};

    designData?.tiles.forEach((row) => {
      row.forEach((tile) => {
        colorCounts[tile.colorName] = (colorCounts[tile.colorName] || 0) + 1;
      });
    });

    return colorCounts;
  }

  // 0. Define your form validation schema (moved here for contactForm dependency in useEffect)
  const contactFormSchema = z.object({
    // Contactgegevens
    firstName: z
      .string()
      .min(1, { message: "Gelieve uw voornaam in te vullen." })
      .max(100, { message: "Voornaam kan maximaal 100 karakters bevatten." }),
    lastName: z
      .string()
      .min(1, { message: "Gelieve uw achternaam in te vullen." })
      .max(100, { message: "Achternaam kan maximaal 100 karakters bevatten." }),
    email: z
      .string()
      .min(1, { message: "Gelieve uw e-mailadres in te vullen." })
      .email({ message: "Gelieve een geldig e-mailadres in te vullen." }),
    phone: z
      .string()
      .min(1, { message: "Gelieve uw telefoonnummer in te vullen." })
      .min(12, {
        message: "Telefoonnumber moet minimaal 12 karakters bevatten.",
      })
      .max(16, { message: "Telefoonnummer kan maximaal 16 cijfers bevatten." })
      .regex(/^\+[0-9]+$/, {
        message:
          "Telefoonnummer moet beginnen met + en alleen cijfers bevatten.",
      }),

    // Projectinformatie
    roomType: z.string().min(1, { message: "Selecteer een type ruimte." }),
    surface: z
      .number({ invalid_type_error: "Oppervlakte moet een getal zijn." })
      .positive({ message: "Oppervlakte moet groter zijn dan 0." }),
    tileType: z.string().min(1, { message: "Selecteer een type tegel." }),
    designerProject: z.string().optional(), // New field for selected designer project ID

    // Extra diensten (checkboxes are boolean)
    installation: z.boolean().optional(),
    lighting: z.boolean().optional(),
    accessories: z.boolean().optional(),
    painting: z.boolean().optional(),
    consultation: z.boolean().optional(),

    // Extra informatie
    timeline: z.string().min(1, { message: "Selecteer de gewenste planning." }),
    wishes: z.string().optional(),

    // Privacy
    privacy: z.boolean().refine((val) => val === true, {
      message: "U moet akkoord gaan met de privacyvoorwaarden.",
    }),
    newsletter: z.boolean().optional(),
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
      roomType: "",
      surface: 0,
      tileType: "",
      designerProject: "none", // Changed default value to "none"
      installation: false,
      lighting: false,
      accessories: false,
      painting: false,
      consultation: false,
      wishes: "",
      timeline: "",
      privacy: false,
      newsletter: false,
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
      formData.append("_url", "https://www.powertiles.be/offerte");
      formData.append(
        "_subject",
        `Offerte aanvraag van ${values.firstName} ${values.lastName}`
      );

      // Contactgegevens
      formData.append("Voornaam", values.firstName);
      formData.append("Achternaam", values.lastName);
      formData.append("email", values.email);
      formData.append("Telefoonnumer", values.phone);

      // Projectinformatie
      formData.append("Geselecteerd-type-ruimte?", values.roomType);
      formData.append("Oppervlakte-in-m²?", values.surface.toString());
      formData.append("Gewenst-type-tegel?", values.tileType);

      // Extra diensten
      formData.append(
        "Professionele-installatie-gewenst?",
        values.installation ? "Ja" : "Nee"
      );
      formData.append(
        "Hexagonale-LED-verlichting?",
        values.lighting ? "Ja" : "Nee"
      );
      formData.append(
        "Randstukken-en-accessoires",
        values.accessories ? "Ja" : "Nee"
      );
      formData.append(
        "Schilderwerken-(muren/plafond)?",
        values.painting ? "Ja" : "Nee"
      );
      formData.append(
        "Gratis-adviesgesprek-op-locatie?",
        values.consultation ? "Ja" : "Nee"
      );

      // Extra informatie
      formData.append("Gewenste-planning?", values.timeline);
      formData.append("Extra-wensen-of-opmerkingen?", values.wishes || "");

      // Privacy en nieuwsbrief
      formData.append("Akkoord-privacy-terms?", values.privacy ? "Ja" : "Nee");
      formData.append("Nieuwsbrief?", values.newsletter ? "Ja" : "Nee");

      // Add designer project details if available
      if (designData && values.designerProject === designData.id) {
        formData.append("Designer-tool:_Project-ID", designData.id);
        formData.append("Designer-tool:_Project-Naam", designData.name);
        formData.append(
          "Designer-tool:_Vloer-afmetingen",
          `${designData.width}m x ${designData.length}m`
        );
        formData.append(
          "Designer-tool:_Oppervlakte",
          `${(designData.width * designData.length).toFixed(1)} m²`
        );
        formData.append(
          "Designer-tool:_Tegels-in-breedte",
          `${designData.tilesPerWidth} stuks`
        );
        formData.append(
          "Designer-tool:_Tegels-in-lengte",
          `${designData.tilesPerLength} stuks`
        );
        formData.append(
          "Designer-tool:_Totaal-tegels",
          `${designData.tilesPerWidth * designData.tilesPerLength} stuks`
        );
        formData.append(
          "Designer-tool:_Totaal-tegels-(incl.-afval)",
          `${designData.totalTilesWithWaste} stuks`
        );
        formData.append(
          "Designer-tool:_Kleurverdeling",
          JSON.stringify(getColorDistribution())
        );
        // Optionally, you can also send a representation of the tile colors/layout
        formData.append(
          "Designer-tool:_Tegel-layout",
          JSON.stringify(designData.tiles)
        );
      }

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
      setDesignData(null); // Clear design data after successful submission
      contactForm.setValue("designerProject", "none"); // Clear selected project in form to "none"
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

  // Main Effect: Loads designs from localStorage and handles projectId from URL
  useEffect(() => {
    const projectIdFromUrl = searchParams.get("projectId");
    let needsToRemoveQueryParam = false;

    let allSavedDesigns: SavedDesign[] = [];
    const storedDesignsString = localStorage.getItem(DESIGNER_STATE_KEY);

    if (storedDesignsString) {
      try {
        const parsedDesigns = JSON.parse(storedDesignsString);
        if (Array.isArray(parsedDesigns)) {
          allSavedDesigns = parsedDesigns;
          setAvailableDesigns(parsedDesigns); // Set available designs state
        } else {
          localStorage.removeItem(DESIGNER_STATE_KEY);
          setAvailableDesigns([]);
        }
      } catch (err) {
        localStorage.removeItem(DESIGNER_STATE_KEY);
        toast.error("Fout bij het laden van opgeslagen ontwerpen.", {
          duration: 5000,
        });
        setAvailableDesigns([]);
      }
    } else {
      setAvailableDesigns([]);
    }

    let loadedDesign: SavedDesign | null = null;

    if (projectIdFromUrl) {
      const foundDesign = allSavedDesigns.find(
        (d) => d.id === projectIdFromUrl
      );

      if (foundDesign) {
        if (isValidDesign(foundDesign)) {
          loadedDesign = foundDesign;
        } else {
          toast.error(
            `Project "${(foundDesign as SavedDesign).name}" is ongeldig en verwijderd.`,
            { duration: 5000, closeButton: true }
          );
          allSavedDesigns = allSavedDesigns.filter(
            (d) => d.id !== projectIdFromUrl
          );
          localStorage.setItem(
            DESIGNER_STATE_KEY,
            JSON.stringify(allSavedDesigns)
          );
          setAvailableDesigns(allSavedDesigns);
          needsToRemoveQueryParam = true;
        }
      } else {
        needsToRemoveQueryParam = true;
      }
    }

    // Set designData based on what was loaded (or null if nothing valid)
    setDesignData(loadedDesign);

    // Clean up URL if necessary (moved here for clarity)
    if (needsToRemoveQueryParam) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.delete("projectId");
      const query = current.toString();
      const newUrl = query ? `?${query}` : "";
      router.replace(`${window.location.pathname}${newUrl}`);
    }
  }, [searchParams, router, isValidDesign, toast, contactForm.setValue]); // Dependencies for main effect

  // Effect to synchronize react-hook-form's 'designerProject' field with designData
  useEffect(() => {
    if (designData) {
      contactForm.setValue("designerProject", designData.id);
      toast.success(`Project "${designData.name}" geladen.`, {
        duration: 2000,
      });
    } else {
      contactForm.setValue("designerProject", "none"); // Ensure 'none' is selected if no project is loaded
    }
  }, [designData, availableDesigns, contactForm.setValue, toast]); // Depends on designData and availableDesigns to ensure options are ready

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-muted py-16 bg-foreground">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Offerte Aanvragen</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Vraag een vrijblijvende offerte aan voor uw project. We berekenen de
            beste oplossing voor uw specifieke situatie.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-accent text-accent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="mx-auto p-3 bg-primary rounded-full w-12 h-12 flex items-center justify-center">
                <Calculator className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Gratis Offerte</h3>
              <p className="text-sm text-muted-foreground">
                Geen verborgen kosten
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto p-3 border-3 border-primary rounded-full w-12 h-12 flex items-center justify-center">
                <Clock className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Snelle Reactie</h3>
              <p className="text-sm text-muted-foreground">
                Binnen 24 uur antwoord
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto p-3 bg-primary rounded-full w-12 h-12 flex items-center justify-center">
                <Shield className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">
                Persoonlijk Advies
              </h3>
              <p className="text-sm text-muted-foreground">Op maat gemaakt</p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto p-3 border-3 border-primary rounded-full w-12 h-12 flex items-center justify-center">
                <Star className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">
                Premium Kwaliteit
              </h3>
              <p className="text-sm text-muted-foreground">Alleen het beste</p>
            </div>
          </div>
        </div>
      </section>

      {designData && (
        <section className="py-8 bg-primary">
          <div className="max-w-4xl mx-auto px-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Uw Designer Tool Ontwerp
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Afmetingen:</h4>
                    <p className="text-muted-foreground">
                      {designData.width}m x {designData.length}m
                    </p>
                    <p className="text-muted-foreground">
                      Oppervlakte: {designData.width * designData.length} m²
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      Berekening van Tegels:
                    </h4>
                    <p className="text-muted-foreground">
                      Tegels nodig:{" "}
                      {designData.tilesPerLength * designData.tilesPerWidth}{" "}
                      stuks
                    </p>
                    <p className="text-muted-foreground">
                      Inclusief snijverlies: {designData.totalTilesWithWaste}{" "}
                      stuks
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Kleurverdeling:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {Object.entries(getColorDistribution()).map(
                        ([color, count]) => (
                          <li key={color} className="text-muted-foreground">
                            {color}: {count} tegels
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
                <PreviewGrid
                  tiles={designData.tiles}
                  containerHeight="400px" // Optional: specify a custom height for the preview container
                />
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Alert className="bg-green-100 border-2 border-green-400">
                  <CheckCircle2Icon />
                  <AlertTitle className="break-words line-clamp-none">
                    Ontwerp gedetecteerd: "{designData.name}"
                  </AlertTitle>
                  <AlertDescription>
                    Uw designer tool gegevens zijn automatisch bijgevoegd
                    wanneer u de offerte beneden verzendt. U kan het project
                    verwijderen van de offerte of wijzigen in the formulier
                    beneden.
                  </AlertDescription>
                </Alert>
              </CardFooter>
            </Card>
          </div>
        </section>
      )}

      {/* Quote Form */}
      <section className="py-20 ">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Vertel ons over uw project
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Vul onderstaand formulier in en ontvang binnen 24 uur een
              persoonlijke offerte
            </p>
          </div>

          <Card className="border-2 border-gray-200">
            <CardHeader className="text-accent">
              <CardTitle className="text-2xl text-center text-foreground">
                Offerteformulier
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...contactForm}>
                <form
                  onSubmit={contactForm.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Designer Tool */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold border-b pb-2">
                      Designer Tool (Optioneel)
                    </h3>
                    <FormField
                      control={contactForm.control}
                      name="designerProject"
                      render={({ field }) => (
                        <FormItem className="h-min">
                          <FormLabel>
                            Selecteer uw opgeslagen project{" "}
                            {availableDesigns.length === 0 &&
                              "(Geen opgeslagen projecten gevonden)"}
                          </FormLabel>
                          <Select
                            onValueChange={(selectedProjectId) => {
                              field.onChange(selectedProjectId); // Update react-hook-form field
                              if (!selectedProjectId) {
                                contactForm.setValue("designerProject", designData?.id);
                                return;
                              }
                              if (
                                selectedProjectId &&
                                selectedProjectId !== "none"
                              ) {
                                // Check for "none"
                                const selectedDesign = availableDesigns.find(
                                  (d) => d.id === selectedProjectId
                                );
                                if (
                                  selectedDesign &&
                                  isValidDesign(selectedDesign)
                                ) {
                                  setDesignData(selectedDesign);
                                } else {
                                  setDesignData(null); // Clear design data if selected project is invalid/not found
                                  toast.error(
                                    "Geselecteerd project is ongeldig of niet gevonden.",
                                    { duration: 3000 }
                                  );
                                  // Also clear the form field if the selection was invalid, to prevent displaying the invalid ID
                                  contactForm.setValue(
                                    "designerProject",
                                    "none"
                                  ); // Set to "none" to visually clear
                                }
                              } else {
                                // If user clears selection or selects the "none" option
                                setDesignData(null); // Clear design data
                                contactForm.setValue("designerProject", "none"); // Ensure form field is also cleared to "none"
                              }
                            }}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecteer uw project" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* Option to clear selection - Value is "none" */}
                              {availableDesigns.length === 0 ? (
                                // Changed value from "" to "no-projects-available"
                                <SelectItem value="none">
                                  Geen project toevoegen
                                </SelectItem>
                              ) : (
                                <>
                                  <SelectItem value="none">
                                    Geen project toevoegen
                                  </SelectItem>
                                  {availableDesigns.map((design) => (
                                    <SelectItem
                                      key={design.id}
                                      value={design.id}
                                    >
                                      {design.name} ({design.width}x
                                      {design.length}m)
                                    </SelectItem>
                                  ))}
                                </>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {designData && (
                      <Alert className="bg-green-100 border-2 border-green-400">
                        <CheckCircle2Icon />
                        <AlertTitle className="break-words line-clamp-none">
                          Uw designer tool gegevens van project "
                          {designData.name}" worden automatisch met de offerte
                          verzonden.
                        </AlertTitle>
                        <AlertDescription>
                          <div className="flex flex-row gap-1 justify-center items-center">
                            De details kan u bovenaan raadplegen.
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold border-b pb-2">
                      Contactgegevens
                    </h3>
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
                  </div>

                  {/* Project Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold border-b pb-2">
                      Projectinformatie
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={contactForm.control}
                        name="roomType"
                        render={({ field }) => (
                          <FormItem className="h-min">
                            <FormLabel>Soort ruimte*</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecteer type ruimte" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="garage">Garage</SelectItem>
                                <SelectItem value="home-gym">
                                  Home Gym
                                </SelectItem>
                                <SelectItem value="werkplaats">
                                  Werkplaats
                                </SelectItem>
                                <SelectItem value="showroom">
                                  Showroom
                                </SelectItem>
                                <SelectItem value="anders">Anders</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="surface"
                        render={({ field }) => (
                          <FormItem className="h-min">
                            <FormLabel>Oppervlakte (in m²)*</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Bijv. 50"
                                value={field.value || ""}
                                className="max-w-[240px]"
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="tileType"
                        render={({ field }) => (
                          <FormItem className="h-min">
                            <FormLabel>Gewenst type tegel*</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="min-w-[160px]">
                                  <SelectValue placeholder="Selecteer type tegel" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="geventileerde-pvc-tegels">
                                  Geventileerde PVC-tegels
                                </SelectItem>
                                <SelectItem value="gladde-kliktegels-lichte-belasting">
                                  Gladde kliktegels (lichte belasting)
                                </SelectItem>
                                <SelectItem value="gladde-kliktegels-zware-belasting">
                                  Gladde kliktegels (zware belasting)
                                </SelectItem>
                                <SelectItem value="gym-vloer-rubbertegels">
                                  Gym vloer (rubbertegels)
                                </SelectItem>
                                <SelectItem value="combinatie-van-verschillende-types">
                                  Combinatie van verschillende types
                                </SelectItem>
                                <SelectItem value="advies-over-beste-type-gewenst">
                                  Ik wil advies over het beste type
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Additional Services */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold border-b pb-2">
                      Extra diensten
                    </h3>
                    <div className="space-y-4">
                      <FormField
                        control={contactForm.control}
                        name="installation"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>
                              Professionele installatie gewenst
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="lighting"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Hexagonale LED-verlichting</FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contactForm.control}
                        name="accessories"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Randstukken en accessoires</FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contactForm.control}
                        name="painting"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>
                              Schilderwerken (muren/plafond)
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contactForm.control}
                        name="consultation"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>
                              Gratis adviesgesprek op locatie
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold border-b pb-2">
                      Extra informatie
                    </h3>
                    <FormField
                      control={contactForm.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem className="h-min">
                          <FormLabel>Gewenste planning*</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Wanneer wilt u starten?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="asap">
                                Zo snel mogelijk
                              </SelectItem>
                              <SelectItem value="binnen-1-maand">
                                Binnen 1 maand
                              </SelectItem>
                              <SelectItem value="binnen-3-maanden">
                                Binnen 3 maanden
                              </SelectItem>
                              <SelectItem value="flexible">Flexibel</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="wishes"
                      render={({ field }) => (
                        <FormItem className="h-min">
                          <FormLabel>Extra wensen of opmerkingen</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Beschrijf hier eventuele specifieke wensen, kleurvoorkeuren, timing, of andere belangrijke details voor uw project..."
                              rows={8}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Privacy */}
                  <div className="space-y-4">
                    <FormField
                      control={contactForm.control}
                      name="privacy"
                      render={({ field }) => (
                        <FormItem className="h-min">
                          <FormControl>
                            <div className="flex items-center gap-3">
                              <Checkbox
                                id="privacy"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <Label
                                htmlFor="privacy"
                                className="text-sm leading-relaxed"
                              >
                                *Ik ga akkoord met de verwerking van mijn
                                gegevens voor het opstellen van een offerte.
                                PowerTiles gebruikt uw gegevens uitsluitend voor
                                dit doel en deelt deze niet met derden.
                              </Label>
                            </div>
                          </FormControl>
                          <FormMessage className="ml-7" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="newsletter"
                      render={({ field }) => (
                        <FormItem className="flex items-start space-x-2">
                          <FormControl>
                            <div className="flex items-center gap-3">
                              <Checkbox
                                id="newsletter"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <Label
                                htmlFor="newsletter"
                                className="text-sm leading-relaxed"
                              >
                                Ik wil graag op de hoogte blijven van nieuwe
                                producten en aanbiedingen van PowerTiles.
                              </Label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                    className="w-full font-semibold text-foreground"
                  >
                    {isLoading ? "Bezig met verzenden..." : "Offerte Aanvragen"}
                  </Button>

                  {message.title !== "" &&
                    (message.success ? (
                      <Alert className="bg-green-100 border-2 border-green-400">
                        <CheckCircle2Icon />
                        <AlertTitle className="break-words line-clamp-none">
                          {message.title}
                        </AlertTitle>
                        <AlertDescription>
                          {message.description}
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert className="bg-red-100 border-2 border-red-400">
                        <AlertCircleIcon />
                        <AlertTitle className="break-words line-clamp-none">
                          {message.title}
                        </AlertTitle>
                        <AlertDescription>
                          {message.description}
                          {message.listOptions &&
                            message.listOptions.length > 0 && (
                              <ul className="list-inside list-disc text-sm">
                                {message.listOptions.map((option, index) => (
                                  <li key={index}>{option}</li>
                                ))}
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
      </section>

      {/* ... existing code for rest of the page ... */}
      {/* What Happens Next */}
      <section className="py-20 text-accent bg-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Wat gebeurt er nu?</h2>
            <p className="text-xl text-muted-foreground">
              Ons proces na het versturen van uw offerteaanvraag
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-primary rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <CardTitle className="text-xl">Bevestiging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  U ontvangt direct een bevestiging van uw aanvraag per e-mail
                  met een uniek referentienummer.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 border-3 border-primary rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <CardTitle className="text-xl">Analyse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Onze experts analyseren uw project en stellen de beste
                  oplossing samen op basis van uw wensen.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-primary rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <CardTitle className="text-xl">Offerte</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Binnen 24 uur ontvangt u een gedetailleerde offerte met alle
                  specificaties en prijzen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Wat onze klanten zeggen</h2>
            <p className="text-xl text-muted-foreground">
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
                <p className="text-muted-foreground mb-4 italic">
                  "Fantastische service van PowerTiles! De offerte was duidelijk
                  en de installatie perfect uitgevoerd. Onze garage ziet er nu
                  professioneel uit."
                </p>
                <div className="font-semibold">- Marc V., Antwerpen</div>
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
                <p className="text-muted-foreground mb-4 italic">
                  "Kwaliteit staat voorop bij PowerTiles. De vloer in onze home
                  gym is perfect en het advies was uitstekend. Zeker een
                  aanrader!"
                </p>
                <div className="font-semibold">- Sarah D., Gent</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground/35 text-muted">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Nog vragen?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Neem gerust contact met ons op voor meer informatie of een
            persoonlijk gesprek over uw project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact#contact-formulier">
              <Button size="lg" className="text-foreground">
                Vraag Stellen
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
