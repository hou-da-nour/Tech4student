import emailjs from "@emailjs/browser"

// Configuration EmailJS
const EMAILJS_SERVICE_ID = "service_gn6vxga"
const EMAILJS_TEMPLATE_ID = "template_kjka429"
const EMAILJS_PUBLIC_KEY = "AARlYXuKuwAWbWQAv"

// Initialiser EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

export const sendOrderConfirmationEmail = async (orderData) => {
  try {
    // Formater les données pour le template
    const templateParams = {
      to_email: orderData.customerEmail,
      customer_name: orderData.customerName,
      order_number: orderData.orderNumber,
      order_date: new Date(orderData.createdAt).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      total_amount: `${orderData.total} DA`,
      delivery_address: orderData.customerInfo.fullAddress
        ? `${orderData.customerInfo.fullAddress}, ${orderData.customerInfo.commune}, ${orderData.customerInfo.wilaya}`
        : `${orderData.customerInfo.commune}, ${orderData.customerInfo.wilaya}`,
      phone: orderData.customerInfo.phone,
      delivery_type:
        orderData.customerInfo.deliveryType === "domicile" ? "Livraison à domicile" : "Livraison au bureau",
      products_list: orderData.items
        .map(
          (item) =>
            `• ${item.name} (${item.selectedColor}, ${item.selectedSize}) x${item.quantity} - ${item.price * item.quantity} DA`,
        )
        .join("\n"),
      delivery_fee: `${orderData.deliveryFee} DA`,
      subtotal: `${orderData.subtotal} DA`,
      // Ajout de variables pour un template plus riche
      company_name: "Tech4student",
      company_email: "contact@tech4student.dz",
      company_phone: "+213 XX XX XX XX",
      website: "www.tech4student.dz",
    }

    console.log("Envoi de l'email avec les paramètres:", templateParams)

    // Essayer d'envoyer l'email avec un délai d'attente
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Délai d'attente dépassé")), 10000),
    )

    const emailPromise = emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)

    // Utiliser Promise.race pour limiter le temps d'attente
    const response = await Promise.race([emailPromise, timeoutPromise])

    console.log("Email envoyé avec succès:", response)
    return { success: true, response }
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)

    // Sauvegarder l'email non envoyé pour réessayer plus tard
    try {
      const failedEmails = JSON.parse(localStorage.getItem("failed_emails") || "[]")
      failedEmails.push({
        orderData,
        error: error.message,
        timestamp: Date.now(),
      })
      localStorage.setItem("failed_emails", JSON.stringify(failedEmails))
    } catch (storageError) {
      console.error("Erreur lors de la sauvegarde de l'email échoué:", storageError)
    }

    return { success: false, error: error.message }
  }
}

// Fonction pour réessayer d'envoyer les emails échoués
export const retrySendingFailedEmails = async () => {
  try {
    const failedEmails = JSON.parse(localStorage.getItem("failed_emails") || "[]")
    if (failedEmails.length === 0) return { success: true, message: "Aucun email en attente" }

    const results = []
    const remainingEmails = []

    for (const failedEmail of failedEmails) {
      try {
        const result = await sendOrderConfirmationEmail(failedEmail.orderData)
        if (result.success) {
          results.push({ orderNumber: failedEmail.orderData.orderNumber, status: "success" })
        } else {
          results.push({ orderNumber: failedEmail.orderData.orderNumber, status: "failed" })
          remainingEmails.push(failedEmail)
        }
      } catch (error) {
        results.push({ orderNumber: failedEmail.orderData.orderNumber, status: "failed", error: error.message })
        remainingEmails.push(failedEmail)
      }
    }

    localStorage.setItem("failed_emails", JSON.stringify(remainingEmails))

    return {
      success: true,
      results,
      remaining: remainingEmails.length,
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
