import * as React from 'react'

type Option = {
  key: string,
  value: number | string,
  displayText: string
}

interface SelectProps {
  label: string,
  name: string,
  defaultValue: string | number,
  options: Option[],
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.FC<SelectProps> = ({ label, name, defaultValue, options, onChange }): JSX.Element => {
  return (
    <label className='select-label'>
      {label}
      <select className='select' name={name} defaultValue={defaultValue} onChange={(e) => onChange(e)}>
        { options.map((option) => {
          return (
            <option key={option.key} value={option.value}>{option.displayText}</option>
          )
        })}
      </select>
  </label>
  )
}

export default Select