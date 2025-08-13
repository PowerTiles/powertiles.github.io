import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  placement: string
  message: string
}

export interface QuoteFormData {
  name: string
  email: string
  phone: string
  roomType: string
  surface: string
  tileType?: string
  services: string[]
  additionalInfo?: string
  timeline?: string
  designData?: {
    width: number
    length: number
    totalTiles: number
    tilesWithWaste: number
    surface: number
  }
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "PowerTiles Website <noreply@powertiles.be>",
      to: ["info@powertiles.be"],
      subject: `Nieuwe contactaanvraag: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #000; color: white; padding: 20px; text-align: center;">
            <h1 style="color: #7ED321; margin: 0;">PowerTiles</h1>
            <p style="margin: 5px 0 0 0;">Nieuwe contactaanvraag</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #000; border-bottom: 2px solid #7ED321; padding-bottom: 10px;">Contactgegevens</h2>
            <p><strong>Naam:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>E-mail:</strong> ${data.email}</p>
            <p><strong>Telefoon:</strong> ${data.phone || "Niet opgegeven"}</p>
            
            <h2 style="color: #000; border-bottom: 2px solid #7ED321; padding-bottom: 10px; margin-top: 30px;">Aanvraag Details</h2>
            <p><strong>Onderwerp:</strong> ${data.subject}</p>
            <p><strong>Plaatsing voorkeur:</strong> ${data.placement === "zelf" ? "Zelf plaatsen" : "PowerTiles plaatsing"}</p>
            
            <h2 style="color: #000; border-bottom: 2px solid #7ED321; padding-bottom: 10px; margin-top: 30px;">Bericht</h2>
            <div style="background-color: white; padding: 20px; border-left: 4px solid #7ED321;">
              ${data.message.replace(/\n/g, "<br>")}
            </div>
          </div>
          
          <div style="background-color: #000; color: #7ED321; padding: 20px; text-align: center;">
            <p style="margin: 0;">PowerTiles - Transform Your Space. Unleash the Power.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Email send error:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error("Email send error:", error)
    return { success: false, error: "Failed to send email" }
  }
}

export async function sendQuoteEmail(data: QuoteFormData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "PowerTiles Website <noreply@powertiles.be>",
      to: ["info@powertiles.be"],
      subject: `Nieuwe offerteaanvraag van ${data.name}${data.designData ? " (met Designer Tool ontwerp)" : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #000; color: white; padding: 20px; text-align: center;">
            <h1 style="color: #7ED321; margin: 0;">PowerTiles</h1>
            <p style="margin: 5px 0 0 0;">Nieuwe offerteaanvraag${data.designData ? " (met Designer Tool ontwerp)" : ""}</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #000; border-bottom: 2px solid #7ED321; padding-bottom: 10px;">Contactgegevens</h2>
            <p><strong>Naam:</strong> ${data.name}</p>
            <p><strong>E-mail:</strong> ${data.email}</p>
            <p><strong>Telefoon:</strong> ${data.phone}</p>
            
            ${
              data.designData
                ? `
            <h2 style="color: #000; border-bottom: 2px solid #7ED321; padding-bottom: 10px; margin-top: 30px;">🎨 Designer Tool Ontwerp</h2>
            <div style="background-color: #7ED321; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; color: #000; font-weight: bold;">✓ Klant heeft de Designer Tool gebruikt</p>
            </div>
            <div style="background-color: white; padding: 20px; border-left: 4px solid #7ED321;">
              <p><strong>Afmetingen:</strong> ${data.designData.width}m × ${data.designData.length}m</p>
              <p><strong>Oppervlakte:</strong> ${data.designData.surface} m²</p>
              <p><strong>Tegels nodig:</strong> ${data.designData.totalTiles} stuks</p>
              <p><strong>Inclusief snijverlies (10%):</strong> ${data.designData.tilesWithWaste} stuks</p>
              <p style="color: #7ED321; font-weight: bold;">→ Exacte berekening beschikbaar via Designer Tool</p>
            </div>
            `
                : ""
            }
            
            <h2 style="color: #000; border-bottom: 2px solid #7ED321; padding-bottom: 10px; margin-top: 30px;">Project Details</h2>
            <p><strong>Type ruimte:</strong> ${data.roomType}</p>
            <p><strong>Oppervlakte:</strong> ${data.surface} m²</p>
            <p><strong>Type tegel:</strong> ${data.tileType || "Niet gespecificeerd"}</p>
            <p><strong>Gewenste planning:</strong> ${data.timeline || "Niet gespecificeerd"}</p>
            
            ${
              data.services.length > 0
                ? `
            <h2 style="color: #000; border-bottom: 2px solid #7ED321; padding-bottom: 10px; margin-top: 30px;">Extra Diensten</h2>
            <ul>
              ${data.services.map((service) => `<li>${service}</li>`).join("")}
            </ul>
            `
                : ""
            }
            
            ${
              data.additionalInfo
                ? `
            <h2 style="color: #000; border-bottom: 2px solid #7ED321; padding-bottom: 10px; margin-top: 30px;">Extra Informatie</h2>
            <div style="background-color: white; padding: 20px; border-left: 4px solid #7ED321;">
              ${data.additionalInfo.replace(/\n/g, "<br>")}
            </div>
            `
                : ""
            }
          </div>
          
          <div style="background-color: #000; color: #7ED321; padding: 20px; text-align: center;">
            <p style="margin: 0;">PowerTiles - Transform Your Space. Unleash the Power.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Email send error:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error("Email send error:", error)
    return { success: false, error: "Failed to send email" }
  }
}
