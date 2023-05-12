import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { useState } from 'react'
import { BASE_IMAGE_URL } from '../../api/constants'

import Layout from '../shared/layout'
import ImageLink from '../shared/imageLink'

const Home = () => {
  const categories = useAppSelector(state => state.categorySlice.categories)
  
  return (
    <Layout>
      <div className='home-wrapper'>
        <div className='home-wrapper--carousel'>
          CAROUSEL
        </div>
        <ul className='home-wrapper--list'>
          {categories.map((category) => {
            const url = `/${category.name}`
            return (
              <li key={category.id} className='home-wrapper--list-item'>
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
      </div>
    </Layout>
  )
}

export default Home