import * as React from 'react'
import { useEffect, useState, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../app/hooks'
import { Material, Color } from '../../../../app/types'
import { 
  fetchColors,
  fetchMaterials,
  fetchProductTypes,
  clearAllSelections,
  saveFilterSelection
} from '../filterPanelSlice'

import Checkbox from './checkbox'
import ColorButton from './colorButton'

interface SidePanelProps {
  isOpen: boolean,
  closePanel: () => void
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, closePanel }): JSX.Element => {
  const dispatch = useAppDispatch()
  const [ selectedMaterials, setSelectedMaterials ] = useState([])
  const [ selectedColors, setSelectedColors ] = useState([])
  const [ selectedTypes, setSelectedTypes ] = useState([])
  const materials = useAppSelector(state => state.filterPanelSlice.materials)
  const colors = useAppSelector(state => state.filterPanelSlice.colors)
  const productTypes = useAppSelector(state => state.filterPanelSlice.productTypes)
 
  useEffect(() => {
    dispatch(fetchMaterials())
    dispatch(fetchColors())
    dispatch(fetchProductTypes())
  }, [])


  const toggeMaterialSelection = (material: Material) => {
    if (selectedMaterials.indexOf(material) > -1) {
      setSelectedMaterials(selectedMaterials.filter(m => m.id !== material.id))
    } else {
      setSelectedMaterials([...selectedMaterials, material])
    }
  }

  const toggleColorSelection = (color: Color) => {
    if (selectedColors.indexOf(color) > -1) {
      setSelectedColors(selectedColors.filter(c => c.id !== color.id))
    } else {
      setSelectedColors([...selectedColors, color])
    }
  }
  
  const toggleProductTypeSelection = (type: string) => {
    if (selectedTypes.indexOf(type) > -1) {
      setSelectedTypes(selectedTypes.filter(t => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }
  
  const materialsPane = () => {
    return (
      <section className='filter-pane'>
        <h5>Materials</h5>
        <ul className='filter-list'>
          {materials.map((material) => {
            return (
              <li key={`${material.name}__${material.id}`} className='filter-list-item'>
                <Checkbox
                  name={material.name}
                  isChecked={selectedMaterials.indexOf(material) > -1}
                  onChange={() => toggeMaterialSelection(material)}
                />
              </li>
            )
          })}
        </ul>
      </section>
    )
  }

  const colorsPane = () => {
    return (
      <section className='filter-pane'>
        <h5>Colors</h5>
        <ul className='filter-list colors'>
          {colors.map((color) => {
            return (
              <li key={`${color.name}__${color.id}`} className='filter-list-item color'>
                <ColorButton
                  value={color.value}
                  id={color.id}
                  isSelected={selectedColors.indexOf(color) > -1}
                  onClick={() => toggleColorSelection(color)}
                />
              </li>
            )
          })}
        </ul>
      </section>
    )
  }

  const productTypesPane = () => {
    return (
      <section className='filter-pane'>
        <h5>Product Type</h5>
        <ul className='filter-list'>
          {productTypes.map((type, index) => {
            return (
              <li key={`${type}__${index}`} className='filter-list-item'>
                <Checkbox
                  name={type}
                  isChecked={selectedTypes.indexOf(type) > -1}
                  onChange={() => toggleProductTypeSelection(type)}
                />
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
  
  const memoizedMaterialsPane = useMemo(() => materialsPane(), [ materials, selectedMaterials ])
  const memoizedColorsPane = useMemo(() => colorsPane(), [ colors, selectedColors ])
  const memoizedProductTypesPane = useMemo(() => productTypesPane(), [ productTypes, selectedTypes ])

  const clearFilters = () => {
    setSelectedMaterials([])
    setSelectedColors([])
    setSelectedTypes([])
    dispatch(clearAllSelections())
  }

  const applyFilters = () => {
    dispatch(saveFilterSelection({
      materials: selectedMaterials,
      colors: selectedColors,
      types: selectedTypes
    }))
    closePanel()
  }

  return (
    <aside className={isOpen ? 'sliding-drawer open' : 'sliding-drawer'}>
      {memoizedMaterialsPane}
      {memoizedColorsPane}
      {memoizedProductTypesPane}
      <section className='filter-controls'>
        <button className='filter-controls-button' onClick={() => clearFilters()}>
          Clear
        </button>
        <button className='filter-controls-button submit animated-button' onClick={applyFilters}>
          Apply
        </button>
      </section>
    </aside>
  )
}

export default SidePanel