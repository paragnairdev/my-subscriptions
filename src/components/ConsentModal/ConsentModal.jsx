import React from "react";
import "./ConsentModal.scss";

const ConsentModal = ({ onAccept, onDecline }) => {
    return (
        <div className="consent-modal">
            <p>We use cookies to improve your experience and track website usage. No personal data is collected or tracked. Your consent will help us track the app usage patterns and serve you better. Do you accept our cookie policy? if you click Decline, we might not be able to identify any issues you are facing using the app.</p>
            <div className="consent-modal__buttons">
                <button className="button button--primary btn__success" onClick={onAccept}>Accept</button>
                <button className="button button--secondary btn__danger" onClick={onDecline}>Decline</button>
            </div>
        </div>
    );
};

export default ConsentModal;