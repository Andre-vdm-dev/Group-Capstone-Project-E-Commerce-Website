import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectCartItems,
  selectCartTotalQty,
  selectCartTotalPrice,
} from '../store/cartSlice';

export default function BagPanel() {
  const items = useSelector(selectCartItems);
  const totalQty = useSelector(selectCartTotalQty);
  const totalPrice = useSelector(selectCartTotalPrice);

  return (
    <aside className="w-full max-w-sm rounded-lg border bg-white p-5">
      <h2 className="mb-4 text-xl font-bold">
        Your Bag ({totalQty})
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500">
          Your bag is empty.
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title || item.name || 'Product'}
                    className="h-20 w-20 rounded object-cover"
                  />
                )}

                <div className="flex-1">
                  <p className="font-medium">
                    {item.title || item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Quantity: {item.qty}
                  </p>

                  <p className="font-semibold">
                    R{(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t pt-4">
            <p className="mb-4 font-bold">
              Total: R{totalPrice.toFixed(2)}
            </p>

            <Link
              to="/cart"
              className="block rounded bg-black px-4 py-3 text-center text-white hover:bg-gray-800"
            >
              View Bag ({totalQty})
            </Link>
          </div>
        </>
      )}
    </aside>
  );
}