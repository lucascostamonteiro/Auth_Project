import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import SingleImage from '../SingleImage';


const SearchPage = () => {
  const imagesObj = useSelector((state) => state.images)
  const images = Object.values(imagesObj);
  const location = useLocation();

  const searchArr = images.filter(({ content }) => {
    return content.toLowerCase().includes(location.state.detail.toLowerCase())
  })


  return (
    <div className='search-page-container'>
      <div><h1 className="search-title">Search Results for "{location.state.detail}"</h1></div>
      {searchArr?.map(image => (
        <SingleImage image={image} key={image?.id} />
      ))}
    </div>
  )
};

export default SearchPage;
