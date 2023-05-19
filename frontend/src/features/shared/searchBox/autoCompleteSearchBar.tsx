import * as React from 'react'
import { useState, useRef, useCallback } from 'react'
import { SearchTerm } from '../../../app/types'
import { BASE_IMAGE_URL } from '../../../api/constants'

interface AutoCompleteSeachBarProps {
  suggestedSearchTerms: SearchTerm[]
  onChange: React.ChangeEventHandler,
  onSelect: (index: number) => void
  resetSuggestions: Function,
  value: string
}

const AutoCompleteSeachBar: React.FC<AutoCompleteSeachBarProps> = ({ suggestedSearchTerms, onChange, onSelect, resetSuggestions, value }) => {
  const [ focusedIndex, setFocusedIndex ] = useState<number>(-1)
  const selectedSuggestionContainer = useRef(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = e
    let nextFocusedIndex = 0
    if (key === 'ArrowDown') {
      nextFocusedIndex = (focusedIndex + 1) % suggestedSearchTerms.length
    }
    if (key === 'ArrowUp') {
      nextFocusedIndex = (focusedIndex - 1) % suggestedSearchTerms.length
    }
    if (key === 'Enter') {
      e.preventDefault()
      onSelect && onSelect(focusedIndex)
    }
    if (key === 'Escape') {
      resetAutoCompleteSearch()
    }
    setFocusedIndex(nextFocusedIndex)
  }

  const resetAutoCompleteSearch = () => {
    setFocusedIndex(-1)
    resetSuggestions()
  }

  return (
    <div className='header-search' tabIndex={1} onKeyDown={handleKeyDown} onBlur={resetAutoCompleteSearch}>
      <input className='header-search--bar' placeholder='Search' onChange={(e) => onChange(e)} value={value}/>
      <img src={`${BASE_IMAGE_URL}/looking_glass.svg`} className='header-search--clickable-img'/>
      
      { suggestedSearchTerms.length > 0 && 
        <div className='search-suggestions-container'>
          <ul className='search-suggestions-list'>
            {suggestedSearchTerms.map((suggestion, index) => {
              return (
                <li 
                  key={suggestion.id}
                  className='search-suggestions-list-item'
                  onMouseDown={() => {onSelect(index)}}
                  onMouseEnter={() => {setFocusedIndex(index)}}
                  ref={index === focusedIndex ? selectedSuggestionContainer : null} 
                  style={{backgroundColor: index === focusedIndex ? "#e3e5ea" : "",}}
                >
                  {suggestion.term}
                </li>
              )
            })}
          </ul>
        </div>
      }
    </div>
  )
}

export default AutoCompleteSeachBar