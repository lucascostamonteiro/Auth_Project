import React from "react";
import { useSelector } from "react-redux";


function MyFavorites() {
  const allImages = useSelector(state => state.images);
  const userFavorites = Object.values(useSelector(state => state.favorites.user));


  console.log('ALL', allImages);


  const handleImgError = (e) => {
    e.target.src = '../../../../static/not-image.png';
  }

  return (
    <>
      {userFavorites.map(favorite => (
        <img src={allImages[favorite?.imageId]?.imageUrl} onError={handleImgError}/>
      ))}
    </>
  )
}


export default MyFavorites;
