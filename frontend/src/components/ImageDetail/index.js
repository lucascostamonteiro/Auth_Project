import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorites, deleteFavorites, loadFavoriteImages } from "../../store/favorites";
import { eraseImage } from "../../store/images";
import { editDescription } from "../../store/images";
import Comments from "../Comments";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import './ImageDetail.css';

function ImageDetail({ image, showModal }) {
    const dispatch = useDispatch();
    const [editable, setEditable] = useState(false);
    const [imageUrl, setImageUrl] = useState(image.imageUrl);
    const [content, setContent] = useState(image.content);
    const [errors, setErrors] = useState([]);
    const [hover, setHover] = useState(false);

    const user = useSelector(state => state.session.user);
    const userFavorites = Object.values(useSelector(state => state.favorites.user));
    const favoriteExists = userFavorites.filter(favorite => favorite?.imageId === image?.id);


    // console.log('IMAGE', image)

    useEffect(() => {
        const validationErrors = [];
        // if (!imageUrl.length) validationErrors.push("Please provide a valid URL");
        // if (imageUrl.length > 0 && !imageUrl.match(/^https?:\/\/.+\/.+$/)) validationErrors.push("Please provide a valid URL");
        if (!content.length) validationErrors.push("Please provide a description");
        setErrors(validationErrors);
    }, [content])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editDescription({ imageUrl, content, id: image.id, userId: user.id }))
        setEditable(!editable);
    }

    const deleteImage = async (e) => {
        e.preventDefault();
        dispatch(eraseImage(image));
        showModal(false);
    };

    const handleImgError = (e) => {
        e.target.src = '../../../../static/not-image.png';
    }

    useEffect(() => {
        dispatch(loadFavoriteImages(image?.id))
    }, [])


    const handleFavorites = (e) => {
        e.preventDefault();
        const data = {
            userId: user.id,
            imageId: image.id
        }
        dispatch(addFavorites(data))
        setHover(false)

    };

    const handleUnfavorites = (e) => {
        e.preventDefault();
        const data = {
            id: favoriteExists[0].id
        }
        dispatch(deleteFavorites(data))
        setHover(true)
    };


    return (
        <div className="main-image">
            <div className="image-title-div">
                <div className="image-title-favorite-div">
                    <h2 className="single-image-title-detail">{image?.content}</h2>
                    {(user?.id !== image?.userId) &&
                        <div>
                            {favoriteExists?.length ?
                                <FaHeart className="favorite-button" onClick={handleUnfavorites} onMouseLeave={() => setHover(false)} />
                                : <FaRegHeart className="favorite-button" onClick={handleFavorites} onMouseLeave={() => setHover(false)} />
                            }
                        </div>
                    }
                </div>
                <div>
                    <img
                        className="single-image-detail"
                        key={image.id}
                        src={image.imageUrl}
                        alt={image.content}
                        onError={handleImgError}>
                    </img>

                </div>
                {user && (user?.id === image?.userId) &&
                    <div>
                        <button className="delete-button-image" onClick={deleteImage}>
                            <i className="far fa-trash-alt"></i>
                        </button >
                        <button className="edit-button-image" onClick={() => { setEditable(!editable) }}>
                            <i className="far fa-edit"></i>
                        </button>
                    </div>
                }
            </div>
            <div>
                {editable && (
                    <form className="edit-form" onSubmit={handleSubmit}>
                        <ul className='errors-list'>
                            {errors.map((error, idx) => (
                                <li className='error' key={idx}>{error}</li>
                            ))}
                        </ul>
                        <label htmlFor="Description">Description</label>
                        <input
                            name='content'
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter a new description..."
                            required
                        />
                        <button
                            className="edit-button"
                            type="submit"
                        // disabled={errors.length > 0}
                        >Submit Edit</button>
                    </form>
                )}
            </div>
            <div className="comments-div">
                <span>
                    <Comments image={image} />
                </span>
            </div>
        </div >
    )
}


export default ImageDetail;
