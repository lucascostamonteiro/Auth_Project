import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { eraseImage } from "../../store/images";
import { editDescription } from "../../store/images";
import './ImageDetail.css';

function ImageDetail({ image, showModal }) {
    const dispatch = useDispatch();
    const [editable, setEditable] = useState(false);
    const [imageUrl, setImageUrl] = useState(image.imageUrl);
    const [content, setContent] = useState(image.content);
    const [errors, setErrors] = useState([]);


    const handleSubmit = e => {
        e.preventDefault();
        dispatch(editDescription({ imageUrl, content, id: image.id }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        setEditable(!editable);
    }

    const deleteImage = async (e) => {
        e.preventDefault();
        dispatch(eraseImage(image));
        showModal(false);
    };

    return (
        <div className="image-detail-div">
            <h2>{image.content}</h2>
            <img
                className="single-image-detail"
                key={image.id}
                src={image.imageUrl}
                alt={image.content}>
            </img>
            <button onClick={() => { setEditable(!editable) }}>
                <i className="far fa-edit"></i>
            </button>
            {editable && (
                <form onSubmit={handleSubmit}>
                    <input
                        name='imageUrl'
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <input
                        name='content'
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
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
