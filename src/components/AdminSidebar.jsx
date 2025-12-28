"use client"

import { useState } from "react"
import { Home, Package, ShoppingCart, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const AdminSidebar = ({ activeSection, setActiveSection, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { id: "stats", label: "Accueil", icon: Home },
    { id: "products", label: "Produits", icon: Package },
    { id: "orders", label: "Commandes", icon: ShoppingCart },
  ]

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <>
      {/* Bouton menu mobile */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#0A1F44] text-white rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isMobileMenuOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-[#FFFFFF] border-r border-gray-200 lg:static lg:inset-0"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-[#0A1F44] to-[#1ABC9C] text-white">
                <h1 className="text-xl font-bold">Tech4student Admin</h1>
                <p className="text-[#F8FAFC] text-sm mt-1">Tableau de bord</p>
              </div>

              {/* Menu */}
              <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-[#0A1F44] text-white shadow-lg"
                        : "text-gray-700 hover:bg-[#E0F7F4] hover:text-[#0A1F44] hover:shadow-md"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </nav>

              {/* Déconnexion */}
              <div className="p-4 border-t border-gray-200">
                <motion.button
                  onClick={onLogout}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Déconnexion</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export default AdminSidebar
