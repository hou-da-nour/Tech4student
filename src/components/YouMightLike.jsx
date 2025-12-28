"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import ProductCard from "./ProductCard"
import { products } from "../lib/data"

export default function YouMightLike({ currentProductId, currentCategory, itemCount = 4 }) {
  const [recommendedProducts, setRecommendedProducts] = useState([])

  useEffect(() => {
    // Filter out current product and get recommendations
    const filtered = products.filter((product) => product.id !== currentProductId)

    // Prioritize same category products
    const sameCategory = filtered.filter((product) => product.category === currentCategory)
    const otherProducts = filtered.filter((product) => product.category !== currentCategory)

    // Mix same category and other products
    const mixed = [...sameCategory, ...otherProducts]

    // Shuffle and take requested count
    const shuffled = mixed.sort(() => Math.random() - 0.5)
    setRecommendedProducts(shuffled.slice(0, itemCount))
  }, [currentProductId, currentCategory, itemCount])

  if (recommendedProducts.length === 0) {
    return null
  }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <Heart className="text-blue-400 mr-2" size={24} />
          <h2 className="text-2xl font-bold text-black">Vous pourriez aussi aimer</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
