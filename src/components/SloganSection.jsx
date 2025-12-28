"use client"

import { motion } from "framer-motion"

const slogans = [
  "Casques innovants pour tous les usages",
  "AirPods et écouteurs de dernière génération",
  "Cartables et fournitures scolaires pratiques",
  "Accessoires tech pour faciliter votre quotidien",
  "Qualité, innovation et praticité pour tous"
]

export default function SloganTicker() {
  return (
    <section className="py-4 bg-background overflow-hidden border-t border-b border-gray-200">
      <div className="relative">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear"
            }
          }}
        >
          {slogans.concat(slogans).map((text, index) => (
            <span
              key={index}
              className="text-textMain font-semibold text-lg mx-8"
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
