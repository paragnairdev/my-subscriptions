import React from "react";
import "./Card.scss";
import Icon from "../Icon/Icon";
import AnimatedNumber from "../AnimatedNumber/AnimatedNumber";

const Card = ({ color, label, metric, metricSymbol, metricDecimal, icon, invertIconColor }) => {
    const hasIcon = !!icon;
    return (
        <div className={`card card--${color} ${!hasIcon ? 'card--no-icon' : ''}`}>
            {icon && (
                <div className="card__icon">
                    <Icon icon={icon} color={color} invertIconColor={invertIconColor} />
                </div>
            )}
            <div className="card__metric hint-amount">{metricSymbol}<AnimatedNumber target={metric} decimal={metricDecimal} /></div>
            <div className="card__label">
                {label}
            </div>
        </div>
    );
};

export default Card;