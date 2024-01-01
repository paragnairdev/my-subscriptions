import React, { useState } from 'react';
import './CurrencySelector.scss';

const CurrencySelector = ({ currentCurrency, onCurrencyChange, availableCurrencies }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className='button-group' title='Change currency'>
            <button onClick={() => setShowDropdown(!showDropdown)}>
                {currentCurrency}
            </button>
            {showDropdown && (availableCurrencies.filter(c => c !== currentCurrency).map(currency => (
                <button key={currency} onClick={() => {
                    onCurrencyChange(currency);
                    setShowDropdown(false);
                }}>
                    {currency}
                </button>
            )))}
        </div>
    );
};

export default CurrencySelector;
