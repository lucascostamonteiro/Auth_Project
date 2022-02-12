import { useState } from 'react';
import { Modal } from '../../context/Modal';
import ImageDetail from '../ImageDetail';
import './SingleImage.css'


const SingleImage = ({ image }) => {
    const [showModal, setShowModal] = useState(false);

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
        </div>
    )
}

export default SingleImage;
