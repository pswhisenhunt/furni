import * as React from 'react'

interface CheckboxProps {
  name: string,
  isChecked: boolean,
  onChange: () => void
}

const Checkbox: React.FC<CheckboxProps> = ({ name, isChecked, onChange }):JSX.Element => {
  return (
    <input
      type='checkbox'
      name={name}
      value={name}
      checked={isChecked}
      onChange={onChange}
    />
  )
}

export default Checkbox