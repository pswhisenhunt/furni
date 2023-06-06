import * as React from 'react'

interface ColorButtonProps {
  value: string,
  id: string,
  isSelected: boolean,
  onClick: () => void
}

const ColorButton: React.FC<ColorButtonProps> = ({ value, id, isSelected = false, onClick }): JSX.Element => {
  return (
    <button 
      style={{ 'backgroundColor': value}}
      className={ isSelected ? 'color-button selected' : 'color-button'}
      onClick={onClick}
    >
    </button>
  )
}

export default ColorButton