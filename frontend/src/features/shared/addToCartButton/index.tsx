import * as React from 'react'
import * as product from '../../../../../backend/models/product'

interface AddToCartButtonProps {
  classes?: string[],
  id: string
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ classes, id }): JSX.Element => {
  let classNames = ['add-to-cart-button']

  if (classes.length) {
    classNames = [...classNames, ...classes ]
  }
  return (
    <button className={classNames.join(' ')}>Add To Cart</button>
  )
}

export default AddToCartButton