import React, { useState } from 'react';

const CurrencySelector = ({ currentCurrency, onCurrencyChange, availableCurrencies }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className='button-group hint-amount' title='Change currency'>
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
