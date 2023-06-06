import * as React from 'react'
import { BASE_IMAGE_URL } from '../../../../api/constants'

interface AppliedFilterButtonProp {
  name: string,
  onClick: () => void
}
const AppliedFilterButton: React.FC<AppliedFilterButtonProp> = ({ name, onClick }): JSX.Element => {
  return (
   <button className='applied-filters-button' onClick={onClick}>
      {name}
      <img src={`${BASE_IMAGE_URL}/close.svg`}/>
   </button>
  )
}

export default AppliedFilterButton