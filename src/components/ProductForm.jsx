"use client"

import { useState, useEffect } from "react"

const ProductForm = ({ product, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    colors: [],
    sizes: [],
    stock: "",
    description: "",
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")

  // Catégories de produits
  const categories = [
    "Casques",       // Audio
    "AirPods & Écouteurs",
    "Claviers & Souris",
    "Cartables",     // Scolaire
    "Fournitures",   // Stylos, cahiers, etc.
    "Accessoires Tech" // Câbles, batteries, supports
  ]

  // Couleurs disponibles
  const availableColors = [
    "Noir",
    "Blanc",
    "Bleu scientifique", // #0A1F44
    "Vert innovation",   // #1ABC9C
    "Gris",
    "Rouge",
    "Rose"
  ]

  // Tailles / formats disponibles (adapté au tech & scolaire)
  const availableSizes = [
    "Petit",   // ex: mini casque, petite trousse
    "Moyen",   // taille standard cartable
    "Grand",   // sac à dos / grandes fournitures
    "XL"       // éventuellement pour casques ou sacs volumineux
  ]


  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        colors: product.colors || [],
        sizes: product.sizes || [],
        stock: product.stock || "",
        description: product.description || "",
      })
      setImagePreview(product.image || "")
    }
  }, [product])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleArrayChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(
      {
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
      },
      imageFile,
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product ? "Modifier le produit" : "Ajouter un produit"}</h1>
          <p className="text-gray-600 mt-1">Remplissez les informations du produit</p>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all duration-200"
        >
          ← Retour
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Nom du produit *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Prix (DA) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Catégorie *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Stock *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Couleurs disponibles</label>
          <div className="flex flex-wrap gap-3">
            {availableColors.map((color) => (
              <label
                key={color}
                className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  checked={formData.colors.includes(color)}
                  onChange={() => handleArrayChange("colors", color)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{color}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Tailles disponibles</label>
          <div className="flex flex-wrap gap-3">
            {availableSizes.map((size) => (
              <label
                key={size}
                className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  checked={formData.sizes.includes(size)}
                  onChange={() => handleArrayChange("sizes", size)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{size}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Description du produit..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Image du produit</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Aperçu"
                className="w-40 h-40 object-cover rounded-xl border-2 border-gray-200 shadow-lg"
              />
            </div>
          )}
        </div>

        <div className="flex space-x-4 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {loading ? "Enregistrement..." : product ? "Modifier" : "Ajouter"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
