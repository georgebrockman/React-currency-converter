import React from 'react'
import CustomSelect from "./CustomSelect"
import { currencies } from "./DropDown"

export default function CurrencyProps() {
  return (
    <div>
      <input type="number" className="input" value={amount} />
      <CustomSelect title="Original Currency" value={fromCurrency} onChange={(v) => setFromCurrency(v)} options={currencies} />
      <CustomSelect title="New Currency" value={toCurrency} onChange={(v) => setToCurrency(v)} options={currencies} />
    </div>
  )
};
