import React from "react";
import { useSelector } from "react-redux";
import SingleImage from "../SingleImage";


function MyImages() {
  const allImages = useSelector(state => state.images);
  const sessionUser = useSelector(state => state?.session?.user)
  const userImagesArr = Object.values(useSelector(state => state.images));
  const userImages = userImagesArr.filter(image => image?.userId === sessionUser?.id);

  console.log('USER', userImagesArr);
  console.log('SESH', userImages);

  return (
    <>
      <div><h1 className="user-image-title">My Images</h1></div>
      {!userImages?.length ?
        <div><h1 className="user-image-sub-title" >You don't have any pictures yet. Start posting!</h1></div>
        :
        <>
          {userImages?.map(image => (
            <SingleImage image={image} key={image.id} />
          ))}
        </>
      }
    </>
  )
}


export default MyImages;
