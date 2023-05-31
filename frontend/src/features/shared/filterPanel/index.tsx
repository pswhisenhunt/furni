import * as React from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'

interface FilterPanelProps {
  isOpen: boolean
}

const FilterPanel:React.FC<FilterPanelProps> = ():JSX.Element => {
  // const filters = useAppSelector(state => state.productListSlice.filters)
  return (
    <div className='filters'>
      fitlers
    </div>
  )
}

export default FilterPanel