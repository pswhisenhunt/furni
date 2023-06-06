import * as React from 'react'

interface CheckboxProps {
  name: string,
  isChecked: boolean,
  onChange: () => void
}

const Checkbox: React.FC<CheckboxProps> = ({ name, isChecked, onChange }):JSX.Element => {
  return (
    <>
      <input
        id={name}
        className='checkbox'
        type='checkbox'
        name={name}
        value={name}
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor={name} className='checkbox-label'>{name}</label>
    </>
  )
}

export default Checkbox