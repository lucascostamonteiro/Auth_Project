import React from "react";
import { useDispatch } from "react-redux";
import { eraseImage } from "../../store/images";
import './ImageDetail.css';

function ImageDetail({ image, showModal }) {
    const dispatch = useDispatch();

    const deleteImage = async (e) => {
        e.preventDefault();
        dispatch(eraseImage(image));
        showModal(false);
    };

    return (
        <div className="image-detail-div">
            <img
                className="single-image-detail"
                key={image.id}
                src={image.imageUrl}
                alt={image.content}>
            </img>
            <p className="image-title">{image.content}</p>
            <button onClick={deleteImage}>
                <i className="far fa-trash-alt"></i>
            </button >
            <ul>
                <li>
                    // TODO COMMENTS WILL GO HERE
                </li>
            </ul>
        </div>
    )
}


export default ImageDetail;
