import React from "react";
import "./HeaderToolbar.scss";
import { MdLightMode, MdNightlight } from "react-icons/md";

const HeaderToolbar = ({ theme, toggleTheme }) => {
    return (
        <div className="header-toolbar">
            <div className="hint-action" onClick={toggleTheme} title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
                {theme === "light" ? <MdLightMode /> : <MdNightlight />}
            </div>
        </div>
    );
};

export default HeaderToolbar;