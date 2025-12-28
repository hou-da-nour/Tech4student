"use client"

import { useEffect, useState } from "react"
import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "../lib/firebase"
import { products as seedProducts } from "../lib/data"

const SeedProducts = () => {
  const [status, setStatus] = useState("En attente...")

  useEffect(() => {
    const seed = async () => {
      setStatus("Ajout des produits en cours...")
      try {
        const colRef = collection(db, "products")

        for (const product of seedProducts) {
          // Utilise setDoc avec l'id du produit pour écraser ou créer
          await setDoc(doc(colRef, product.id), {
            ...product,
            stock: Number(product.stock) || 0,
            createdAt: new Date(),
          })
          console.log("Produit ajouté ou mis à jour :", product.name)
        }

        setStatus("Seed terminé ! Tous les produits sont à jour.")
      } catch (error) {
        console.error("Erreur lors du seed :", error)
        setStatus("Erreur lors du seed")
      }
    }

    seed()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Seed des Produits</h1>
      <p>Status : {status}</p>
    </div>
  )
}

export default SeedProducts
