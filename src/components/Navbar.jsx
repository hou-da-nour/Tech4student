"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, ShoppingBag, Plus, Minus, Search } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../contexts/CartContext"

const menuItems = [
  { name: "Accueil", href: "/" },
  {
    name: "Produits",
    href: "/produits", // Updated href to point to all products page
    submenu: [
      { name: "Tous les produits", href: "/produits" }, // Added "All products" option
      { name: "Pc portable", href: "/produits/pc_portable" },
      { name: "Calculatrices", href: "/produits/calculatrices" },
      { name: "Affaires Scolaires", href: "/produits/affaires_scolaires" },
      { name: "Planners & Agendas", href: "/produits/planners" },
      { name: "Sacs et Cartables", href: "/produits/cartables" },
      { name: "Accessoires Techniques", href: "/produits/accessoires_technique" },
    ],
  },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const { cartItems } = useCart()
  const navigate = useNavigate()

  const toggleMobileSubmenu = (name) => {
    setMobileSubmenuOpen((prev) => (prev === name ? null : name))
  }

  const searchProducts = (query) => {
    if (!query.trim()) return []

    const allProducts = [
      { id: 1, name: "Pc portable", category: "pc_portable", image: "/images/pc-portable/pc-hp.jpg" },
      { id: 2, name: "Calculatrices", category: "calculatrices", image: "/images/calculatrices/calculatrice4.jpg" },
      { id: 3, name: "Affaires Scolaires", category: "affaires_scolaires", image: "/images/affaires-scolaires/graveuse.jpg" },
      { id: 4, name: "Planners & Agendas", category: "planners", image: "/images/planners/planner1.jpg" },
      { id: 5, name: "Sacs et Cartables", category: "cartables", image: "/images/cartables/sacados1.jpg" },
      { id: 6, name: "Accessoires Techniques", category: "accessoires_technique", image: "/images/accessoires-technique/casque.jpg" },
    ]

    return allProducts
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, 5)
  }

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    setShowSearchResults(query.length > 0)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/produits?search=${encodeURIComponent(searchQuery)}`) // Updated search redirect to use /produits
      setSearchQuery("")
      setShowSearchResults(false)
    }
  }

  const searchResults = searchProducts(searchQuery)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo et nom */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-[#0A1F44] rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">T</span>
            </motion.div>
            <span className="text-xl font-bold text-black">Tech4student</span>
          </Link>

          {/* Search bar for desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher des produits..."
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent"
                />
              </div>
            </form>

            <AnimatePresence>
              {showSearchResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-lg py-2 z-50 border"
                >
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/produits/${product.category}`}
                      className="flex items-center px-4 py-2 hover:bg-blue-50 transition-colors"
                      onClick={() => {
                        setSearchQuery("")
                        setShowSearchResults(false)
                      }}
                    >
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{product.category}</div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  to={item.href}
                  className="flex items-center space-x-1 text-black hover:text-blue-400 transition-colors"
                >
                  <span>{item.name}</span>
                  {item.submenu && <ChevronDown size={16} />}
                </Link>

                {/* Sous-menu desktop */}
                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-400 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Panier et menu mobile */}
          <div className="flex items-center space-x-4">
            <Link to="/panier">
              <motion.div whileHover={{ scale: 1.05 }} className="relative cursor-pointer">
                <ShoppingBag className="text-black hover:text-blue-400 transition-colors" size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </motion.div>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-black hover:text-blue-400 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg z-40 border-t border-gray-200 max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="py-4 px-4 space-y-2">
                {/* Mobile search bar */}
                <div className="mb-4 relative">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={(e) => {
                          handleSearch(e)
                          setShowSearchResults(e.target.value.length > 0)
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                    </div>
                  </form>

                  {/* Résultats recherche mobile */}
                  <AnimatePresence>
                    {showSearchResults && searchResults.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 bg-white border rounded-lg shadow-lg overflow-hidden"
                      >
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            to={`/produits/${product.category}`}
                            className="flex items-center px-4 py-3 hover:bg-blue-50 transition-colors"
                            onClick={() => {
                              setSearchQuery("")
                              setShowSearchResults(false)
                              setIsOpen(false)
                            }}
                          >
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-10 h-10 rounded object-cover mr-3"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-500 capitalize">
                                {product.category}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {menuItems.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.href}
                        className="block text-black hover:text-blue-400 transition-colors py-2 flex-1"
                        onClick={() => !item.submenu && setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.submenu && (
                        <button
                          onClick={() => toggleMobileSubmenu(item.name)}
                          className="p-2 text-gray-500 hover:text-blue-400 transition-colors"
                        >
                          {mobileSubmenuOpen === item.name ? <Minus size={16} /> : <Plus size={16} />}
                        </button>
                      )}
                    </div>

                    {/* Sous-menu mobile */}
                    <AnimatePresence>
                      {item.submenu && mobileSubmenuOpen === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 mt-2 space-y-1 border-l-2 border-blue-100 pl-4"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block text-gray-600 hover:text-blue-400 transition-colors text-sm py-2"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
