import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartTotalPrice,
  increaseQty,
  decreaseQty,
} from '../store/cartSlice';
import { AddressForm, PaymentForm, SelectCard, cardBrand } from '../components/CheckoutForms';

const SHIPPING = 6.99;
const GST_RATE = 0.13; // matches the Figma numbers (760.41 / 5849.37)
const GIFT_CARD = 0;

const money = (n) => `$ ${n.toFixed(2)}`;

// Saved details shown in the Figma design
const DEMO_ADDRESS = {
  name: 'John Maker',
  street: '123 Plae Grond Stret',
  city: 'Vermont',
  state: 'California',
  country: 'United States of America',
};

const DEMO_CARDS = [
  { id: 'c0', brand: 'Mastercard', last4: '1252' },
  { id: 'c1', brand: 'MasterCard', last4: '4242' },
  { id: 'c2', brand: 'VISA Debit', last4: '2894' },
];

// Read something saved in localStorage, or use the fallback
const load = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};
/* ---------- small pieces ---------- */

function Card({ title, action, children }) {
  return (
    <section className="flex flex-col gap-2 rounded-input bg-white p-4">
      <h2 className="p-2 text-h3 uppercase tracking-expanded text-dark">{title}</h2>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-4 p-2">{children}</div>
        {action && <div className="p-2">{action}</div>}
      </div>
    </section>
  );
}

function OutlineButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn-outline"
    >
      {children}
    </button>
  );
}

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((n) => {
        let icon = 'star-outline';
        if (rating >= n) icon = 'star';
        else if (rating >= n - 0.5) icon = 'star-half';
        return <img key={n} src={`/assets/icons/${icon}.svg`} alt="" className="size-6" />;
      })}
      <span className="pl-4 text-h5 tracking-condensed text-accent">{rating} / 5</span>
    </div>
  );
}

function BagItem({ item }) {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-6 p-2 sm:flex-row sm:items-center">
      <img src={item.image} alt={item.name} className="h-[200px] w-[200px] shrink-0 object-contain" />
      <div className="flex flex-1 flex-col gap-4 p-2">
        <div className="flex flex-col gap-2">
          <h3 className="text-h3 text-dark">{item.name}</h3>
          <p className="text-h5 tracking-condensed text-tertiary">{item.variant}</p>
        </div>
        <p className="text-h5 text-dark">
          {item.shortDescription || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam'}
        </p>
        <Stars rating={item.rating ?? 4.5} />
        <div className="flex items-center justify-between p-2">
          <span className="text-h5 text-dark">
            {money(item.price)} &nbsp;x&nbsp; {item.qty}
          </span>
          <div className="flex items-center gap-4 text-h4">
            <button onClick={() => dispatch(decreaseQty(item.id))} aria-label="Decrease quantity" className="px-1 text-danger">
              −
            </button>
            <span className="text-h5 text-dark">{item.qty}</span>
            <button onClick={() => dispatch(increaseQty(item.id))} aria-label="Increase quantity" className="px-1 text-success">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderSummary({ itemsTotal, canOrder, onPlaceOrder }) {
  const shipping = itemsTotal > 0 ? SHIPPING : 0;
  const gst = itemsTotal * GST_RATE;
  const total = itemsTotal + shipping + gst - GIFT_CARD;

  const rows = [
    ['Items:', itemsTotal],
    ['Shipping:', shipping],
    ['Estimated GST:', gst],
    ['Gift Card:', GIFT_CARD],
  ];

  return (
    <div className="flex flex-col gap-4 rounded-thumb bg-white p-4">
      <h2 className="text-h5 font-medium text-black">Order Summary</h2>
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between text-h6 tracking-condensed text-tertiary">
          <span>{label}</span>
          <span>{money(value)}</span>
        </div>
      ))}
      <hr className="border-light" />
      <div className="flex justify-between text-h5 font-medium text-danger">
        <span>Order Total:</span>
        <span>{money(total)}</span>
      </div>
      <hr className="border-light" />
      <button
        onClick={onPlaceOrder}
        disabled={!canOrder}
        className="w-full rounded-[11px] bg-dark px-6 py-2 text-h6 tracking-condensed text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Place your order
      </button>
      {!canOrder && itemsTotal > 0 && (
        <p className="text-h7 text-tertiary">Add a shipping address and payment method first.</p>
      )}
    </div>
  );
}

/* ---------- page ---------- */

export default function Checkout() {
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const itemsTotal = useSelector(selectCartTotalPrice);

  const [view, setView] = useState('review'); // 'review' | 'address' | 'payment'
  const [address, setAddress] = useState(() => load('address', DEMO_ADDRESS));
  const [savedCards, setSavedCards] = useState(() => load('savedCards', DEMO_CARDS));
  const [payment, setPayment] = useState(() => load('payment', DEMO_CARDS[0]));
  const [billingSame, setBillingSame] = useState(true);

  // Remember the details after a refresh
  useEffect(() => {
    localStorage.setItem('address', JSON.stringify(address));
    localStorage.setItem('payment', JSON.stringify(payment));
    localStorage.setItem('savedCards', JSON.stringify(savedCards));
  }, [address, payment, savedCards]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 p-12">
        <h1 className="text-h3 uppercase tracking-expanded text-dark">Your bag is empty</h1>
        <Link to="/" className="text-h5 text-accent underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (view === 'address') {
    return (
      <div className="px-6 py-16">
        <AddressForm
          initial={address}
          onSave={(values) => {
            setAddress(values);
            setView('review');
          }}
          onBack={() => setView('review')}
        />
      </div>
    );
  }

  if (view === 'payment') {
    return (
      <div className="flex flex-col gap-6 px-6 py-16">
        <SelectCard
          cards={savedCards}
          selectedId={payment?.id}
          onSelect={(card) => {
            setPayment(card);
            setView('review');
          }}
        />
        <PaymentForm
          onSave={(values) => {
            const newCard = {
              id: `c${Date.now()}`,
              brand: cardBrand(values.number),
              last4: values.number.slice(-4),
            };
            setSavedCards([...savedCards, newCard]);
            setPayment(newCard);
            setView('review');
          }}
          onBack={() => setView('review')}
        />
      </div>
    );
  }

  const handlePlaceOrder = () => {
    navigate('/order-success');
  };

  return (
    <div className="flex flex-col gap-8 px-6 py-14 lg:flex-row lg:items-start">
      {/* Left column */}
      <div className="flex w-full max-w-[871px] flex-col gap-6">
        <Card
          title="Shipping Address"
          action={<OutlineButton onClick={() => setView('address')}>{address ? 'Change' : 'Add'}</OutlineButton>}
        >
          {address ? (
            <div className="flex flex-col gap-2 text-h5 text-dark">
              <p>{address.name}</p>
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state}
              </p>
              <p>{address.country}</p>
            </div>
          ) : (
            <p className="text-h5 text-tertiary">No shipping address yet.</p>
          )}
        </Card>

        <Card
          title="Payment Method"
          action={<OutlineButton onClick={() => setView('payment')}>{payment ? 'Change' : 'Add'}</OutlineButton>}
        >
          {payment ? (
            <div className="flex items-center gap-2 text-h5 text-dark">
              <img src="/assets/icons/card.svg" alt="" className="size-6" />
              <span>
                {payment.brand} <span className="text-tertiary">ending in {payment.last4}</span>
              </span>
            </div>
          ) : (
            <p className="text-h5 text-tertiary">No payment method yet.</p>
          )}
          <div className="flex items-center gap-[10px] text-h5 text-dark">
            <img src="/assets/icons/gift.svg" alt="" className="size-6" />
            <span>
              $ 0.00 <span className="text-tertiary">gift card balance</span>
            </span>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-h5 text-dark">
            <input
              type="checkbox"
              checked={billingSame}
              onChange={() => setBillingSame(!billingSame)}
              className="size-4 accent-accent"
            />
            Billing address same as Shipping Address
          </label>
        </Card>

        <section className="flex flex-col gap-2 rounded-input bg-white p-4">
          <h2 className="p-2 text-h3 uppercase tracking-expanded text-dark">Review your Bag</h2>
          <div className="flex flex-col p-2">
            {items.map((item, i) => (
              <div key={item.id}>
                {i > 0 && <hr className="my-2 border-tertiary/40" />}
                <BagItem item={item} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right column */}
      <div className="flex w-full flex-col items-end gap-6 lg:sticky lg:top-14 lg:w-[243px] lg:shrink-0">
        <div className="w-full">
          <OrderSummary itemsTotal={itemsTotal} canOrder={Boolean(address && payment)} onPlaceOrder={handlePlaceOrder} />
        </div>
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 rounded-[11px] border border-dark px-6 py-2 text-h6 tracking-condensed text-dark"
        >
          <img src="/assets/icons/chevron-back.svg" alt="" className="size-4" />
          Back
        </button>
      </div>
    </div>
  );
}