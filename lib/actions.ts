"use server"

import { sendContactEmail, sendQuoteEmail, type ContactFormData, type QuoteFormData } from "./email"

export async function submitContactForm(formData: FormData) {
  try {
    const data: ContactFormData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      placement: formData.get("placement") as string,
      message: formData.get("message") as string,
    }

    // Basic validation
    if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
      return { success: false, error: "Alle verplichte velden moeten worden ingevuld" }
    }

    const result = await sendContactEmail(data)

    if (result.success) {
      return { success: true, message: "Uw bericht is succesvol verzonden. We nemen binnen 24 uur contact met u op." }
    } else {
      return {
        success: false,
        error: "Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het opnieuw.",
      }
    }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return { success: false, error: "Er is een onverwachte fout opgetreden. Probeer het opnieuw." }
  }
}

export async function submitQuoteForm(formData: FormData) {
  try {
    const services: string[] = []

    // Extract checkbox values
    if (formData.get("installation")) services.push("Professionele installatie")
    if (formData.get("lighting")) services.push("LED-verlichting")
    if (formData.get("accessories")) services.push("Randstukken en accessoires")
    if (formData.get("painting")) services.push("Schilderwerken")
    if (formData.get("consultation")) services.push("Adviesgesprek op locatie")

    const data: QuoteFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      roomType: formData.get("roomType") as string,
      surface: formData.get("surface") as string,
      tileType: formData.get("tileType") as string,
      services,
      additionalInfo: formData.get("additionalInfo") as string,
      timeline: formData.get("timeline") as string,
    }

    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.roomType || !data.surface) {
      return { success: false, error: "Alle verplichte velden moeten worden ingevuld" }
    }

    const result = await sendQuoteEmail(data)

    if (result.success) {
      return {
        success: true,
        message: "Uw offerteaanvraag is succesvol verzonden. We nemen binnen 24 uur contact met u op.",
      }
    } else {
      return {
        success: false,
        error: "Er is een fout opgetreden bij het verzenden van uw aanvraag. Probeer het opnieuw.",
      }
    }
  } catch (error) {
    console.error("Quote form submission error:", error)
    return { success: false, error: "Er is een onverwachte fout opgetreden. Probeer het opnieuw." }
  }
}
