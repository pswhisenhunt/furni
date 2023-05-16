import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { BASE_IMAGE_URL } from '../../api/constants'

import ImageLink from '../shared/imageLink'
import Carousel from '../shared/carousel'

const Home: React.FC = (): JSX.Element => {
  const categories = useAppSelector(state => state.categorySlice.categories)
  
  return (
    <main className='home'>
      <div className='home--carousel'>
        <Carousel/>
      </div>
      <ul className='home--list'>
        {categories.map((category) => {
          const url = `/${category.name}`
          return (
            <li key={category.id} className='home--list-item grow-rotate-on-hover'>
              <ImageLink 
                src={`${BASE_IMAGE_URL}/placeholder.svg`}
                description={category.name}
                linkUrl={url}
                size='20em'
                label={category.name}
              />
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default Home