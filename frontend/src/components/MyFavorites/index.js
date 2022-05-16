import React from "react";
import { useSelector } from "react-redux";
import SingleImage from "../SingleImage";


function MyFavorites() {
  const allImages = useSelector(state => state.images);
  const userFavorites = Object.values(useSelector(state => state.favorites.user));

  return (
    <>
      <div><h1 className="favorites-title">My Favorites</h1></div>
      {!userFavorites?.length ?
        <div><h1 className="favorites-sub-title" >You don't have any favorite stadiums yet</h1></div>
        :
        <>
          {userFavorites?.map(favorite => (
            <SingleImage image={allImages[favorite?.imageId]} key={favorite.id} />
          ))}
        </>
      }
    </>
  )
}


export default MyFavorites;
