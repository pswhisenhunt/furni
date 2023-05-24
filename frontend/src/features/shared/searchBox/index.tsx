import * as React from 'react'
import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchSuggestions } from './searchBoxSlice'
import { BASE_IMAGE_URL } from '../../../api/constants'
import { debounce } from '../../../app/utils';

const SearchBox: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const selectedSuggestionContainer = useRef(null)
  const suggestions = useAppSelector(state => state.searchBoxSlice.suggestions)
  const [ query, setQuery ] = useState('')
  const [ focusedIndex, setFocusedIndex ] = useState<number>(-1)

  useEffect(() => {
    debouncedFetch()
  },[ query ])

  const debouncedFetch = useMemo(() => debounce(() => {
    if (!query) return
    dispatch(fetchSuggestions(query))
  }, 500), [ query ])
  
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value) {
      setQuery(value)
    } else {
      setQuery('')
    }
  }

  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = e
    let nextFocusedIndex = 0
    switch(key) {
      case 'ArrowDown':
        nextFocusedIndex = (focusedIndex + 1) % suggestions.length
        break
      case 'ArrowUp':
        nextFocusedIndex = (focusedIndex - 1) % suggestions.length
        break
      case 'Enter':
        e.preventDefault()
        submitSearchHandler(suggestions[focusedIndex])
        break
      case 'Escape':
        setFocusedIndex(-1)
      default:
        break
    }
    setFocusedIndex(nextFocusedIndex)
  }

  const submitSearchHandler = (suggestion?: string) => {
    const termToUse = suggestion ? suggestion : query
    const searchParams = new URLSearchParams();
    searchParams.append('query', termToUse.trim());
    navigate(`/search?${searchParams.toString()}`);
    setQuery('')
    setFocusedIndex(-1)
  }

  return (
    <div className='header-search' tabIndex={1} onKeyDown={keyDownHandler} onBlur={() => setFocusedIndex(-1)}>
      <input className='header-search--bar' placeholder='Search' onChange={inputChangeHandler} value={query}/>
      <img src={`${BASE_IMAGE_URL}/looking_glass.svg`} className='header-search--clickable-img' onClick={() => submitSearchHandler()}/>
    
      { query && suggestions.length > 0 && 
        <div className='search-suggestions-container'>
          <ul className='search-suggestions-list'>
            {suggestions.map((term, index) => {
              return (
                <li 
                  key={`${index}_${term}`}
                  className='search-suggestions-list-item'
                  onMouseDown={() => {submitSearchHandler(term)}}
                  onMouseEnter={() => {setFocusedIndex(index)}}
                  ref={index === focusedIndex ? selectedSuggestionContainer : null} 
                  style={{backgroundColor: index === focusedIndex ? "#e3e5ea" : "",}}
                >
                  {term}
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