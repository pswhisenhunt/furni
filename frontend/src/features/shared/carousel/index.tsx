import * as React from 'react'
import { useState } from 'react'
import { BASE_IMAGE_URL } from '../../../api/constants'

const Carousel = () => {
  /** 
   * TODO: add the useSelector to grab these iamges from state if they exist.
   * Keep the placeholder images though - we still need a default within this
   * reusable component incase the images do not exist on the server or take a while to 
   * load.
   * 
   */

  const images = [
    `${BASE_IMAGE_URL}/carousel_placeholder_1.svg`,
    `${BASE_IMAGE_URL}/carousel_placeholder_2.svg`,
    `${BASE_IMAGE_URL}/carousel_placeholder_3.svg`
  ]
  const [ currentImage, setCurrentImage ] = useState(images[0])
  
  const handleLeftArrowClick = () => {
    const currentImageIndex = getCurrentImageIndex()
    if (currentImageIndex !== 0) {
      setCurrentImage(images[currentImageIndex - 1])
    } else {
      setCurrentImage(images[images.length - 1])
    }
  }

  const handleRightArrowClick = () => {
    const currentImageIndex = getCurrentImageIndex()
    if (currentImageIndex === images.length - 1) {
      setCurrentImage(images[0])
    } else {
      setCurrentImage(images[currentImageIndex + 1])
    }
  }

  const getCurrentImageIndex = () => {
    return images.findIndex((image) => image === currentImage)
  }

  const generateControls = () => {
    return images.map((image, index) => {
      const classes = ['carousel-control']
      if (image === currentImage) classes.push('active')
      return (
        <li key={index} className='control-list-item'>
          <div className={classes.join(' ')} onClick={() => setCurrentImage(image)}></div>
        </li>
      )
    })
  }

  return (
    <div className='carousel-wrapper' style={{background: `url(${currentImage}) rgb(103 105 111) no-repeat center`}}>
      <span className='left-arrow'>
        <img src={`${BASE_IMAGE_URL}/left_arrow.svg`}  onClick={handleLeftArrowClick}/>
      </span>
      <span className='right-arrow'>
        <img src={`${BASE_IMAGE_URL}/right_arrow.svg`} onClick={handleRightArrowClick}/>
      </span>
      <div className='carousel-wrapper--controls'>
        <ul className='carousel-control-list'>
          {generateControls()}
        </ul>
      </div>
    </div>
  )
}

export default Carousel