import * as React from 'react'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { BASE_IMAGE_URL } from '../../../api/constants'
import { removeSelectedColor, removeSelectedMaterial, removeSelectedProductType } from './filterPanelSlice'

import SidePanel from './components/sidePanel'
import AppliedFilterButton from './components/appliedFilterButton'

const FilterPanel:React.FC = ():JSX.Element => {
  const dispatch = useAppDispatch()
  const [ isOpen, setIsOpen ] = useState(false)
  const selectedMaterials = useAppSelector(state => state.filterPanelSlice.selectedMaterials)
  const selectedProductTypes = useAppSelector(state => state.filterPanelSlice.selectedProductTypes)
  const selectedColors = useAppSelector(state => state.filterPanelSlice.selectedColors)

  return (
    <div className='filter-panel'>
      <button className='filter-button animated-button' onClick={() => setIsOpen(!isOpen)}>
        <img src={`${BASE_IMAGE_URL}/filters.svg`}/>
        Filter
      </button>
      
      { isOpen && 
        <div className='backdrop' onClick={() => setIsOpen(false)}></div>
      }

       <div className='applied-filters'>
          { selectedColors.map((c) => {
            return <AppliedFilterButton key={`filter__${c.id}`} name={c.name} onClick={() => dispatch(removeSelectedColor(c))}/>
          })}

          { selectedMaterials.map((m) => {
            return <AppliedFilterButton key={`filter__${m.id}`} name={m.name} onClick={() => dispatch(removeSelectedMaterial(m))}/>
          })}

          { selectedProductTypes.map((t) => {
            return <AppliedFilterButton key={`filter__${t}`} name={t} onClick={() => dispatch(removeSelectedProductType(t))}/>
          })}
       </div>

      <SidePanel isOpen={isOpen} closePanel={() => setIsOpen(false)}/>
    </div>
  )
}

export default FilterPanel