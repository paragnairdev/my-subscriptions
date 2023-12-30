import React from 'react';
import { IoClose } from "react-icons/io5";

const GenericModal = ({ isOpen, onClose, children, suffix }) => {
    if (!isOpen) return null;

    return (
        <div className="modal modal__overlay">
            <div className={`modal__content modal__content--hint-${suffix}`}>
                {children}
                <button className="modal__close" onClick={onClose}><IoClose /></button>
            </div>
        </div>
    );
};

export default GenericModal;
