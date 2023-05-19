import * as React from 'react'
import { useState, useCallback, useRef, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchsuggestedSearchTerms } from './searchBoxSlice'
import { SearchTerm } from '../../../app/types'

import AutoCompleteSeachBar from './autoCompleteSearchBar'

interface SearchBoxProps {
  suggestedSearchAttribute: string
}

const SearchBox: React.FC<SearchBoxProps> = ({ suggestedSearchAttribute = 'type' }): JSX.Element => {
  const [ inputValue, setInputValue ] = useState('')
  const [ filteredSuggestions, setFilteredSuggestions ] = useState<SearchTerm[]>([])
  const dispatch = useAppDispatch()
  const suggestedSearchTerms = useAppSelector(state => state.searchBoxSlice.suggestedSearchTerms)

  useEffect(() => {
    dispatch(fetchsuggestedSearchTerms(suggestedSearchAttribute))
  },[])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    if (!value) {
      setInputValue('')
      setFilteredSuggestions([])
    } else {
      setInputValue(value)
      setFilteredSuggestions(suggestedSearchTerms.filter(suggestion => suggestion.term.includes(inputValue)))
    }
  }

  const resetSuggestions = useCallback(() => {
    setFilteredSuggestions([])
  }, [])

  const handleSelection = (selectedItemIndex: number) => {
    const selectedItem = filteredSuggestions[selectedItemIndex]
    if (!selectedItem) {
      resetSuggestions()
    } else {
      setInputValue(selectedItem.term)
      resetSuggestions()
    }
  }

  return (
    <AutoCompleteSeachBar
      suggestedSearchTerms={filteredSuggestions}
      onChange={handleInputChange}
      onSelect={handleSelection}
      resetSuggestions={resetSuggestions}
      value={inputValue}
    />
  )
}

export default SearchBox