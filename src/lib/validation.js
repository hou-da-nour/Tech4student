// Utilitaires de validation
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return {
    isValid: emailRegex.test(email),
    message: emailRegex.test(email) ? "" : "Format d'email invalide (exemple: nom@domaine.com)",
  }
}

export const validatePhone = (phone) => {
  // Accepte les formats: +213XXXXXXXXX, 0XXXXXXXXX, XXXXXXXXXX
  const phoneRegex = /^(\+213|0)?[5-7][0-9]{8}$/
  const cleanPhone = phone.replace(/[\s\-()]/g, "")

  return {
    isValid: phoneRegex.test(cleanPhone),
    message: phoneRegex.test(cleanPhone)
      ? ""
      : "Numéro de téléphone algérien invalide (ex: +213XXXXXXXXX ou 0XXXXXXXXX)",
  }
}

export const validateName = (name) => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/
  return {
    isValid: nameRegex.test(name.trim()),
    message: nameRegex.test(name.trim()) ? "" : "Le nom doit contenir entre 2 et 50 caractères (lettres uniquement)",
  }
}

export const validateAddress = (address) => {
  return {
    isValid: address.trim().length >= 10,
    message: address.trim().length >= 10 ? "" : "L'adresse doit contenir au moins 10 caractères",
  }
}

export const formatPhoneNumber = (phone) => {
  // Nettoyer le numéro
  const cleaned = phone.replace(/[\s\-()]/g, "")

  // Formater pour l'affichage
  if (cleaned.startsWith("+213")) {
    return cleaned.replace(/(\+213)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5 $6")
  } else if (cleaned.startsWith("0")) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")
  }
  return phone
}
