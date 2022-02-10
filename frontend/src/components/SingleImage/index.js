import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { editDescription } from '../../store/images';
import ImageDetail from '../ImageDetail';
import './SingleImage.css'


const SingleImage = ({ image }) => {
    // const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    // const [editable, setEditable] = useState(false);
    // const [imageUrl, setImageUrl] = useState(image.imageUrl);
    // const [content, setContent] = useState(image.content);


    // const handleSubmit = e => {
    //     e.preventDefault();
    //     dispatch(editDescription({ imageUrl, content, id: image.id }))
    //     //.catch
    //     setEditable(!editable)
    // }

    return (
        <div className='image-div'>
            <h2>{image.content}</h2>
            <img
                onClick={() => setShowModal(true)}
                key={image.id}
                src={image.imageUrl}
                alt={image.content}
                className="single-image"
            >
            </img>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ImageDetail image={image} description={image.content} showModal={setShowModal} />
                </Modal>
            )}
            {/* <button onClick={() => { setEditable(!editable) }}>
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
            )} */}
        </div>
    )
}

export default SingleImage;
