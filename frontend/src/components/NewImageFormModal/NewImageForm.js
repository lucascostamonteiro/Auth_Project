import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addImage } from "../../store/images";
import { useEffect } from "react";
// import './NewImageFormModal.css';

function NewImageForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [imageUrl, setImageUrl] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);

    const reset = () => {
        imageUrl("");
        content("");
    };

    const validate = () => {
        const validationErrors = [];
        if (!imageUrl.length) validationErrors.push("Please provide a valid URL");
        if (imageUrl.length > 0 && !imageUrl.match(/^https?:\/\/.+\/.+$/)) validationErrors.push("Please provide a valid URL");
        if (!content.length) validationErrors.push("Please provide a description");
        return validationErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (imageUrl && content) {
            setErrors([]);
            dispatch(addImage({ imageUrl, content }))
            history.push('/');
            reset();
        } else if (errors.length > 0) setErrors(errors);
    };

    // useEffect(() => {
    //     const validationErrors = [];
    //     if (!imageUrl.length) validationErrors.push("Please provide a valid URL");
    //     if (imageUrl.length > 0 && !imageUrl.match(/^https?:\/\/.+\/.+$/)) validationErrors.push("Please provide a valid URL");
    //     if (!content.length) validationErrors.push("Please provide a description");
    //     setErrors(validationErrors);
    // }, [imageUrl, content])

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
