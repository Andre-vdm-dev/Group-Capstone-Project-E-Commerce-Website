import { useState } from 'react';
import FormInput from './FormInput';

/* ---------- shared bits ---------- */

function SaveCheckbox({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 px-2 py-4 text-h5 text-dark">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 accent-accent" />
      {label}
    </label>
  );
}

function FormFooter({ onBack }) {
  return (
    <div className="flex w-full items-center justify-between">
      <button type="button" onClick={onBack} className="px-6 py-2 text-h6 tracking-condensed text-dark underline">
        Back
      </button>
      <div className="flex items-center gap-2">
        <img src="/assets/icons/lock.svg" alt="" className="size-6" />
        <span className="text-h6 tracking-condensed text-success">Secure Connection</span>
      </div>
    </div>
  );
}

/* ---------- Shipping address ---------- */

const emptyAddress = { name: '', street: '', city: '', state: '', country: '' };

function validateAddress(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter the full name';
  if (values.street.trim().length < 3) errors.street = 'Please enter a street address';
  if (!values.city.trim()) errors.city = 'City is required';
  if (!values.state.trim()) errors.state = 'State / Province is required';
  if (!values.country.trim()) errors.country = 'Country is required';
  return errors;
}

export function AddressForm({ initial, onSave, onBack }) {
  const [values, setValues] = useState(initial || emptyAddress);
  const [errors, setErrors] = useState({});
  const [saveDefault, setSaveDefault] = useState(true);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateAddress(values);
    setErrors(found);
    if (Object.keys(found).length === 0) onSave(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex w-full max-w-[676px] flex-col gap-4 rounded-[15px] bg-white p-8"
    >
      <FormInput label="Shipping Name" name="name" value={values.name} onChange={handleChange} placeholder="John Maker" error={errors.name} className="p-2" />
      <FormInput label="Street Name" name="street" value={values.street} onChange={handleChange} placeholder="123 Plae Grond Stret" error={errors.street} className="p-2" />
      <FormInput label="City" name="city" value={values.city} onChange={handleChange} placeholder="Vermont" error={errors.city} className="p-2" />
      <FormInput label="State / Province" name="state" value={values.state} onChange={handleChange} placeholder="California" error={errors.state} className="p-2" />
      <FormInput label="Country" name="country" value={values.country} onChange={handleChange} placeholder="United States of America" error={errors.country} className="p-2" />

      <SaveCheckbox label="Save this as your default address" checked={saveDefault} onChange={() => setSaveDefault(!saveDefault)} />

      <div className="p-4">
        <button type="submit" className="w-full rounded-nav bg-dark px-6 py-2 text-h5 font-medium text-white">
          Add Address
        </button>
      </div>

      <FormFooter onBack={onBack} />
    </form>
  );
}

/* ---------- Payment card ---------- */

const emptyCard = { holder: '', number: '', expiry: '', cvc: '' };

// "5126598722147621" -> "5126-5987-2214-7621"
function formatCardNumber(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1-');
}

// "122027" -> "12 / 2027"
function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 6);
  return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
}

function validateCard(values) {
  const errors = {};
  if (values.holder.trim().length < 2) errors.holder = 'Please enter the name on the card';

  if (values.number.replace(/\D/g, '').length !== 16) errors.number = 'Card number must be 16 digits';

  const match = values.expiry.match(/^(\d{2}) \/ (\d{4})$/);
  if (!match) {
    errors.expiry = 'Use MM / YYYY';
  } else {
    const month = Number(match[1]);
    const year = Number(match[2]);
    const now = new Date();
    if (month < 1 || month > 12) errors.expiry = 'Month must be 01–12';
    else if (year * 12 + month < now.getFullYear() * 12 + now.getMonth() + 1) errors.expiry = 'This card has expired';
  }

  if (!/^\d{3,4}$/.test(values.cvc)) errors.cvc = '3 or 4 digits';
  return errors;
}

export function PaymentForm({ initial, onSave, onBack }) {
  const [values, setValues] = useState(initial || emptyCard);
  const [errors, setErrors] = useState({});
  const [saveDefault, setSaveDefault] = useState(true);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'number') value = formatCardNumber(value);
    if (name === 'expiry') value = formatExpiry(value);
    if (name === 'cvc') value = value.replace(/\D/g, '').slice(0, 4);
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateCard(values);
    setErrors(found);
    if (Object.keys(found).length === 0) onSave(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex w-full max-w-[676px] flex-col gap-4 rounded-[15px] bg-white p-8"
    >
      <h2 className="p-2 text-h3 uppercase tracking-expanded text-dark">Add a new Card</h2>

      <FormInput label="Cardholder Name" name="holder" value={values.holder} onChange={handleChange} placeholder="John Maker" error={errors.holder} className="p-2" />
      <FormInput
        label="Card Number"
        name="number"
        value={values.number}
        onChange={handleChange}
        placeholder="5126-5987-2214-7621"
        icon="/assets/icons/card-grey.svg"
        inputMode="numeric"
        error={errors.number}
        className="p-2"
      />

      <div className="flex flex-wrap gap-8 p-2">
        <FormInput
          label="Expiry Date"
          name="expiry"
          value={values.expiry}
          onChange={handleChange}
          placeholder="MM / YYYY"
          icon="/assets/icons/calendar.svg"
          inputMode="numeric"
          error={errors.expiry}
          className="w-[186px]"
        />
        <FormInput
          label="CVC"
          name="cvc"
          value={values.cvc}
          onChange={handleChange}
          placeholder="123"
          inputMode="numeric"
          error={errors.cvc}
          className="w-[141px]"
        />
      </div>

      <SaveCheckbox label="Save this as your default payment method" checked={saveDefault} onChange={() => setSaveDefault(!saveDefault)} />

      <div className="p-4">
        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-nav bg-dark px-6 py-2 text-h5 font-medium text-white">
          <img src="/assets/icons/card-white.svg" alt="" className="size-6" />
          Add Payment Method
        </button>
      </div>

      <FormFooter onBack={onBack} />
    </form>
  );
}
/* ---------- Select a saved card ---------- */

// Works out the card brand from the first digit
export function cardBrand(number) {
  const first = number.replace(/\D/g, '')[0];
  if (first === '4') return 'VISA';
  if (first === '5') return 'MasterCard';
  return 'Card';
}

export function SelectCard({ cards, selectedId, onSelect }) {
  return (
    <section className="mx-auto flex w-full max-w-[676px] flex-col rounded-[15px] bg-white p-2">
      <h2 className="p-4 text-h3 uppercase tracking-expanded text-dark">Select a Card</h2>
      {cards.map((card) => {
        const selected = card.id === selectedId;
        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelect(card)}
            className={`flex items-center gap-2 rounded-input p-2 text-left text-h5 ${
              selected ? 'bg-page text-dark' : 'text-placeholder hover:bg-page/60'
            }`}
          >
            <span className="p-2">
              <img src="/assets/icons/card-grey.svg" alt="" className="size-6" />
            </span>
            {card.brand} ending in {card.last4}
            {selected && <span className="ml-auto pr-2 text-h6 text-accent">Selected</span>}
          </button>
        );
      })}
    </section>
  );
}