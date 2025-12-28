"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function ProductCard({ product }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-blue-400 text-white px-2 py-1 text-xs rounded-full">Nouveau</span>
          )}
          {product.isPromo && (
            <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded-full">Promo</span>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-black mb-2 group-hover:text-blue-400 transition-colors">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-sm">{product.originalPrice} DA</span>
              )}
              <span className="text-blue
              -400 font-bold text-lg">{product.price} DA</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm transition-colors"
            >
              Voir
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
