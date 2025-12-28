// Cette fonction utilise le contexte du panier pour passer une commande
export const placeOrder = async (customerInfo) => {
  // Cette fonction doit être utilisée dans un composant React avec le hook useCart
  // Pour l'instant, on redirige vers l'utilisation du contexte
  throw new Error("Utilisez directement placeOrder depuis useCart() dans un composant React")
}

// Fonction utilitaire pour formater les données de commande
export const formatOrderData = (product, customerInfo, quantity, selectedColor, selectedSize) => {
  const deliveryPrice = customerInfo.deliveryHome ? 500 : customerInfo.deliveryOffice ? 300 : 0
  const total = product.price * quantity + deliveryPrice

  return {
    product: {
      ...product,
      selectedColor,
      selectedSize,
      quantity,
    },
    customerInfo,
    pricing: {
      subtotal: product.price * quantity,
      deliveryFee: deliveryPrice,
      total,
    },
  }
}
