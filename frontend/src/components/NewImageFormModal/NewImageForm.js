import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage } from "../../store/images";
import { useEffect } from "react";
import './NewImageForm.css';

function NewImageForm({showModal}) {
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);

    // TODO validate insde handleSubmit so it only shows after 

    useEffect(() => {
        const validationErrors = [];
        if (!imageUrl.length) validationErrors.push("Please provide a valid URL");
        if (imageUrl.length > 0 && !imageUrl.match(/^https?:\/\/.+\/.+$/)) validationErrors.push("Please provide a valid URL");
        if (!content.length) validationErrors.push("Please provide a description");
        setErrors(validationErrors);
    }, [imageUrl, content])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            userId: sessionUser.id,
            imageUrl,
            content
        };
        dispatch(addImage(data));
        showModal(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul className='errors-list'>
                {errors.map((error, idx) => (
                    <li className='error' key={idx}>{error}</li>
                ))}
            </ul>
            <div className="input-div">
                <input
                    type="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder='Image Url'
                    required
                />
                <input
                    type="description"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder='Description'
                    required
                />
                <button id="image-form-button" type="submit">Share an Image</button>
            </div>
        </form>
    );
}

export default NewImageForm;
