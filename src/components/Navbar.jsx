import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="rounded border px-3 py-2"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        <Link to="/" className="text-xl font-bold">
          Your Store
        </Link>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-lg border bg-white p-4 shadow-lg">
          <ul className="space-y-4">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={() => setIsOpen(false)}>
                Shopping Bag
              </Link>
            </li>
            <li>
              <Link to="/checkout" onClick={() => setIsOpen(false)}>
                Checkout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}