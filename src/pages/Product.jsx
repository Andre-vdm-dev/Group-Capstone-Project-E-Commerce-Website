import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import products from '../data/products';

const shortText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis pellentesque tellus imperdiet mattis. Proin in quis ipsum non amet imperdiet. Dignissim nisi leo a at. Sit nec lacus, nunc volutpat, tincidunt lorem mi duis. Vitae elementum libero.';

const longText = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim odio faucibus nec malesuada purus volutpat vel sed viverra. Id sagittis, phasellus dui in arcu. Nec arcu, sit nunc, nibh purus pellentesque sagittis. Felis rhoncus facilisis massa eget purus in purus. Etiam at cras nulla nunc.',
  'Orci vel ridiculus diam viverra. Libero malesuada orci, quis placerat suscipit augue imperdiet. Et praesent augue dictum mauris eget lacus malesuada. Aenean nisi, sodales natoque massa magna dignissim mi.',
  'Dignissim leo fames turpis quis suspendisse vulputate laoreet vulputate ac. Aliquam justo lectus eu dui porttitor. Cras a aliquam phasellus sollicitudin ornare. Tristique volutpat facilisis in ut proin.',
];

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-2 pr-4">
      {[1, 2, 3, 4, 5].map((n) => {
        let icon = 'star-outline';
        if (rating >= n) icon = 'star';
        else if (rating >= n - 0.5) icon = 'star-half';
        return <img key={n} src={`/assets/icons/${icon}.svg`} alt="" className="size-6" />;
      })}
    </div>
  );
}

export default function Product() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use the product passed from the card; if the page was refreshed, find it by id
  const product = location.state?.product || products.find((p) => p.id === id);

  const [selected, setSelected] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="p-12">
        <p className="text-h3 font-medium">Product not found</p>
        <button onClick={() => navigate('/')} className="mt-4 text-h5 text-accent underline">
          Back to store
        </button>
      </div>
    );
  }

  const images = product.images || [product.image, product.image, product.image];

  const handleAdd = () => {
    dispatch(addItem(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col items-start gap-4 px-6 py-12">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 rounded-nav p-2">
        <img src="/assets/icons/chevron-back.svg" alt="" className="size-6" />
        <span className="text-h5 text-dark">Back</span>
      </button>

      {/* Top area */}
      <div className="flex w-full max-w-[905px] flex-col gap-6 lg:flex-row">
        {/* Images */}
        <div className="flex gap-4 p-2">
          <div className="flex flex-col gap-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`flex items-center justify-center rounded-input bg-white p-2 ${
                  selected === i ? 'ring-2 ring-dark' : ''
                }`}
              >
                <img src={img} alt="" className="h-[42px] w-[34px] object-contain" />
              </button>
            ))}
          </div>
          <div className="rounded-input bg-white p-2">
            <img src={images[selected]} alt={product.name} className="h-[302px] w-[242px] object-contain" />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-1 flex-col p-2">
          <div className="flex flex-col gap-2 p-2">
            <h1 className="text-h0 font-bold text-dark">{product.name}</h1>
            <p className="text-h3 font-medium text-placeholder">{product.variant}</p>
          </div>

          <div className="flex items-center gap-2 px-2 py-4">
            <Stars rating={product.rating ?? 4.5} />
            <span className="text-h5 tracking-condensed text-accent">{product.rating ?? 4.5} / 5</span>
          </div>

          <p className="text-h3 font-medium text-dark">$ {product.price.toFixed(2)}</p>

          <p className="p-2 text-h5 text-dark">{product.shortDescription || shortText}</p>

          <div className="flex justify-end p-2">
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 rounded-btn bg-dark px-6 py-2 text-h5 font-medium text-white"
            >
              <img src="/assets/icons/bag-add-white.svg" alt="" className="size-6" />
              {added ? 'Added!' : 'Add to Bag'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom area */}
      <div className="flex w-full max-w-[905px] flex-col items-center gap-4 p-2">
        <hr className="w-full max-w-[858px] border-t-[3px] border-placeholder" />
        <div className="flex w-full flex-col gap-2 px-2 py-4">
          <h2 className="text-h3 font-medium text-dark">Description</h2>
          {(product.description ? [product.description] : longText).map((para, i) => (
            <p key={i} className="text-h5 tracking-condensed text-tertiary">{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
}