export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex w-full max-w-[507px] flex-col gap-2">
      <label htmlFor="search" className="px-2 text-h6 tracking-condensed text-tertiary">
        Search Item
      </label>
      <div className="rounded-input bg-white px-4 py-2 shadow-input">
        <input
          id="search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Apple Watch, Samsung S21, Macbook Pro, ..."
          className="w-full bg-transparent p-2 text-h5 font-medium text-dark placeholder:text-placeholder focus:outline-none"
        />
      </div>
    </div>
  );
}