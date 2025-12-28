"use client"

import { useState } from "react"
import { updateDoc, deleteDoc, doc } from "firebase/firestore"
import { db } from "../lib/firebase"
import { motion, AnimatePresence } from "framer-motion"

const AdminOrders = ({ orders, onRefresh }) => {
  const [loading, setLoading] = useState(false)

  const handleStatusUpdate = async (orderId, newStatus) => {
    setLoading(true)
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: newStatus,
        updatedAt: new Date(),
      })
      onRefresh()
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error)
      alert("Erreur lors de la mise à jour du statut")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette commande?")) {
      try {
        await deleteDoc(doc(db, "orders", orderId))
        onRefresh()
      } catch (error) {
        console.error("Erreur lors de la suppression de la commande:", error)
        alert("Erreur lors de la suppression de la commande")
      }
    }
  }

  const handlePrintOrder = (order) => {
    const printWindow = window.open("", "_blank")
    const printContent = `
      <html>
        <head>
          <title>Commande ${order.orderNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .items-table th { background-color: #f2f2f2; }
            .total { font-weight: bold; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Gym Shop</h1>
            <h2>Facture de Commande</h2>
          </div>
          <p><strong>Numéro de commande:</strong> ${order.orderNumber}</p>
          <p><strong>Date:</strong> ${new Date(order.createdAt?.toDate()).toLocaleDateString("fr-FR")}</p>
          <p><strong>Statut:</strong> ${order.status === "delivered" ? "Livré" : "En attente"}</p>
          <h3>Client</h3>
          <p>${order.customerInfo?.name || "N/A"} | ${order.customerInfo?.phone || "N/A"}</p>
          <table class="items-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items?.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>${item.price?.toLocaleString()} DA</td>
                  <td>${(item.price * item.quantity)?.toLocaleString()} DA</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <p class="total">Total: ${order.total?.toLocaleString()} DA</p>
        </body>
      </html>
    `
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#0F172A]">Gestion des Commandes</h1>
        <div className="text-sm text-gray-500">Total: {orders.length} commandes</div>
      </div>

      <div className="bg-[#FFFFFF] rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                {["Commande", "Client", "Produits", "Total", "Statut", "Actions"].map((title) => (
                  <th
                    key={title}
                    className="px-6 py-3 text-left text-xs font-semibold text-[#0F172A] uppercase tracking-wider"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {orders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-gray-200 hover:bg-[#F1F8FA]"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#0F172A]">{order.orderNumber}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(order.createdAt?.toDate()).toLocaleDateString("fr-FR")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#0F172A]">{order.customerInfo?.name || "N/A"}</div>
                      <div className="text-xs text-gray-400">{order.customerInfo?.phone || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#0F172A]">
                      {order.items?.map((item, index) => (
                        <div key={index} className="mb-1">{item.name} ({item.quantity}x)</div>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#0F172A]">
                      {order.total?.toLocaleString()} DA
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "delivered"
                            ? "bg-[#1ABC9C] text-white"
                            : "bg-[#0A1F44] text-white"
                        }`}
                      >
                        {order.status === "delivered" ? "Livré" : "En attente"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {order.status !== "delivered" && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleStatusUpdate(order.id, "delivered")}
                          disabled={loading}
                          className="text-[#1ABC9C] hover:text-[#0A1F44]"
                        >
                          ✅ Livrer
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handlePrintOrder(order)}
                        className="text-[#0A1F44] hover:text-[#1ABC9C]"
                      >
                        🖨 Imprimer
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑 Supprimer
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminOrders
