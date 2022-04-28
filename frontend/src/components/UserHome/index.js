import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleImage from "../SingleImage";


function UserHome() {
    const imagesObj = useSelector(state => state.images);
    const images = Object.values(imagesObj);


    return (
        <ul>
            {images?.map((image, idx) => (
                <div key={idx}>
                    < SingleImage image={image} />
                </div>
            ))}
        </ul>
    )
}


export default UserHome;
