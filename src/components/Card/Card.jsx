import React from "react";
import "./Card.scss";
import Icon from "../Icon/Icon";

const Card = ({ color, label, metric, icon, invertIconColor }) => {
    const hasIcon = !!icon;
    return (
        <div className={`card card--${color} ${!hasIcon ? 'card--no-icon' : ''}`}>
            {icon && (
                <div className="card__icon">
                    <Icon icon={icon} color={color} invertIconColor={invertIconColor} />
                </div>
            )}
            <div className="card__metric hint-amount">{metric}</div>
            <div className="card__label">
                {label}
            </div>
        </div>
    );
};

export default Card;