import * as React from 'react'
import { useEffect, useState, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchColors, fetchMaterials, fetchProductTypes } from './filterPanelSlice'
import { BASE_IMAGE_URL } from '../../../api/constants'

const FilterPanel:React.FC = ():JSX.Element => {
  const dispatch = useAppDispatch()
  const [ isOpen, setIsOpen ] = useState(false)
  const materials = useAppSelector(state => state.filterPanelSlice.materials)
  const colors = useAppSelector(state => state.filterPanelSlice.colors)
  const productTypes = useAppSelector(state => state.filterPanelSlice.productTypes)

  useEffect(() => {
    dispatch(fetchMaterials())
    dispatch(fetchColors())
    dispatch(fetchProductTypes())
  }, [])

  const materialsPane = () => {
    return (
      <section>
        <h5>Materials</h5>
        <ul>
          {materials.map((material) => {
            return <li key={material.id}>{material.name}</li>
          })}
        </ul>
      </section>
    )
  }

  const colorsPane = () => {
    return (
      <section>
        <h5>Colors</h5>
        <ul>
          {colors.map((color) => {
            return <li key={color.id}>{color.name}: {color.value}</li>
          })}
        </ul>
      </section>
    )
  }

  const productTypesPane = () => {
    return (
      <section>
        <h5>Type</h5>
        <ul>
          {productTypes.map((type, index) => {
            return <li key={`${type}__${index}`}>{type}</li>
          })}
        </ul>
      </section>
    )
  }

  const memoizedMaterialsPane = useMemo(() => materialsPane(), [ materials ])
  const memoizedColorsPane = useMemo(() => colorsPane(), [ colors ])
  const memoizedProductTypesPane = useMemo(() => productTypesPane(), [ productTypes ])
  
  return (
    <div className='filter-panel'>
      <button className='filter-button' onClick={() => setIsOpen(!isOpen)}>
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
            <button>Clear</button>
            <button onClick={() => setIsOpen(false)}>Apply</button>
          </section>
      </aside>
    </div>
  )
}

export default FilterPanel