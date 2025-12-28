// "use client"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// const heroImages = [
//   {
//     id: 1,
//     image: "/10.jpeg",
//     // title: "Organise ton quotidien, maîtrise tes études ou bien Ton organisation, notre mission",
//     // subtitle: "Découvrez nos derniers modèles",
//   },
//   {
//     id: 2,
//     image: "/11.jpeg",
//     // title: "Performance, confort et mobilité",
//     // subtitle: "Pour toutes vos séances d'entraînement",
//   },
//   {
//     id: 3,
//     image: "/12.jpeg",
//     // title: "Simple,Utile ,Essentiel",
//     // subtitle: "Des matières premium pour votre bien-être",
//   },
//   {
//     id: 4,
//     image: "/13.jpeg",
//     // title: "Ton setup étudiant commence ici",
//     // subtitle: "Bougez sans limites",
//   },
// ]

// export default function HeroSection() {
//   const [currentSlide, setCurrentSlide] = useState(0)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroImages.length)
//     }, 5000)

//     return () => clearInterval(timer)
//   }, [])

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroImages.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
//   }

//   return (
//     <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentSlide}
//           initial={{ opacity: 0, x: 300 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -300 }}
//           transition={{ duration: 0.5 }}
//           className="absolute inset-0"
//         >
//           <img
//             src={heroImages[currentSlide].image || "/tech.jpeg"}
//             alt={heroImages[currentSlide].title}
//             className="w-full h-full object-cover  "
//           />
//           <div className="absolute inset-0 " />

//           <div className="absolute inset-0 flex items-center justify-center">
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="text-center text-black"
//             >
//               {/* <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Études & tech, au même endroit</h1> */}
//               {/* <p className="text-xl md:text-2xl mb-8 text-white">Études & tech, au même endroit</p> */}
//               {/* <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
//               >
//                 <a href="/produits">
//                   Découvrir
//                 </a>
//               </motion.button> */}
//             </motion.div>
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Contrôles */}
//       {/* <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-pink-300 bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
//       >
//         <ChevronLeft size={24} />
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-pink-300 bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
//       >
//         <ChevronRight size={24} />
//       </button> */}

//       {/* Indicateurs */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {heroImages.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`w-3 h-3 rounded-full transition-all ${
//               index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"

// const heroImages = [
   
//    "/11.jpeg",
//    "/12.jpeg",
//    "/5.jpeg",
// ]

// export default function HeroSection() {
//   const [currentImage, setCurrentImage] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % heroImages.length)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <section className="relative bg-background">
//       <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center md:justify-between h-[70vh] md:h-[80vh]">
//         {/* Texte + CTA */}
//         <div className="md:w-1/2 flex flex-col items-center md:items-start justify-center space-y-4 md:space-y-6 text-center md:text-left">
//           <motion.h1
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-3xl sm:text-4xl md:text-5xl font-bold text-textMain leading-tight"
//           >
//             Votre univers Tech & Scolaire
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-md sm:text-lg md:text-xl text-gray-600 max-w-md"
//           >
//             Qualité, innovation et praticité pour tous vos besoins.
//           </motion.p>

//           {/* CTA */}
//           <motion.a
//             href="/produits"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="mt-4 md:mt-6 inline-block bg-primary text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold text-lg bg-[#081736] hover:bg-[#081736] transition-colors"
//           >
//             Découvrir nos produits
//           </motion.a>
//         </div>

//         {/* Image produit animée */}
//         <div className=" flex justify-center md:justify-end mb-6 md:mb-0">
//           <motion.img
//             key={currentImage}
//             src={heroImages[currentImage]}
//             alt="Produit"
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.8 }}
//             className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-xl shadow-lg object-container"
//           />
//         </div>
//       </div>
//     </section>
//   )
// }



// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"

// const heroImages = [
//     "/1.jpg", 
//     "/13.jpeg",
//     "/2.jpeg",
//     "/3.jpeg",
  
// ]

// export default function HeroSection() {
//   const [currentImage, setCurrentImage] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % heroImages.length)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <section className="relative h-[50vh] md:h-[80vh] w-full overflow-hidden bg-background">
//       {/* Image avec effet parallax */}
//       <motion.img
//         key={currentImage}
//         src={heroImages[currentImage]}
//         alt="Produit"
//         initial={{ opacity: 0, scale: 1.05 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 1 }}
//         transition={{ duration: 1 }}
//         className="absolute top-0 left-0 w-full h-full object-cover"
//         style={{ transformOrigin: "center" }}
//       />

//       {/* Overlay dégradé pour lisibilité */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>

//       {/* Contenu */}
//       <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center justify-center h-full">
//         <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:space-y-6">
//           <motion.h1
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl sm:text-5xl md:text-6xl font-bold text-textMain leading-tight"
//           >
//             Votre univers Tech & Scolaire
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="text-lg sm:text-xl md:text-2xl text-white max-w-md"
//           >
//             Qualité, innovation et praticité pour tous vos besoins.
//           </motion.p>

//           <motion.a
//             href="/produits"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="mt-4 md:mt-6 inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg bg-[#081736] hover:bg-[#081736] transition-colors"
//           >
//             Découvrir nos produits
//           </motion.a>
//         </div>
//       </div>
//     </section>
//   )
// }

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

