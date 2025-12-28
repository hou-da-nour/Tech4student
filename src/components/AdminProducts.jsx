"use client"

import { useState } from "react"
import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "../lib/firebase"
import ProductForm from "./ProductForm"
import { motion, AnimatePresence } from "framer-motion"

const AdminProducts = ({ products = [], onRefresh }) => {
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAddProduct = async (productData, imageFile) => {
    setLoading(true)
    try {
      let imageUrl = ""
      if (imageFile) {
        const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`)
        const snapshot = await uploadBytes(imageRef, imageFile)
        imageUrl = await getDownloadURL(snapshot.ref)
      }

      await addDoc(collection(db, "products"), {
        ...productData,
        image: imageUrl,
        createdAt: new Date(),
        stock: Number(productData.stock) || 0,
      })
      setShowForm(false)
      onRefresh()
    } catch (error) {
      console.error(error)
      alert("Erreur lors de l'ajout du produit")
    } finally {
      setLoading(false)
    }
  }

  const handleEditProduct = async (productData, imageFile) => {
    if (!editingProduct?.id) return

    setLoading(true)
    try {
      let imageUrl = editingProduct.image || ""
      if (imageFile) {
        const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`)
        const snapshot = await uploadBytes(imageRef, imageFile)
        imageUrl = await getDownloadURL(snapshot.ref)
      }

      await updateDoc(doc(db, "products", editingProduct.id), {
        ...productData,
        image: imageUrl,
        updatedAt: new Date(),
        stock: Number(productData.stock) || 0,
      })
      setEditingProduct(null)
      setShowForm(false)
      onRefresh()
    } catch (error) {
      console.error(error)
      alert("Erreur lors de la modification du produit")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (!productId) return
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return

    try {
      await deleteDoc(doc(db, "products", productId))
      onRefresh()
    } catch (error) {
      console.error(error)
      alert("Erreur lors de la suppression du produit")
    }
  }

  const startEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const cancelForm = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  // Debug : voir les produits dans la console
  console.log("Produits reçus :", products)

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        onCancel={cancelForm}
        loading={loading}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">Gestion des Produits</h1>
          <p className="text-gray-500 mt-1">Gérez votre catalogue de produits</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#0A1F44] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1ABC9C] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          ➕ Ajouter un produit
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500 mt-6 text-center">Aucun produit pour le moment.</p>
      ) : (
        <div className="bg-[#FFFFFF] rounded-xl shadow-md border border-gray-200 overflow-x-auto">
          <table className="min-w-[700px] sm:min-w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                {["Produit", "Prix", "Stock", "Catégorie", "Actions"].map((title) => (
                  <th
                    key={title}
                    className="px-4 sm:px-6 py-3 text-left text-sm sm:text-xs font-semibold text-[#0F172A] uppercase tracking-wider"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {products.map((product, index) => {
                  const productId = product.id || index
                  const stock = Number(product.stock) || 0
                  const sizes = Array.isArray(product.sizes) ? product.sizes.join(", ") : "-"
                  const colors = Array.isArray(product.colors) ? product.colors.join(", ") : "-"
                  const imageUrl = product.image || "/placeholder.svg"
                  const name = product.name || "Produit sans nom"
                  const category = product.category || "-"

                  return (
                    <motion.tr
                      key={productId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`border-b border-gray-200 hover:bg-[#F1F8FA] ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 sm:gap-4">
                          <img
                            src={imageUrl}
                            alt={name}
                            className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl object-cover shadow-md"
                          />
                          <div className="text-sm sm:text-base">
                            <div className="font-semibold text-[#0F172A]">{name}</div>
                            <div className="text-gray-400 text-xs sm:text-sm">
                              {sizes} | {colors}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-sm sm:text-base font-bold text-[#1ABC9C]">
                          {product.price?.toLocaleString() || 0} DA
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                            stock > 10
                              ? "bg-green-100 text-green-800"
                              : stock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {stock}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gray-100 text-[#0F172A]">
                          {category}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium space-x-1 sm:space-x-2 flex flex-wrap gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => startEdit(product)}
                          className="text-[#0A1F44] hover:text-[#1ABC9C] hover:bg-[#E0F7F4] px-2 sm:px-3 py-1 rounded-lg transition-all duration-200"
                        >
                          🖊 Modifier
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 px-2 sm:px-3 py-1 rounded-lg transition-all duration-200"
                        >
                          🗑 Supprimer
                        </motion.button>
                      </td>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminProducts
