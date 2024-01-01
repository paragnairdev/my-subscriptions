import React, { useState } from 'react';
import './CurrencySelector.scss';

const CurrencySelector = ({ currentCurrency, onCurrencyChange, availableCurrencies }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className='button-group'>
            <button onClick={() => setShowDropdown(!showDropdown)}>
                {currentCurrency}
            </button>
            {showDropdown && (
                <div>
                    {availableCurrencies.filter(c => c !== currentCurrency).map(currency => (
                        <button key={currency} onClick={() => {
                            onCurrencyChange(currency);
                            setShowDropdown(false);
                        }}>
                            {currency}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CurrencySelector;
