
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const heroImages = ["/images/accessoires-technique/airpods2.jpg", "/planner.jpeg", "/images/affaires-scolaires/souligneurs.jpg", "/pc.jpeg","/images/cartables/sacados1.jpg"]

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[80vh] overflow-hidden flex flex-col md:flex-row">
      
      {/* 🖼 Images */}
      <div className="relative w-full md:w-1/2 h-[45vh] md:h-auto md:absolute md:right-0 md:top-0 md:bottom-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={heroImages[currentImage]}
            alt="Hero"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
      </div>

      {/* ✍ Texte */}
      <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center px-6 py-5 md:py-0">
        <div className="text-center md:text-left space-y-5 max-w-lg">
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#081736]"
          >
            Votre univers Tech & Scolaire
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-md sm:text-lg"
          >
            Qualité, innovation et praticité pour tous vos besoins.
          </motion.p>

          <motion.a
            href="/produits"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-[#081736] text-white px-8 py-3 rounded-full font-semibold shadow-lg"
          >
            Découvrir nos produits
          </motion.a>

        </div>
      </div>
    </section>
  )
}

