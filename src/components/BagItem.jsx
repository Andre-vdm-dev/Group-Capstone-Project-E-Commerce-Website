import { useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, removeItem } from '../store/cartSlice';

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

// One product row in the bag (Figma "Item-In-Bag")
export default function BagItem({ item, showRemove = false }) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-6 p-2 sm:flex-row sm:items-center">
      <img src={item.image} alt={item.name} className="h-[200px] w-[200px] shrink-0 object-contain" />

      <div className="flex flex-1 flex-col gap-4 p-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-h3 text-dark">{item.name}</h3>
            <p className="text-h5 tracking-condensed text-tertiary">{item.variant}</p>
          </div>
          {showRemove && (
            <button
              onClick={() => dispatch(removeItem(item.id))}
              className="text-h6 tracking-condensed text-danger underline"
            >
              Remove
            </button>
          )}
        </div>

        <p className="text-h5 text-dark">
          {item.shortDescription || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam'}
        </p>

        <Stars rating={item.rating ?? 4.5} />

        <div className="flex items-center justify-between p-2">
          <span className="text-h5 text-dark">
            $ {item.price.toFixed(2)} &nbsp;x&nbsp; {item.qty}
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