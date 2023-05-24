import * as React from 'react'

interface AddToCartButtonProps {
  classes?: string[]
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ classes }): JSX.Element => {
  let classNames = ['add-to-cart-button']
  if (classes.length) {
    classNames = [...classNames, ...classes ]
  }
  return (
    <button className={classNames.join(' ')}>Add To Cart</button>
  )
}

export default AddToCartButton