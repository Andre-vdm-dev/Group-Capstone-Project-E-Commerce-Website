import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';

export default function OrderSuccess() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mb-5 text-5xl text-green-600" aria-hidden="true">
        ✓
      </div>
      <h1 className="mb-3 text-3xl font-bold">
        Order Successful!
      </h1>
      <p className="mb-8 text-gray-600">
        Thank you for your order. Your purchase has been confirmed.
      </p>
      <Link
        to="/"
        className="rounded bg-black px-6 py-3 text-white"
      >
        Continue Shopping
      </Link>
    </main>
  );
}