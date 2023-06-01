import * as React from 'react'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchColors, fetchMaterials } from './filterPanelSlice'

interface FilterPanelProps {
  isOpen: boolean
}

const FilterPanel:React.FC<FilterPanelProps> = ():JSX.Element => {
  const dispatch = useAppDispatch()
  const materials = useAppSelector(state => state.filterPanelSlice.materials)
  const colors = useAppSelector(state => state.filterPanelSlice.colors)
  const type = useAppSelector(state => state.filterPanelSlice.type)
  
  useEffect(() => {
    dispatch(fetchMaterials())
    dispatch(fetchColors())
  }, [])

  return (
    <div className='filters'>
      fitlers
    </div>
  )
}

export default FilterPanel