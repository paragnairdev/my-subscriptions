import React, { useState, useEffect } from "react";
import CurrencySelector from "./CurrencySelector";

// Stateful wrapper component
const CurrencySelectorWrapper = ({ currentCurrency, availableCurrencies }) => {
    const [currentCurrencyInternal, setCurrentCurrencyInternal] = useState(currentCurrency);

    useEffect(() => {
        setCurrentCurrencyInternal(currentCurrency);
    }, [currentCurrency]);

    const handleCurrencyChange = (currency) => {
        setCurrentCurrencyInternal(currency);
    };

    return (
        <CurrencySelector
        currentCurrency={currentCurrencyInternal}
        onCurrencyChange={handleCurrencyChange}
        availableCurrencies={availableCurrencies}
        />
    );
};

export default {
    title: "Components/CurrencySelector",
    component: CurrencySelectorWrapper,
    argTypes: {
        currentCurrency: {
            control: "select",
            options: ["£", "$", "€", "₹"],
        },
        onCurrencyChange: {
            table: {
                disable: true,
            }
        },
        availableCurrencies: {
            table: {
                disable: true,
            }
        }
    },
};

const Template = (args) => {
    return <CurrencySelectorWrapper {...args} />;
}

export const Default = Template.bind({});
Default.args = {
    currentCurrency: "£",
    onCurrencyChange: (currency) => console.log(`Currency changed to ${currency}`),
    availableCurrencies: ["£", "$", "€", "₹"],
};

export const Dollar = Template.bind({});
Dollar.args = {
    ...Default.args,
    currentCurrency: "$"
};

export const Euro = Template.bind({});
Euro.args = {
    ...Default.args,
    currentCurrency: "€"
};

export const Rupee = Template.bind({});
Rupee.args = {
    ...Default.args,
    currentCurrency: "₹"
};