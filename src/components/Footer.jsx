"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold">Tech4student</span>
            </div>
            <p className="text-gray-400 mb-4">
              Votre boutique spécialisée dans les produits technologiques et scolaires. 
              Qualité, innovation et praticité pour tous vos besoins.

            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Liens utiles */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/produits" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Produits
                </Link>
              </li>
              {/* <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  À propos
                </Link>
              </li> */}
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Catégories */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produits/pc_portable" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Pc portable 
                </Link>
              </li>
              <li>
                <Link to="/produits/calculatrices" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Calculatrices
                </Link>
              </li>
              <li>
                <Link to="/produits/affaires_scolaires" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Affaire scolaire 
                </Link>
              </li>
              <li>
                <Link to="/produits/planners" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Planners & Agendas 
                </Link>
              </li>
              <li>
                <Link to="/produits/cartables" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Sacs et Cartables
                </Link>
              </li>
              <li>
                <Link to="/produits/accessoires_technique" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Accessoires Techniques
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-blue-400" />
                <span className="text-gray-400">+213 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-400" />
                <span className="text-gray-400">contact@Tech4student.dz</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-gray-400">Alger, Algérie</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2025 Tech4student. Tous droits réservés.</p>
          {/* <p>Producted By <a href="https://smartdev-dz.netlify.app" className="text-blue-300">SmartDev DZ</a></p> */}
        </motion.div>
      </div>
    </footer>
  )
}
