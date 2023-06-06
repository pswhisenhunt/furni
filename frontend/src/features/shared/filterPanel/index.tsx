import * as React from 'react'
import { useEffect, useState, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { BASE_IMAGE_URL } from '../../../api/constants'
import { 
  fetchColors,
  fetchMaterials,
  fetchProductTypes,
  selectMaterial,
  removeMaterial,
  selectColor,
  removeColor,
  selectProductType,
  removeProductType,
  clearAllSelections
} from './filterPanelSlice'

import Checkbox from './components/checkbox'
import ColorButton from './components/colorButton'

const FilterPanel:React.FC = ():JSX.Element => {
  const dispatch = useAppDispatch()
  const [ isOpen, setIsOpen ] = useState(false)
  const materials = useAppSelector(state => state.filterPanelSlice.materials)
  const colors = useAppSelector(state => state.filterPanelSlice.colors)
  const productTypes = useAppSelector(state => state.filterPanelSlice.productTypes)
  const selectedMaterialIds = useAppSelector(state => state.filterPanelSlice.selectedMaterialIds)
  const selectedColorIds = useAppSelector(state => state.filterPanelSlice.selectedColorIds)
  const selectedProductTypes = useAppSelector(state => state.filterPanelSlice.selectedProductTypes)

  useEffect(() => {
    dispatch(fetchMaterials())
    dispatch(fetchColors())
    dispatch(fetchProductTypes())
  }, [])

  const toggledMaterialSelection = (materialId: string) => {
    console.log('clicked!', materialId)
    if (selectedMaterialIds.indexOf(materialId) > -1) {
      dispatch(removeMaterial(materialId))
    } else {
      dispatch(selectMaterial(materialId))
    }
  }

  const toggleColorSelection = (colorId: string) => {
    if (selectedColorIds.indexOf(colorId) > -1) {
      dispatch(removeColor(colorId))
    } else {
      dispatch(selectColor(colorId))
    }
  }
  
  const toggleProductTypeSelection = (type: string) => {
    if (selectedProductTypes.indexOf(type) > -1) {
      dispatch(removeProductType(type))
    } else {
      dispatch(selectProductType(type))
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
                  isChecked={selectedMaterialIds.indexOf(material.id) > -1}
                  onChange={() => toggledMaterialSelection(material.id)}
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
                  isSelected={selectedColorIds.indexOf(color.id) > -1}
                  onClick={() => toggleColorSelection(color.id)}
                />
              </li>
            )
          })}
        </ul>
      </section>
    )
  }

  const productTypesPane = () => {
    console.log('productTypes', selectedProductTypes)
    return (
      <section className='filter-pane'>
        <h5>Product Type</h5>
        <ul className='filter-list'>
          {productTypes.map((type, index) => {
            return (
              <li key={`${type}__${index}`} className='filter-list-item'>
                <Checkbox
                  name={type}
                  isChecked={selectedProductTypes.indexOf(type) > -1}
                  onChange={() => toggleProductTypeSelection(type)}
                />
              </li>
            )
          })}
        </ul>
      </section>
    )
  }

  const memoizedMaterialsPane = useMemo(() => materialsPane(), [ materials, selectedMaterialIds ])
  const memoizedColorsPane = useMemo(() => colorsPane(), [ colors, selectedColorIds ])
  const memoizedProductTypesPane = useMemo(() => productTypesPane(), [ productTypes, selectedProductTypes ])

  const applyFilters = () => {
    // api call to get filtered data goes here!
    setIsOpen(false)
  }
  return (
    <div className='filter-panel'>
      <button className='filter-button animated-button' onClick={() => setIsOpen(!isOpen)}>
        <img src={`${BASE_IMAGE_URL}/filters.svg`}/>
        Filter
      </button>
      { isOpen && 
        <div className='backdrop' onClick={() => setIsOpen(false)}></div>
      }
      <aside className={isOpen ? 'sliding-drawer open' : 'sliding-drawer'}>
          {memoizedMaterialsPane}
          {memoizedColorsPane}
          {memoizedProductTypesPane}
          <section className='filter-controls'>
            <button className='filter-controls-button' onClick={() => dispatch(clearAllSelections())}>
              Clear
            </button>
            <button className='filter-controls-button submit animated-button' onClick={applyFilters}>
              Apply
            </button>
          </section>
      </aside>
    </div>
  )
}

export default FilterPanel