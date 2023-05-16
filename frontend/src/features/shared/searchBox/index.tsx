import * as React from 'react'
import { useState, useEffect, useCallback, useRef } from 'react'
import { BASE_IMAGE_URL } from '../../../api/constants'

interface SearchBoxProps {
  suggestions?: {id: string, productType: string}[],
}
// USE THIS UNTIL THE ENDPOINT IS BUILT IN THE BACKEND
const temporaryProducts = [
  { id: "1", productType: "dinning table with chair" },
  { id: "2", productType: "coffee table" },
  { id: "3", productType: "king mattress" },
  { id: "4", productType: "queen mattress" },
  { id: "5", productType: "matching bedroom set" },
  { id: "6", productType: "chest of drawers" },
  { id: "7", productType: "console table" },
  { id: "8", productType: "end table" },
  { id: "9", productType: "side table" },
  { id: "10", productType: "office chair" },
  { id: "11", productType: "decorative chair" },
]

// once the backend is configured to handle search, I will pass in the suggestions and have to redo some of this logic.
const SearchBox: React.FC<SearchBoxProps> = ({ suggestions = temporaryProducts }): JSX.Element => {
  const [ focusedIndex, setFocusedIndex ] = useState<number>(-1)
  const [ selectedSuggestion, setSelectedSuggestion ] = useState<{id: string, productType: string}>()
  const [ filteredSuggestions, setFilteredSuggestions ] = useState<{id: string, productType: string}[]>([])
  const selectedContainer = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    if (!value) {
      setFilteredSuggestions([])
    } else {
      setFilteredSuggestions(suggestions.filter(suggestion => suggestion.productType.includes(value)))
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
    if (key === 'Enter') {}
    if (key === 'Escape') {}
    
    setFocusedIndex(nextFocusedIndex)
  }

  return (
    <div className='header-search'>
      <input className='header-search--bar' placeholder='Search' onChange={(e) => handleInputChange(e)}/>
      <img src={`${BASE_IMAGE_URL}/looking_glass.svg`} className='header-search--clickable-img'/>
      { filteredSuggestions.length > 0 && 
        <div className='search-suggestions-container' tabIndex={1} onKeyDown={handleKeyDown}>
          <ul className='search-suggestions-list'>
            {filteredSuggestions.map((suggestion) => {
              return (
                <li key={suggestion.id} className='search-suggestions-list-item'>
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