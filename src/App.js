import "./App.css";
import { Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import { CartProvider } from "./components/CartContext";
import Cart from "./pages/Cart";
import Layout from "./components/layout/Layout";
import CheckoutSuccess from "./pages/CheckoutSuccess";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout-success" element={<CheckoutSuccess />} />
          </Routes>
        </Layout>
      </CartProvider>
    </div>
  );
}

export default App;
