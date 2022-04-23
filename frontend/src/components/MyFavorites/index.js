import React from "react";
import { useSelector } from "react-redux";


function MyFavorites() {
  const allListingsObj = useSelector(state => state.listings)
  const allListings = Object.values(allListingsObj).reverse();


  const handleImgError = (e) => {
    e.target.src = '../../../../static/not-image.png';
  }

  return (
    <>

    </>
  )
}


export default MyFavorites;


