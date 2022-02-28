import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import _debounce from 'lodash/debounce';
import { Search } from 'src/interfaces'
import style from './Search.module.css'

const Search = ({onChange}:Search) => {
  const [searchInput, setSearchInput] = useState('')

  const handleSearchChange = (ev:ChangeEvent<HTMLInputElement>)=>{
    const { value } = ev.target
    setSearchInput(value)
  }
  
  const debounceSearch = useCallback(_debounce(handleSearchChange, 1000), []);

  useEffect(()=>{
    onChange(searchInput)
  },[searchInput])

  return (
   <div className={style.searchWrapper}>
     <div className={style.searchContent}>
       <input 
        name="searchInput" 
        onChange={debounceSearch}
        placeholder="Pesquisar"
      />
     </div>
   </div>
  )
}

export default Search
