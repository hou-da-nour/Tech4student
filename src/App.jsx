
import { Routes, Route ,  Navigate } from "react-router-dom"
import { CartProvider } from "./contexts/CartContext"
import Home from "./pages/Home"
import ProductPage from "./pages/ProductPage"
import ProductsPage from "./pages/ProductsPage"
import CategoryPage from "./pages/CategoryPage"
import ContactPage from "./pages/ContactPage"
import CartPage from "./pages/CartPage"
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import BackToTopButton from "./components/BackToTopButton"
import "./App.css"
import ScrollToTop from "./components/ScrollToTop"
import SeedProducts from "./components/SeedProducts"
function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <BackToTopButton/>
        <ScrollToTop></ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/produits" element={<ProductsPage />} />
          <Route path="/produits/:category" element={<CategoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/panier" element={<CartPage />} />
          
          {/* Admin */}
          <Route path="/admin" element={<Navigate to="/admin/login" />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/seed-products" element={<SeedProducts />} />

        </Routes>

      </div>
    </CartProvider>
  )
}

export default App
