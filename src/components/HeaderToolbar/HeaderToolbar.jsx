import React from "react";
import { FaMoon, FaRegLightbulb } from "react-icons/fa6";

const HeaderToolbar = ({ theme, toggleTheme }) => {
    return (
        <div className="header-toolbar">
            <div className="hint-action" onClick={toggleTheme}>
                {theme === "light" ? <FaRegLightbulb /> : <FaMoon />}
            </div>
        </div>
    );
};

export default HeaderToolbar;