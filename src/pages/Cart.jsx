import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectCartItems,
  selectCartTotalPrice,
  increaseQty,
  decreaseQty,
  removeItem,
} from '../store/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Your Shopping Bag</h1>

      {items.length === 0 ? (
        <div className="py-10 text-center">
          <p className="mb-4 text-gray-600">Your bag is empty.</p>
          <Link to="/" className="underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <section className="space-y-4 md:col-span-2">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-wrap items-center gap-4 rounded-lg border p-4"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title || item.name || 'Product'}
                    className="h-24 w-24 rounded object-cover"
                  />
                )}

                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold">
                    {item.title || item.name || 'Product'}
                  </h2>

                  <p className="text-gray-600">
                    R{Number(item.price).toFixed(2)} each
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => dispatch(decreaseQty(item.id))}
                      aria-label={`Decrease quantity of ${item.title || item.name || 'product'}`}
                      className="rounded border px-3 py-1"
                    >
                      −
                    </button>

                    <span>{item.qty}</span>

                    <button
                      type="button"
                      onClick={() => dispatch(increaseQty(item.id))}
                      aria-label={`Increase quantity of ${item.title || item.name || 'product'}`}
                      className="rounded border px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    R{(Number(item.price) * item.qty).toFixed(2)}
                  </p>

                  <button
                    type="button"
                    onClick={() => dispatch(removeItem(item.id))}
                    className="mt-2 text-sm text-red-600 underline"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-lg border p-5">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

            <div className="flex justify-between border-b pb-4">
              <span>Subtotal</span>
              <span>R{totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-4 font-bold">
              <span>Total</span>
              <span>R{totalPrice.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="block rounded bg-black px-4 py-3 text-center text-white hover:bg-gray-800"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/"
              className="mt-4 block text-center text-sm underline"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}