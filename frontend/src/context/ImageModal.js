import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ImageModal.css';

const ModalContextImage = React.createContext();

export function ModalProviderImage({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ModalContextImage.Provider value={value}>
                {children}
            </ModalContextImage.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function ModalImage({ onClose, children }) {
    const modalNode = useContext(ModalContextImage);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="modal-image">
            <div id="modal-background-image" onClick={onClose} />
            <div id='modal-content-image'>
                {children}
            </div>
        </div>,
        modalNode
    );
}
