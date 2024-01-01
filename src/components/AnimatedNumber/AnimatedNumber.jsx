import React, { useState, useEffect } from 'react';

const AnimatedNumber = ({ target, decimal }) => {
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        // Only animate if the target number is different from the current value
        if (currentValue < target) {
            // Calculate the increment per frame to achieve a smooth animation
            const increment = target / 100;

            // Create an interval to update the current value
            const interval = setInterval(() => {
                setCurrentValue(prevValue => {
                    const newValue = prevValue + increment;
                    if (newValue >= target) {
                        clearInterval(interval);
                        return target; // Ensure we don't exceed the target
                    }
                    return newValue;
                });
            }, 5); // Adjust interval timing for speed

            // Clear interval on component unmount
            return () => clearInterval(interval);
        }
    }, [target, currentValue]);

    return (
        <span>{currentValue.toFixed(decimal)}</span> // You can adjust decimal places
    );
};

export default AnimatedNumber;
