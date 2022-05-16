import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage } from "../../store/images";
import { useEffect } from "react";
import './NewImageForm.css';

function NewImageForm({ showModal }) {
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);

    // TODO validate inside handleSubmit so it only shows after

    useEffect(() => {
        const validationErrors = [];
        if (!imageUrl.length) validationErrors.push("Please provide an image with a valid file extension (.jpg, .jpeg, .gif, .png, .tiff)");
        // if (imageUrl.length > 0 && !imageUrl.match(/^https?:\/\/.+\/.+$/)) validationErrors.push("Please provide a valid URL");
        if (!content.length) validationErrors.push("Description must contain at least one character");
        setErrors(validationErrors);
    }, [imageUrl, content])

    // const validate = () => {
    //     const validationErrors = [];
    //     if (!imageUrl.length) validationErrors.push("Please provide a valid URL");
    //     if (imageUrl.length > 0 && !imageUrl.match(/^https?:\/\/.+\/.+$/)) validationErrors.push("Please provide a valid URL");
    //     if (!content.length) validationErrors.push("Please provide a description");
    //     setErrors(validationErrors);
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userId", sessionUser?.id)
        formData.append("image", imageUrl)
        formData.append("content", content)

        dispatch(addImage(formData));
        if (formData.errors) {
            setErrors(formData.errors)
        } else if (formData) {
            showModal(false);
        }
    }

    const fileSelected = event => {
        const file = event.target.files[0]
        setImageUrl(file)
    }

    return (
        <form className="new-image-form" onSubmit={handleSubmit}>
            <ul className='errors-list'>
                {errors.map((error, idx) => (
                    <li className='error' key={idx}>{error}</li>
                ))}
            </ul>
            <div className="input-div">
                <input
                    onChange={fileSelected}
                    type="file"
                    accept=".jpg, .jpeg, .gif, .png, .tiff"
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
