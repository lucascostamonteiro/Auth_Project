import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ModalImage } from '../../context/ImageModal';
import { ImageDetail } from '../ImageDetail';


function MyFavorites() {
  const sessionUser = useSelector(state => state.session.user);
  const allImages = useSelector(state => state.images);
  const userFavorites = Object.values(useSelector(state => state.favorites.user));
  const [showModal, setShowModal] = useState(false);
  const singleFavorite = userFavorites.filter(favorite => sessionUser.id === favorite.userId);

  console.log('ALL', userFavorites);
  console.log('USER', sessionUser);
  console.log('DEBUG', singleFavorite);


  const handleImgError = (e) => {
    e.target.src = '../../../../static/not-image.png';
  }


  return (
    <>
      <div><h1 className="favorites-title">My Favorites</h1></div>
      {sessionUser?.id !== userFavorites?.userId ?
        <div><h1 className="favorites-sub-title" >You don't have any favorite stadiums yet</h1></div>
        :
        <>
          {userFavorites?.map(favorite => (
            <div key={favorite.id} className="favorite-main-div">
              <h2>{allImages[favorite?.imageId]?.content}</h2>
              <img className="single-image-favorite" src={allImages[favorite?.imageId]?.imageUrl} onError={handleImgError}
              />
            </div>
          ))}
        </>
      }
      {
        showModal && (
          <ModalImage onClose={() => setShowModal(false)}>
            {/* <ImageDetail image={image} description={image.content} showModal={setShowModal} /> */}
          </ModalImage>
        )
      }
    </>
  )
}


export default MyFavorites;
