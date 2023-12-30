import React from "react";
import "./Icon.scss";

const Icon = ({ icon: IconComponent, color, invertIconColor, size }) => {
    // if size is not set and is not either of the following then set it to medium
    const iconSize = size && ["xs", "sm", "md", "lg", "xl"].includes(size) ? size : "xl";

    return (
        <div className={`icon icon--${color} icon--${iconSize} ${invertIconColor ? 'icon--invert' : ''}`}>
            <IconComponent />
        </div>
    );
}

export default Icon;
