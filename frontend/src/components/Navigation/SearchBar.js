import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { loadSearch } from '../../store/search';
import './Navigation.css'


function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  // const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // history.push(`/search/${searchInput}`)
    history.push(
      {
        pathname: '/search',
        search: '?query=abc',
        state: { detail: searchInput }
      }
    )
  }


  return (
    <div id="searchDiv">
      <form onSubmit={handleSubmit} id="searchInput">
        <input
          placeholder='Search for a stadium'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          autoComplete='off'>
        </input>
      </form>
    </div>
  )
}

export default SearchBar;
