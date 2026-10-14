export default function FormInput({ label, name, value, onChange, placeholder, icon, error, className = '', ...rest }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="px-2 text-h6 tracking-condensed text-placeholder">
        {label}
      </label>
      <div
        className={`flex items-center gap-[10px] rounded-input bg-white px-4 py-2 shadow-input ${
          error ? 'ring-2 ring-danger' : ''
        }`}
      >
        {icon && <img src={icon} alt="" className="ml-2 size-6" />}
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full min-w-0 bg-transparent p-2 text-h5 font-medium text-dark placeholder:text-placeholder focus:outline-none"
          {...rest}
        />
      </div>
      {error && <p className="px-2 text-h6 text-danger">{error}</p>}
    </div>
  );
}