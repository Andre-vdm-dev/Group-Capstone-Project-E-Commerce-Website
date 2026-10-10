import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-2 p-4">
      <Link
        to={`/product/${product.id}`}
        state={{ product }}
        className="flex items-center justify-center rounded-card bg-white p-4"
      >
        <img src={product.image} alt={product.name} className="h-[200px] w-full object-contain" />
      </Link>

      <div className="flex flex-col gap-2 p-2">
        <h3 className="text-h5 font-medium text-dark">{product.name}</h3>
        <p className="text-h6 tracking-condensed text-tertiary">{product.variant}</p>

        <div className="flex items-center justify-between p-2">
          <span className="text-h5 font-medium text-dark">$ {product.price.toFixed(2)}</span>
          <button
            onClick={() => dispatch(addItem(product))}
            aria-label={`Add ${product.name} to cart`}
            className="flex items-center justify-center rounded-btn-sm bg-dark p-2"
          >
            <img src="/assets/bag-add.svg" alt="" className="size-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}