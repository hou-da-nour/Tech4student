"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Plus, Minus, AlertCircle } from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { products } from "../lib/data"
import { wilayas } from "../lib/wilayas"
import { useCart } from "../contexts/CartContext"
import { validateEmail, validatePhone, validateName, validateAddress, formatPhoneNumber } from "../lib/validation"
import ProductImageCarousel from "../components/ProductImageCarousel"
import YouMightLike from "../components/YouMightLike"
export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, placeDirectOrder } = useCart() // Use placeDirectOrder from useCart instead of importing from api.js

  const product = products.find((p) => p.id === id)

  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [selectedWilaya, setSelectedWilaya] = useState("")
  const [selectedCommune, setSelectedCommune] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    fullAddress: "",
    deliveryHome: false,
    deliveryOffice: false,
  })

  // États pour les erreurs de validation
  const [errors, setErrors] = useState({})
  const [isOrderLoading, setIsOrderLoading] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Produit non trouvé</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-pink-400 hover:bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Retour à l'accueil
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const selectedWilayaData = wilayas.find((w) => w.name === selectedWilaya)
  const communes = selectedWilayaData ? selectedWilayaData.communes : []

  const deliveryPrice = customerInfo.deliveryHome ? 500 : customerInfo.deliveryOffice ? 300 : 0
  const total = product.price * quantity + deliveryPrice

  // Validation en temps réel
  const validateField = (field, value) => {
    let validation = { isValid: true, message: "" }

    switch (field) {
      case "fullName":
        validation = validateName(value)
        break
      case "email":
        validation = validateEmail(value)
        break
      case "phone":
        validation = validatePhone(value)
        break
      case "fullAddress":
        validation = validateAddress(value)
        break
      default:
        break
    }

    setErrors((prev) => ({
      ...prev,
      [field]: validation.isValid ? "" : validation.message,
    }))

    return validation.isValid
  }

  const handleInputChange = (field, value) => {
    setCustomerInfo({ ...customerInfo, [field]: value })

    // Validation en temps réel
    if (value.trim()) {
      validateField(field, value)
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleAddToCart = () => {
    // Validation des champs obligatoires
    const requiredFields = {
      selectedColor: "Veuillez choisir une couleur",
      selectedSize: "Veuillez choisir une taille",
      fullName: "Veuillez saisir votre nom complet",
      email: "Veuillez saisir votre email",
      phone: "Veuillez saisir votre numéro de téléphone",
      fullAddress: "Veuillez saisir votre adresse complète",
    }

    const newErrors = {}
    let hasErrors = false

    // Vérifier les champs obligatoires
    Object.keys(requiredFields).forEach((field) => {
      const value = field.startsWith("selected") ? eval(field) : customerInfo[field]
      if (!value || !value.toString().trim()) {
        newErrors[field] = requiredFields[field]
        hasErrors = true
      }
    })

    // Validation des formats
    if (customerInfo.fullName && !validateName(customerInfo.fullName).isValid) {
      newErrors.fullName = validateName(customerInfo.fullName).message
      hasErrors = true
    }

    if (customerInfo.email && !validateEmail(customerInfo.email).isValid) {
      newErrors.email = validateEmail(customerInfo.email).message
      hasErrors = true
    }

    if (customerInfo.phone && !validatePhone(customerInfo.phone).isValid) {
      newErrors.phone = validatePhone(customerInfo.phone).message
      hasErrors = true
    }

    if (customerInfo.fullAddress && !validateAddress(customerInfo.fullAddress).isValid) {
      newErrors.fullAddress = validateAddress(customerInfo.fullAddress).message
      hasErrors = true
    }

    // Vérifier le type de livraison
    if (!customerInfo.deliveryHome && !customerInfo.deliveryOffice) {
      newErrors.delivery = "Veuillez choisir un type de livraison"
      hasErrors = true
    }

    setErrors(newErrors)

    if (hasErrors) {
      // Scroll vers la première erreur
      const firstErrorElement = document.querySelector(".error-field")
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    // Ajouter au panier
    addToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity,
      customerInfo: {
        ...customerInfo,
        wilaya: selectedWilaya,
        commune: selectedCommune,
        phone: formatPhoneNumber(customerInfo.phone),
      },
    })

    alert("Produit ajouté au panier avec succès !")
  }

  const handleOrder = async () => {
    // Validation des champs obligatoires
    const requiredFields = {
      selectedColor: "Veuillez choisir une couleur",
      selectedSize: "Veuillez choisir une taille",
      fullName: "Veuillez saisir votre nom complet",
      email: "Veuillez saisir votre email",
      phone: "Veuillez saisir votre numéro de téléphone",
      fullAddress: "Veuillez saisir votre adresse complète",
    }

    const newErrors = {}
    let hasErrors = false

    // Vérifier les champs obligatoires
    Object.keys(requiredFields).forEach((field) => {
      const value = field.startsWith("selected") ? eval(field) : customerInfo[field]
      if (!value || !value.toString().trim()) {
        newErrors[field] = requiredFields[field]
        hasErrors = true
      }
    })

    // Validation des formats
    if (customerInfo.fullName && !validateName(customerInfo.fullName).isValid) {
      newErrors.fullName = validateName(customerInfo.fullName).message
      hasErrors = true
    }

    if (customerInfo.email && !validateEmail(customerInfo.email).isValid) {
      newErrors.email = validateEmail(customerInfo.email).message
      hasErrors = true
    }

    if (customerInfo.phone && !validatePhone(customerInfo.phone).isValid) {
      newErrors.phone = validatePhone(customerInfo.phone).message
      hasErrors = true
    }

    if (customerInfo.fullAddress && !validateAddress(customerInfo.fullAddress).isValid) {
      newErrors.fullAddress = validateAddress(customerInfo.fullAddress).message
      hasErrors = true
    }

    // Vérifier le type de livraison
    if (!customerInfo.deliveryHome && !customerInfo.deliveryOffice) {
      newErrors.delivery = "Veuillez choisir un type de livraison"
      hasErrors = true
    }

    setErrors(newErrors)

    if (hasErrors) {
      // Scroll vers la première erreur
      const firstErrorElement = document.querySelector(".error-field")
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    setIsOrderLoading(true)

    try {
      // Préparer le produit avec les sélections
      const orderItem = {
        ...product,
        selectedColor,
        selectedSize,
        quantity,
        id: `${product.id}-${Date.now()}`,
      }

      // Préparer les informations de commande
      const orderInfo = {
        ...customerInfo,
        wilaya: selectedWilaya,
        commune: selectedCommune,
        phone: formatPhoneNumber(customerInfo.phone),
      }

      console.log("Passage de commande directe avec:", { orderItem, orderInfo })

      const result = await placeDirectOrder(orderInfo, [orderItem])

      if (result.success) {
        console.log("✅ Commande enregistrée avec succès dans Firestore!")
        alert(`Commande passée avec succès ! Numéro de commande: ${result.orderNumber}`)
        // Réinitialiser le formulaire
        setCustomerInfo({
          fullName: "",
          email: "",
          phone: "",
          fullAddress: "",
          deliveryHome: false,
          deliveryOffice: false,
        })
        setSelectedWilaya("")
        setSelectedCommune("")
        setErrors({})
      }
    } catch (error) {
      console.error("Erreur lors de la commande:", error)
      alert(`Erreur lors de la commande: ${error.message}`)
    } finally {
      setIsOrderLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-400 hover:text-pink-600 mb-6"
        >
          <ArrowLeft size={20} />
          Retour
        </motion.button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Images du produit avec carrousel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <ProductImageCarousel
              images={product.images || [product.image].filter(Boolean)}
              productName={product.name}
            />
          </motion.div>

          {/* Formulaire de commande */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Détails produit */}
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center space-x-2">
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-xl">{product.originalPrice} DA</span>
                )}
                <span className="text-2xl font-bold text-blue-400">{product.price} DA</span>
              </div>
            </div>

            {/* Sélections produit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Taille *</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
                    errors.selectedSize ? "border-red-500 error-field" : "border-gray-300"
                  }`}
                >
                  <option value="">Choisir</option>
                  {product.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                {errors.selectedSize && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.selectedSize}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Couleur *</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
                    errors.selectedColor ? "border-red-500 error-field" : "border-gray-300"
                  }`}
                >
                  <option value="">Choisir</option>
                  {product.colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
                {errors.selectedColor && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.selectedColor}
                  </p>
                )}
              </div>
            </div>

            {/* Quantité */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Quantité</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Informations client */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-semibold text-black">Informations de livraison</h3>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Nom complet *</label>
                  <input
                    type="text"
                    value={customerInfo.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Votre nom complet"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
                      errors.fullName ? "border-red-500 error-field" : "border-gray-300"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">Email *</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="votre@email.com"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
                      errors.email ? "border-red-500 error-field" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">Numéro de téléphone *</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+213 X XX XX XX XX ou 0X XX XX XX XX"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
                      errors.phone ? "border-red-500 error-field" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">Adresse complète *</label>
                  <textarea
                    value={customerInfo.fullAddress}
                    onChange={(e) => handleInputChange("fullAddress", e.target.value)}
                    placeholder="Votre adresse complète (rue, quartier, ville...)"
                    rows={3}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none ${
                      errors.fullAddress ? "border-red-500 error-field" : "border-gray-300"
                    }`}
                  />
                  {errors.fullAddress && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.fullAddress}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Wilaya</label>
                  <select
                    value={selectedWilaya}
                    onChange={(e) => {
                      setSelectedWilaya(e.target.value)
                      setSelectedCommune("")
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  >
                    <option value="">Choisir wilaya</option>
                    {wilayas.map((wilaya) => (
                      <option key={wilaya.code} value={wilaya.name}>
                        {wilaya.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">Commune</label>
                  <select
                    value={selectedCommune}
                    onChange={(e) => setSelectedCommune(e.target.value)}
                    disabled={!selectedWilaya}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Choisir commune</option>
                    {communes.map((commune) => (
                      <option key={commune} value={commune}>
                        {commune}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Type de livraison */}
              <div>
                <label className="block text-sm font-medium text-black mb-3">Type de livraison *</label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={customerInfo.deliveryOffice}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          deliveryOffice: e.target.checked,
                          deliveryHome: e.target.checked ? false : customerInfo.deliveryHome,
                        })
                      }
                      className="mr-2"
                    />
                    Livraison au bureau (+300 DA)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={customerInfo.deliveryHome}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          deliveryHome: e.target.checked,
                          deliveryOffice: e.target.checked ? false : customerInfo.deliveryOffice,
                        })
                      }
                      className="mr-2"
                    />
                    Livraison à domicile (+500 DA)
                  </label>
                </div>
                {errors.delivery && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.delivery}
                  </p>
                )}
              </div>
            </div>

            {/* Détails de la commande */}
            <div className="border-t pt-6 space-y-2">
              <h3 className="text-lg font-semibold text-black">Détail de commande</h3>
              <div className="flex justify-between">
                <span>Prix produit ({quantity}x)</span>
                <span>{product.price * quantity} DA</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span>{deliveryPrice} DA</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total à payer</span>
                <span className="text-blue-400">{total} DA</span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isOrderLoading}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 text-lg rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ajouter au panier
              </button>
              <button
                onClick={handleOrder}
                disabled={isOrderLoading}
                className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 text-lg rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOrderLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Traitement...</span>
                  </>
                ) : (
                  "Commander"
                )}
              </button>
            </div>
          
          </motion.div>
        </div>
      </div>

      {isOrderLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            <p className="text-lg font-semibold">Traitement de votre commande...</p>
            <p className="text-gray-600 text-center">
              Veuillez patienter, nous enregistrons votre commande dans notre système.
            </p>
          </div>
        </div>
      )}
      <YouMightLike />
      <Footer />
    </div>
  )
}
