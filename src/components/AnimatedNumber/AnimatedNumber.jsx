import React, { useState, useEffect } from 'react';

const AnimatedNumber = ({ target, decimal, duration = 500 }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const threshold = 0.01; // Define a small threshold for comparison

    useEffect(() => {
        const difference = target - currentValue;
        const steps = duration / 10; // Number of steps based on duration, 10ms per step
        const increment = difference / steps; // Amount to change each step

        if (difference !== 0) {
            const timer = setInterval(() => {
                setCurrentValue(prevValue => {
                    let nextValue = prevValue + increment;
                    // Check if the difference is within the threshold
                    if (Math.abs(nextValue - target) < threshold) {
                        clearInterval(timer);
                        return target; // Snap to the target value
                    }
                    return nextValue;
                });
            }, 10); // Run every 10ms

            return () => clearInterval(timer); // Cleanup
        }
    }, [target, currentValue, duration]);

    return <span>{currentValue.toFixed(decimal)}</span>;
};

export default AnimatedNumber;
