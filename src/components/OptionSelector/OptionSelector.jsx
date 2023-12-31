import React from "react";
import "./OptionSelector.scss";

const OptionSelector = ({ options, selectedOption, onOptionSelected, fill }) => {
    // if no selected option, select the first one
    if (!selectedOption) {
        selectedOption = options[0];
    }

    return (
        <div className={`option-selector ${fill ? 'option-selector--fill' : ''}`}>
        {options.map((option) => (
            <button
            type="button"
            key={option.value}
            className={`option-selector__option ${
                selectedOption.value === option.value ? "option-selector__option--selected" : ""
            }`}
            onClick={() => onOptionSelected(option)}
            >
            {option.label}
            </button>
        ))}
        </div>
    );
};

export default OptionSelector;