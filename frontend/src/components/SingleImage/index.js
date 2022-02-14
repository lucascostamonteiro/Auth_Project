import { useState } from 'react';
import { ModalImage } from '../../context/ImageModal';
import ImageDetail from '../ImageDetail';
import './SingleImage.css'


const SingleImage = ({ image }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='image-div'>
            <h2 className='image-title'>{image.content}</h2>
            <img
                onClick={() => setShowModal(true)}
                key={image.id}
                src={image.imageUrl}
                alt={image.content}
                className="single-image"
            >
            </img>
            {showModal && (
                <ModalImage onClose={() => setShowModal(false)}>
                    <ImageDetail image={image} description={image.content} showModal={setShowModal} />
                </ModalImage>
            )}
        </div>
    )
}

export default SingleImage;
