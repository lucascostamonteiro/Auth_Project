import { useState } from 'react';
import { Modal } from '../../context/Modal';
import ImageDetail from '../ImageDetail';


const SingleImage = ({ image }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='image-div'>
            <img
                onClick={() => setShowModal(true)}
                key={image.id}
                src={image.imageUrl}
                alt={image.content}>
            </img>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ImageDetail image={image}/>
                </Modal>
            )}
        </div>
    )
}

export default SingleImage;
