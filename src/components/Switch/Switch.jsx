import React from 'react';
import './Switch.scss'; // Path to your Switch.scss file

const Switch = ({ label, isOn, handleToggle }) => {
    return (
        <div className={`switch ${isOn ? 'switch--on' : ''}`} onClick={handleToggle}>
            <span className="switch__label">{label}</span>
            <div className="switch__handle"></div>
        </div>
    );
};

export default Switch;
