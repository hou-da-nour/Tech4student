"use client"

import { useState, useEffect } from "react"
import { auth, db } from "../lib/firebase"
import { signOut } from "firebase/auth"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"
import AdminStats from "../components/AdminStats"
import AdminProducts from "../components/AdminProducts"
import AdminOrders from "../components/AdminOrders"

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Vérification de l'authentification
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/admin/login")
    })
    return () => unsubscribe()
  }, [navigate])

  // Charger les données
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Produits triés par date
      const productsQuery = query(collection(db, "products"), orderBy("createdAt", "desc"))
      const productsSnapshot = await getDocs(productsQuery)
      const productsData = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setProducts(productsData)

      // Commandes triées par date
      const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"))
      const ordersSnapshot = await getDocs(ordersQuery)
      const ordersData = ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setOrders(ordersData)
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error)
    } finally {
      setLoading(false)
    }
  }

  // Déconnexion
  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/admin/login")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    }
  }

  // Contenu selon la section active
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminStats products={products} orders={orders} />
      case "products":
        return <AdminProducts products={products} onRefresh={fetchData} />
      case "orders":
        return <AdminOrders orders={orders} onRefresh={fetchData} />
      default:
        return <AdminStats products={products} orders={orders} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement du tableau de bord...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />
      <main className="flex-1 bg-background p-6 lg:py-12 lg:px-16 overflow-y-auto">
        <div className="max-w-7xl mx-auto pt-16 lg:pt-0">{renderContent()}</div>
      </main>
    </div>
  )
}

export default AdminDashboard
