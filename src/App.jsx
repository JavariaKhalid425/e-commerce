import { BrowserRouter, Route, Routes } from "react-router-dom";
import FavoritesProvider from "./context/FavoritesContext";
import CartProvider from "./context/CartContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/shop";
import Categories from "./pages/categories";
import NewArrivals from "./pages/new arrivals";
import About from "./pages/about";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <CartProvider>
          <div className="min-h-screen bg-[#121212] text-white">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/about" element={<About />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </CartProvider>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;