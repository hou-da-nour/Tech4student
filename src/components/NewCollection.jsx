"use client"

import { motion } from "framer-motion"
import { products } from "../lib/data"
import ProductCard from "./ProductCard"

export default function NewCollection() {
  const newProducts = products.filter((product) => product.isNew)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-textMain mb-4">
            Nouveautés
          </h2>
          <p className="text-gray-600 text-lg">
            Découvrez nos derniers équipements technologiques et scolaires
          </p>

        </motion.div>

        {/* Scroll horizontal */}
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-6" style={{ width: `${newProducts.length * 320}px` }}>
            {newProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-80"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
