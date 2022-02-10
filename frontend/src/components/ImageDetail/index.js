import React from "react";
import ContentEditable from "react-contenteditable";
import { useDispatch, useSelector } from "react-redux";
import { eraseImage } from "../../store/images";
import { editDescription } from "../../store/images";
import './ImageDetail.css';

function ImageDetail({ image, description, showModal }) {
    const dispatch = useDispatch();
    const imagesObj = useSelector(state => state.images);
    const images = Object.values(imagesObj);
    const contentTitle = images.content
    console.log('DEBUG', images);
    console.log('DEBUG+++++++',);

    const deleteImage = async (e) => {
        e.preventDefault();
        dispatch(eraseImage(image));
        showModal(false);
    };

    const editImage = async (e) => {
        e.preventDefault();
        dispatch(editDescription(description));
    };

    return (
        <div className="image-detail-div">
            <img
                className="single-image-detail"
                key={image.id}
                src={image.imageUrl}
                alt={image.content}>
            </img>
            <ContentEditable
                html {className = "image-title" > { image.content }}
            />
            <button onClick={editImage}>
                <i className="far fa-edit"></i>
            </button>
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
