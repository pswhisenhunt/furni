import * as React from 'react'
import { useState, useCallback, useRef } from 'react'
import { BASE_IMAGE_URL } from '../../../api/constants'

interface SearchBoxProps {
  suggestions?: {id: string, productType: string}[],
}

// USE THIS UNTIL THE ENDPOINT IS BUILT IN THE BACKEND
const temporaryProductsTypes = [
  { id: '1', productType: 'dinning table with chair' },
  { id: '2', productType: 'coffee table' },
  { id: '3', productType: 'king mattress' },
  { id: '4', productType: 'queen mattress' },
  { id: '5', productType: 'matching bedroom set' },
  { id: '6', productType: 'chest of drawers' },
  { id: '7', productType: 'console table' },
  { id: '8', productType: 'end table' },
  { id: '9', productType: 'side table' },
  { id: '10', productType: 'office chair' },
  { id: '11', productType: 'pillows' },
  { id: '12', productType: 'plants' },
  { id: '13', productType: 'mirrors' },
  { id: '14', productType: 'king bedframe' },
  { id: '15', productType: 'twin bedframe' },
  { id: '16', productType: 'headboard' },
]

const SearchBox: React.FC<SearchBoxProps> = ({ suggestions = temporaryProductsTypes }): JSX.Element => {
  const [ focusedIndex, setFocusedIndex ] = useState<number>(-1)
  const [ inputValue, setInputValue ] = useState('')
  const [ filteredSuggestions, setFilteredSuggestions ] = useState<{id: string, productType: string}[]>([])
  const selectedSuggestionContainer = useRef(null)

  const resetSuggestions = useCallback(() => {
    setFocusedIndex(-1)
    setFilteredSuggestions([])
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    if (!value) {
      setInputValue('')
      setFilteredSuggestions([])
    } else {
      setInputValue(value)
      setFilteredSuggestions(suggestions.filter(suggestion => suggestion.productType.includes(value)))
    }
  }

  const handleSelection = (selectedItemIndex: number) => {
    const selectedItem = filteredSuggestions[selectedItemIndex]
    if (!selectedItem) {
      resetSuggestions()
    } else {
      setInputValue(selectedItem.productType)
      resetSuggestions()
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = e
    let nextFocusedIndex = 0
    if (key === 'ArrowDown') {
      nextFocusedIndex = (focusedIndex + 1) % suggestions.length
    }
    if (key === 'ArrowUp') {
      nextFocusedIndex = (focusedIndex - 1) % suggestions.length
    }
    if (key === 'Enter') {
      e.preventDefault()
      handleSelection(focusedIndex)
    }
    if (key === 'Escape') {
      resetSuggestions()
    }
    setFocusedIndex(nextFocusedIndex)
  }


  return (
    <div className='header-search' tabIndex={1} onKeyDown={handleKeyDown} onBlur={resetSuggestions}>
      <input className='header-search--bar' placeholder='Search' onChange={(e) => handleInputChange(e)} value={inputValue}/>
      <img src={`${BASE_IMAGE_URL}/looking_glass.svg`} className='header-search--clickable-img'/>
      
      { filteredSuggestions.length > 0 && 
        <div className='search-suggestions-container'>
          <ul className='search-suggestions-list'>
            {filteredSuggestions.map((suggestion, index) => {
              return (
                <li 
                  key={suggestion.id}
                  className='search-suggestions-list-item'
                  onMouseDown={() => {handleSelection(index)}}
                  ref={index === focusedIndex ? selectedSuggestionContainer : null} 
                  style={{backgroundColor: index === focusedIndex ? "#e3e5ea" : "",}}
                  onMouseEnter={() => {setFocusedIndex(index)}}
                >
                  {suggestion.productType}
                </li>
              )
            })}
          </ul>
        </div>
      }
    </div>
  )
}

export default SearchBox