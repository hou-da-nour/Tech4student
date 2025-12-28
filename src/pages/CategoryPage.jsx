"use client"

import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import { products, categoryNames } from "../lib/data"

export default function CategoryPage() {
  const { category } = useParams()

  const categoryProducts = products.filter((product) => product.category === category)
  const categoryTitle = categoryNames[category] || "Produits"

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">{categoryTitle}</h1>
          <p className="text-gray-600 text-lg">Découvrez notre sélection de {categoryTitle.toLowerCase()}</p>
        </motion.div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categoryProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-gray-500 text-lg">Aucun produit trouvé dans cette catégorie.</p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  )
}
