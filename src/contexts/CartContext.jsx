"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { db } from "../lib/firebase"
import {
  collection,
  addDoc,
  updateDoc,
  Timestamp,
  doc,
} from "firebase/firestore"
import { sendOrderConfirmationEmail } from "../lib/emailService"

const CartContext = createContext()

const CART_STORAGE_KEY = "gymshop_cart"

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  /* -------------------- LOCAL STORAGE -------------------- */

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) setCartItems(JSON.parse(savedCart))
    } catch {
      setCartItems([])
    } finally {
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    }
  }, [cartItems, isInitialized])

  /* -------------------- PANIER -------------------- */

  const addToCart = (item) => {
    setCartItems((prev) => [
      ...prev,
      {
        ...item,
        id: `${item.id}-${Date.now()}`,
        quantity: item.quantity || 1,
      },
    ])
  }

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id))

  const updateQuantity = (id, qty) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item,
      ),
    )

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  /* -------------------- TOTAUX -------------------- */

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const deliveryTotal = cartItems.reduce((sum, item) => {
    if (item.customerInfo?.deliveryHome) return sum + 500
    if (item.customerInfo?.deliveryOffice) return sum + 300
    return sum
  }, 0)

  const total = subtotal + deliveryTotal

  /* -------------------- COMMANDE DIRECTE -------------------- */

  const placeDirectOrder = async (customerInfo, items) => {
    if (!items?.length) throw new Error("Aucun produit")
    if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.email)
      throw new Error("Champs obligatoires manquants")

    setIsLoading(true)

    try {
      const now = new Date()

      const subtotal = items.reduce(
        (s, i) => s + i.price * i.quantity,
        0,
      )

      const deliveryFee = customerInfo.deliveryHome ? 500 : 300
      const total = subtotal + deliveryFee

      /* 1️⃣ créer la commande SANS orderNumber */
      const docRef = await addDoc(collection(db, "orders"), {
        orderNumber: null,
        customerInfo,
        items: items.map((item) => ({
          id: item.id.split("-")[0],
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || item.images?.[0] || "",
          selectedColor: item.selectedColor || "",
          selectedSize: item.selectedSize || "",
        })),
        subtotal,
        deliveryFee,
        total,
        status: "en attente",
        paymentMethod: "paiement à la livraison",
        source: "page produit",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        orderDate: now.toISOString(),
      })

      /* 2️⃣ générer un numéro FIABLE depuis Firestore */
      const orderNumber = `ORD-${docRef.id.slice(0, 8).toUpperCase()}`

      await updateDoc(doc(db, "orders", docRef.id), {
        orderNumber,
      })
      /* 3️⃣ email (optionnel) */
      try {
          await sendOrderConfirmationEmail({
            orderNumber,
            customerEmail: customerInfo.email,
            customerName: customerInfo.fullName,
            customerInfo,
            items,
            total,
            createdAt: now.toISOString(),
          })

      } catch (e) {
        console.warn("Email non envoyé")
      }

      return { success: true, orderNumber, orderId: docRef.id }
    } catch (error) {
      console.error("❌ Commande échouée:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /* -------------------- CONTEXT -------------------- */

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        subtotal,
        deliveryTotal,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeDirectOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart doit être utilisé dans CartProvider")
  return ctx
}
