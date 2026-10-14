import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BagPanel from './components/BagPanel';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

export default function App() {
  const { pathname } = useLocation();

  // Figma shows the Bag panel on Home, Product and Cart only
  const showBag = pathname === '/' || pathname === '/cart' || pathname.startsWith('/product/');

  // Figma has no Navbar on the Checkout screens
  const showNav = pathname !== '/checkout';

  return (
    <div className="flex min-h-screen">
     {showNav && <Navbar />}

      <main className="min-w-0 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </main>

      {showBag && (
        <aside className="sticky top-0 hidden h-screen w-[345px] shrink-0 py-[51px] lg:flex">
          <div className="w-[3px] rounded-full bg-placeholder" />
          <div className="flex-1">
            <BagPanel />
          </div>
        </aside>
      )}
    </div>
  );
}