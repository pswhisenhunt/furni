import * as React from 'react'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchProductsForCategory, setLimit, setSortBy, setPage, resetProductListState } from './productListSlice'

import ProductCard from './components/productCard'
import FilterPanel from '../filterPanel'
import Select from '../select'
import Paginator from '../paginator'

interface ProductListProps {
  title: string
}

const ProductList: React.FC<ProductListProps> = ({ title }): JSX.Element => {
  const dispatch = useAppDispatch()
  const category = useAppSelector(state => state.navBarSlice.activeLink)
  const products = useAppSelector(state => state.productListSlice.products)
  const total = useAppSelector(state => state.productListSlice.total)
  const limit = useAppSelector(state => state.productListSlice.limit)
  const sortBy = useAppSelector(state => state.productListSlice.sortBy)
  const page = useAppSelector(state => state.productListSlice.page)
  const status = useAppSelector(state => state.productListSlice.status)

  const handleSelectViewPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLimit(e.target.value))
  }
  
  const handleSelectSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value))
  }

  const handlePagination = (e: React.MouseEvent<HTMLButtonElement>, newPage: number) => {
    e.preventDefault()
    dispatch(setPage(newPage))
  }

  useEffect(() => {
    dispatch(fetchProductsForCategory({
      category: category,
      limit: limit,
      page: page,
      sortBy: sortBy,
    }))
  }, [ page, limit, category, sortBy ])

  return (
    <div className='product-list'>
      <div className='product-list-header'>
        <div className='product-list-header__title'>
          <h1>{title}</h1>
          <h4 className='product-list-header__title-subtitle'>
            { limit < total ?
              <>Showing {limit} of {total} products</>
              : <>Showing all {total} products</>
            }
          </h4>
        </div>
        <div className='dropdown-container'>
            <Select 
              label='View'
              name='view'
              defaultValue={limit}
              options={[
                {key: '1__10', value: 10, displayText: '10 Per Page'},
                {key: '2__24', value: 24, displayText: '24 Per Page'},
                {key: '3__48', value: 48, displayText: '48 Per Page'}
              ]}
              onChange={handleSelectViewPerPage}
            />
            <Select
              label='Sort'
              name='sort'
              defaultValue={sortBy.field}
              options={[
                {key: '1__highest_rated', value: 'averageRating_-1', displayText: 'Highest Rated'},
                {key: '2__high_to_low', value: 'price_-1', displayText: 'High to Low'},
                {key: '3__low_to_high', value: 'price_1', displayText: 'Low to High'},
              ]}
              onChange={handleSelectSortBy}
            />
        </div>
      </div>
      <FilterPanel isOpen={false}/>
      <ul className='product-list-cards'>
        { products.map((p) => {
          return <ProductCard key={p.id} product={p}/>
        })}
      </ul>
      <Paginator 
        total={total}
        perPage={limit}
        currentPage={page}
        onClick={handlePagination}
      />
    </div>
  )
}

export default ProductList