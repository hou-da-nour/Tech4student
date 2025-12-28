"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Mail, MapPin, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import LoadingSpinner from "../components/LoadingSpinner"
import Toast from "../components/Toast"
import { useCart } from "../contexts/CartContext"
import { wilayas } from "../lib/wilayas"
import { validateEmail, validatePhone, validateName, validateAddress, formatPhoneNumber } from "../lib/validation"
import YouMightLike from "../components/YouMightLike"

// Clé pour le localStorage du formulaire
const FORM_STORAGE_KEY = "gymshop_checkout_form"

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    placeOrder,
    isLoading,
    subtotal,
    deliveryTotal,
    total,
  } = useCart()

  const [showCheckout, setShowCheckout] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    wilaya: "",
    commune: "",
    fullAddress: "",
    deliveryHome: false,
    deliveryOffice: false,
  })

  const [errors, setErrors] = useState({})
  const [formInitialized, setFormInitialized] = useState(false)

  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  })

  // Charger les données du formulaire depuis localStorage
  useEffect(() => {
    try {
      const savedForm = localStorage.getItem(FORM_STORAGE_KEY)
      if (savedForm) {
        const parsedForm = JSON.parse(savedForm)
        setCustomerInfo(parsedForm)
        console.log("Formulaire chargé depuis localStorage")
      }
      setFormInitialized(true)
    } catch (error) {
      console.error("Erreur lors du chargement du formulaire:", error)
      setFormInitialized(true)
    }
  }, [])

  // Sauvegarder les données du formulaire dans localStorage
  useEffect(() => {
    if (formInitialized) {
      try {
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(customerInfo))
      } catch (error) {
        console.error("Erreur lors de la sauvegarde du formulaire:", error)
      }
    }
  }, [customerInfo, formInitialized])

  const showToast = (message, type = "success") => {
    setToast({
      isVisible: true,
      message,
      type,
    })
  }

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }))
  }

  const selectedWilayaData = wilayas.find((w) => w.name === customerInfo.wilaya)
  const communes = selectedWilayaData ? selectedWilayaData.communes : []

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

  const handlePlaceOrder = async () => {
    // Validation complète
    const requiredFields = {
      fullName: "Veuillez saisir votre nom complet",
      email: "Veuillez saisir votre email",
      phone: "Veuillez saisir votre numéro de téléphone",
      fullAddress: "Veuillez saisir votre adresse complète",
      wilaya: "Veuillez choisir une wilaya",
      commune: "Veuillez choisir une commune",
    }

    const newErrors = {}
    let hasErrors = false

    // Vérifier les champs obligatoires
    Object.keys(requiredFields).forEach((field) => {
      if (!customerInfo[field] || !customerInfo[field].toString().trim()) {
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
      showToast("Veuillez corriger les erreurs dans le formulaire", "error")
      // Scroll vers la première erreur
      setTimeout(() => {
        const firstErrorElement = document.querySelector(".error-field")
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 100)
      return
    }

    try {
      const result = await placeOrder({
        ...customerInfo,
        phone: formatPhoneNumber(customerInfo.phone),
      })

      if (result.success) {
        const message = `🎉 Commande ${result.orderNumber} passée avec succès !`
        showToast(message, "success")
        setShowCheckout(false)

        // Reset du formulaire et suppression du localStorage
        setCustomerInfo({
          fullName: "",
          email: "",
          phone: "",
          wilaya: "",
          commune: "",
          fullAddress: "",
          deliveryHome: false,
          deliveryOffice: false,
        })
        localStorage.removeItem(FORM_STORAGE_KEY)
        setErrors({})
      }
    } catch (error) {
      showToast(`❌ ${error.message}`, "error")
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
            <h1 className="text-3xl font-bold text-black mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 mb-8">Découvrez nos produits et ajoutez-les à votre panier</p>
            <Link
              to="/"
              className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Continuer mes achats
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={hideToast} />

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Mon Panier</h1>
          <p className="text-gray-600">{cartItems.length} article(s) dans votre panier</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Liste des produits */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.images?.[0] || item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-black mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.selectedColor} • {item.selectedSize}
                    </p>
                    <p className="text-blue-400 font-bold">{item.price} DA</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-black">{item.price * item.quantity} DA</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 mt-1 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Résumé de commande */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50 rounded-lg p-6 h-fit sticky top-4"
          >
            <h2 className="text-xl font-bold text-black mb-6">Résumé de commande</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Sous-total ({cartItems.length} articles)</span>
                <span>{subtotal} DA</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span>{deliveryTotal} DA</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-400">{total} DA</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowCheckout(!showCheckout)}
                className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <CreditCard size={20} />
                <span>{showCheckout ? "Masquer le formulaire" : "Passer commande"}</span>
              </button>
              <Link
                to="/"
                className="block w-full text-center border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continuer mes achats
              </Link>
              <button
                onClick={clearCart}
                className="w-full text-green-500 hover:text-green-700 py-2 text-sm transition-colors"
              >
                Vider le panier
              </button>
            </div>
          </motion.div>
        </div>

        {/* Formulaire de commande */}
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-black mb-6 flex items-center">
              <Mail className="mr-2 text-blue-400" size={24} />
              Informations de livraison
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Informations personnelles */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 mb-3">Informations personnelles</h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                  <input
                    type="text"
                    value={customerInfo.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Votre nom complet"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
                      errors.fullName ? "border-green-500 error-field" : "border-gray-300"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="votre@email.com"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
                      errors.email ? "border-green-500 error-field" : "border-gray-300"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+213 X XX XX XX XX ou 0X XX XX XX XX"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
                      errors.phone ? "border-green-500 error-field" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-green-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Adresse de livraison */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <MapPin className="mr-1" size={16} />
                  Adresse de livraison
                </h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse complète *</label>
                  <textarea
                    value={customerInfo.fullAddress}
                    onChange={(e) => handleInputChange("fullAddress", e.target.value)}
                    placeholder="Votre adresse complète (rue, quartier, ville...)"
                    rows={3}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none transition-all ${
                      errors.fullAddress ? "border-green-500 error-field" : "border-gray-300"
                    }`}
                  />
                  {errors.fullAddress && (
                    <p className="text-green-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.fullAddress}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Wilaya *</label>
                  <select
                    value={customerInfo.wilaya}
                    onChange={(e) => {
                      setCustomerInfo({ ...customerInfo, wilaya: e.target.value, commune: "" })
                    }}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
                      errors.wilaya ? "border-green-500 error-field" : "border-gray-300"
                    }`}
                  >
                    <option value="">Choisir une wilaya</option>
                    {wilayas.map((wilaya) => (
                      <option key={wilaya.code} value={wilaya.name}>
                        {wilaya.name}
                      </option>
                    ))}
                  </select>
                  {errors.wilaya && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.wilaya}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commune *</label>
                  <select
                    value={customerInfo.commune}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, commune: e.target.value })}
                    disabled={!customerInfo.wilaya}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-100 transition-all ${
                      errors.commune ? "border-green-500 error-field" : "border-gray-300"
                    }`}
                  >
                    <option value="">Choisir une commune</option>
                    {communes.map((commune) => (
                      <option key={commune} value={commune}>
                        {commune}
                      </option>
                    ))}
                  </select>
                  {errors.commune && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.commune}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Type de livraison *</label>
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
            </div>

            {/* Récapitulatif final */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-3">Récapitulatif final</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{subtotal} DA</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>{deliveryTotal} DA</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total à payer</span>
                  <span className="text-blue-400">{total} DA</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowCheckout(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={isLoading}
                className="px-8 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" color="white" />
                    <span>Traitement en cours...</span>
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    <span>Confirmer la commande</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />

      {cartItems.length > 0 && (
        <YouMightLike currentProductId={null} currentCategory={cartItems[0]?.category} itemCount={6} />
      )}
    </div>
  )
}
