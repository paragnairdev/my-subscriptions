import React from "react";
import "./Card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ color, label, metric, icon }) => {
    const hasIcon = !!icon;
    return (
        <div className={`card card--${color} ${!hasIcon ? 'card--no-icon' : ''}`}>
            {icon && (
                <div className="card__icon">
                    <FontAwesomeIcon icon={icon} />
                </div>
            )}
            <div className="card__metric">{metric}</div>
            <div className="card__label">
                {label}
            </div>
        </div>
    );
};

export default Card;