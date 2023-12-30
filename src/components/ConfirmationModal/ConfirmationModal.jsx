import React from "react";
import "./ConfirmationModal.scss";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal modal-overlay">
            <div className="modal__content">
                <div className="modal__message">
                    {message}
                </div>
                <div className="modal__actions">
                    <button className="modal__yes" onClick={onConfirm}>Yes</button>
                    <button className="modal__no" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;