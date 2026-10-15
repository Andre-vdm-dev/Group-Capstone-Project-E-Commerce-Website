import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems } from '../store/cartSlice';
import BagItem from '../components/BagItem';

export default function Cart() {
  const items = useSelector(selectCartItems);

  return (
    <div className="flex flex-col gap-[10px] px-12 py-12">
      <h1 className="p-2 text-h2 text-dark">Check your Bag Items</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-start gap-4 rounded-input bg-white p-8">
          <p className="text-h5 text-tertiary">Your bag is empty.</p>
          <Link to="/" className="btn-primary">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <div key={item.id} className="rounded-input bg-white p-4">
              <BagItem item={item} showRemove />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}