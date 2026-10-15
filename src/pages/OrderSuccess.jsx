import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalPrice, clearCart } from '../store/cartSlice';

const SHIPPING = 6.99;
const GST_RATE = 0.13;

export default function OrderSuccess() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const itemsTotal = useSelector(selectCartTotalPrice);

  // Take a snapshot of the order BEFORE the cart is cleared
  const [order] = useState(() => ({
    number: Math.floor(100000 + Math.random() * 900000),
    items,
    total: itemsTotal > 0 ? itemsTotal + SHIPPING + itemsTotal * GST_RATE : 0,
  }));

  // Order is placed, so empty the bag
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="flex w-full max-w-[676px] flex-col items-center gap-6 rounded-[15px] bg-white p-8 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-success">
          <img src="/assets/icons/bag-white.svg" alt="" className="size-10" />
        </div>

        <h1 className="text-h3 uppercase tracking-expanded text-dark">Order Successful</h1>

        <p className="text-h5 text-tertiary">
          Thank you for your order! Your items are on their way.
        </p>

        {order.items.length > 0 && (
          <div className="flex w-full flex-col gap-4 rounded-input bg-page p-4 text-left">
            <div className="flex justify-between text-h6 tracking-condensed text-tertiary">
              <span>Order number:</span>
              <span>#{order.number}</span>
            </div>
            <div className="flex justify-between text-h6 tracking-condensed text-tertiary">
              <span>Items:</span>
              <span>{order.items.reduce((sum, i) => sum + i.qty, 0)}</span>
            </div>
            <hr className="border-light" />
            <div className="flex justify-between text-h5 font-medium text-danger">
              <span>Order Total:</span>
              <span>$ {order.total.toFixed(2)}</span>
            </div>
          </div>
        )}

        <Link
          to="/"
          className="flex w-full items-center justify-center gap-2 rounded-nav bg-dark px-6 py-2 text-h5 font-medium text-white"
        >
          Continue Shopping
        </Link>

        <div className="flex items-center gap-2">
          <img src="/assets/icons/lock.svg" alt="" className="size-6" />
          <span className="text-h6 tracking-condensed text-success">Secure Connection</span>
        </div>
      </div>
    </div>
  );
}