import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import SingleImage from "../SingleImage";


function UserHome() {
    const imagesObj = useSelector(state => state.images);
    const images = Object.values(imagesObj);

    const handleImgError = (e) => {
        e.target.src = '../../../../static/not-image.png';
    }


    return (
        <ul>
            {images?.map((image, idx) => (
                <div key={idx}>
                    <Link to={`/images/${image?.id}`}>
                        <img
                            onClick={() => setShowModal(true)}
                            key={image.id}
                            src={image.imageUrl}
                            alt={image.content}
                            onError={handleImgError}
                            className="single-image"
                        />
                    </Link>
                </div>
            ))}
        </ul>
    )
}


export default UserHome;
