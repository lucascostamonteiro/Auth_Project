import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getImages } from "../../store/images";


function UserHome() {
    const dispatch = useDispatch();
    const imagesObj = useSelector(state => state.images);
    const images = Object.values(imagesObj);

    useEffect(() => {
        dispatch(getImages())
    }, [dispatch]);

    return (
        <ul>
            {images?.map((image) => (
                <img key={image.id} src={image.imageUrl} alt={image.content}></img>
            ))}
        </ul>
    )
}


export default UserHome;
