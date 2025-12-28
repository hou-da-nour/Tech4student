"use client"

import { motion } from "framer-motion"

const AdminStats = ({ products, orders }) => {
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0)
  const pendingOrders = orders.filter((order) => order.status !== "delivered").length
  const deliveredOrders = orders.filter((order) => order.status === "delivered").length
;
  const stats = [
    { title: "Total Produits", value: products.length, icon: "🧑‍💻", color: "bg-[#0A1F44]" },
    { title: "Commandes Totales", value: orders.length, icon: "📦", color: "bg-[#1ABC9C]" },
    { title: "Commandes en Attente", value: pendingOrders, icon: "⏳", color: "bg-yellow-500" },
    { title: "Chiffre d'Affaires", value: `${totalRevenue.toLocaleString()} DA`, icon: "💰", color: "bg-pink-500" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground mb-3 md:mb-0">Tableau de Bord</h1>
        <div className="text-sm text-muted-foreground">
          Dernière mise à jour: {new Date().toLocaleDateString("fr-FR")}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
            className="bg-card rounded-lg p-6 border border-border cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-card-foreground mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white text-xl`}>{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders & Popular Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-lg p-6 border border-border shadow-sm"
        >
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Commandes Récentes</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-b-0 hover:bg-[#F8FAFC] transition-colors rounded-md px-2"
              >
                <div>
                  <p className="font-medium text-foreground">{order.customerInfo?.name || "Client"}</p>
                  <p className="text-sm text-muted-foreground">{order.total?.toLocaleString()} DA</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status === "delivered" ? "Livré" : "En attente"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Popular Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-lg p-6 border border-border shadow-sm"
        >
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Produits Populaires</h3>
          <div className="space-y-3">
            {products.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-b-0 hover:bg-[#F8FAFC] transition-colors rounded-md px-2"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={product.image || "/placeholder.svg?height=40&width=40"}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.price?.toLocaleString()} DA</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">Stock: {product.stock || 0}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminStats
