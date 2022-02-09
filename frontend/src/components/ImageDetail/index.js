import React from "react";
import './ImageDetail.css';

function ImageDetail({ image }) {
    return (
        <div>
            <img key={image.id} src={image.imageUrl} alt={image.content}></img>
            <p>{image?.content}</p>
        </div>
    )
}


export default ImageDetail;
