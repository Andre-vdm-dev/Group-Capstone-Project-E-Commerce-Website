import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  if (products.length === 0) {
    return <p className="py-8 text-h5 text-tertiary">No items found.</p>;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 py-2 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}