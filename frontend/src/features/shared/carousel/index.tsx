import * as React from 'react'
import { useState, useEffect } from 'react'
import { BASE_IMAGE_URL } from '../../../api/constants'

interface CarouselProps {
  images?: string[]
}

const Carousel = ({ images }: CarouselProps) => {
  const [ currentIndex, setCurrentIndex ] = useState<number>(0)
  const placeholders = [
    `${BASE_IMAGE_URL}/placeholder_1.svg`,
    `${BASE_IMAGE_URL}/placeholder_2.svg`,
    `${BASE_IMAGE_URL}/placeholder_3.svg`,
    `${BASE_IMAGE_URL}/placeholder_4.svg`,
    `${BASE_IMAGE_URL}/placeholder_5.svg`
  ]
  images = images && images.length > 0 ? images : placeholders

  useEffect(() => {
    const imageDisplayTimer = setInterval(() => {
      let newIndex = currentIndex
      if (currentIndex === images.length - 1) {
        newIndex = 0
      } else {
        newIndex += 1
      }
      setCurrentIndex(newIndex)
    }, 5000)

    return () => clearInterval(imageDisplayTimer)
  })
 
  const handleArrowClick = (direction: string) => {
    let newIndex: number = 0
    if (direction === 'left') {
      if (currentIndex !== 0) {
        newIndex = currentIndex - 1
      } else {
        newIndex = images.length - 1
      }
    } else {
      if (currentIndex !== images.length -1) {
        newIndex = currentIndex + 1
      }
    }
    setCurrentIndex(newIndex)
  }

  const generateControls = () => {
    return images.map((_, index) => {
      const classes = ['carousel-control']
      if (index === currentIndex) classes.push('active')
      return (
        <li key={index} className='control-list-item'>
          <button className={classes.join(' ')} onClick={() => setCurrentIndex(index)}></button>
        </li>
      )
    })
  }

  return (
    <div className='carousel'>
      <img className='carousel-image-container' src={images[currentIndex]} />
      <button className='carousel-arrow left' onClick={() => handleArrowClick('left')}></button>
      <button className='carousel-arrow right' onClick={() => handleArrowClick('right')}></button>
      <div className='carousel-controls'>
        <ul className='carousel-control-list'>
          {generateControls()}
        </ul>
      </div>
    </div>
  )
}

export default Carousel