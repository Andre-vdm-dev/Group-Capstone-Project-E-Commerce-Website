import { useState } from 'react';
import products from '../data/products';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';

export default function Home() {
  const [query, setQuery] = useState('');

  const filtered = products.filter((p) =>
    `${p.name} ${p.variant}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center gap-[10px] p-6">
      <div className="flex w-full justify-center p-2">
        <SearchBar value={query} onChange={setQuery} />
      </div>
      <ProductList products={filtered} />
    </div>
  );
}