import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { ModalImage } from '../../context/ImageModal';
// import ImageDetail from '../ImageDetail';
import SingleImage from "../SingleImage";


function MyFavorites() {
  const allImages = useSelector(state => state.images);
  const userFavorites = Object.values(useSelector(state => state.favorites.user));
  // const [showModal, setShowModal] = useState(false);

  // const favorites = Object.values(useSelector(state => state.favorites));
  console.log('FAVORITES', userFavorites)

  // const handleImgError = (e) => {
  //   e.target.src = '../../../../static/not-image.png';
  // }


  return (
    <>
      <div><h1 className="favorites-title">My Favorites</h1></div>
      {!userFavorites?.length ?
        <div><h1 className="favorites-sub-title" >You don't have any favorite stadiums yet</h1></div>
        :
        <>
          {userFavorites?.map(favorite => (
            // <div key={favorite.id} className="favorite-main-div">
            //   <h2>{allImages[favorite?.imageId]?.content}</h2>
            //   <img className="single-image-favorite" src={allImages[favorite?.imageId]?.imageUrl} onError={handleImgError}
            //   />
            // </div>
            <SingleImage image={allImages[favorite?.imageId]} key={favorite.id} />
          ))}
        </>
      }
    </>
  )
}


export default MyFavorites;
