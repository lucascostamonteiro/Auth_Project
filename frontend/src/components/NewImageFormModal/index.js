import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NewImageForm from './NewImageForm';


function NewImageFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id='new-image-form'
                onClick={() => setShowModal(true)}>New Image</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <NewImageForm showModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default NewImageFormModal;
