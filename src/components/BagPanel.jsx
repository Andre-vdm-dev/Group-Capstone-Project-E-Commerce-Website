import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  selectCartItems,
  selectCartTotalQty,
  selectCartTotalPrice,
} from '../store/cartSlice';

export default function BagPanel() {
  const items = useSelector(selectCartItems);
  const totalQty = useSelector(selectCartTotalQty);
  const totalPrice = useSelector(selectCartTotalPrice);
  const { pathname } = useLocation();

  // In Figma, the Bag page shows the total + a Checkout button instead of "View Bag"
  const onCartPage = pathname === '/cart';

  return (
    <aside className="flex flex-col items-center gap-[10px] px-2 pb-2 pt-[72px]">
      <h2 className="p-2 text-h2 font-medium text-dark">Bag</h2>

      {items.length === 0 ? (
        <p className="p-2 text-h6 tracking-condensed text-tertiary">Your bag is empty.</p>
      ) : (
        <>
          {/* Thumbnails, 3 per row */}
          <div className="grid grid-cols-3 gap-4 p-2">
            {items.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                state={{ product: item }}
                title={`${item.name} – ${item.variant}`}
                className="relative flex items-center rounded-thumb bg-white p-2"
              >
                <img src={item.image} alt={item.name} className="size-16 object-contain" />
                {item.qty > 1 && (
                  <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-dark text-h7 text-white">
                    {item.qty}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex w-full flex-col items-center gap-8 p-4">
            {onCartPage && (
              <p className="flex gap-4 text-h5 text-dark">
                <span className="font-medium">Bag Total:</span>
                <span>$ {totalPrice.toFixed(2)}</span>
              </p>
            )}

            <Link
              to={onCartPage ? '/checkout' : '/cart'}
              aria-label={onCartPage ? 'Go to checkout' : `View bag (${totalQty} items)`}
              className="flex items-center justify-center gap-2 rounded-btn bg-dark px-6 py-2 text-h5 font-medium text-white"
            >
              <img src="/assets/icons/bag-white.svg" alt="" className="size-6" />
              {onCartPage ? 'Checkout' : 'View Bag'}
            </Link>
          </div>
        </>
      )}
    </aside>
  );
}