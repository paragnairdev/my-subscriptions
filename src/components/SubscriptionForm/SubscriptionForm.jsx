import React, { useState, useEffect } from 'react';
import './SubscriptionForm.scss';

const SubscriptionForm = ({ updateSubscriptions }) => {
    const [newSubscription, setNewSubscription] = useState({
        name: '',
        category: '',
        customCategory: '',
        amount: '',
        type: 'monthly', // Default to 'monthly', can also be 'annually'
    });

    // Predefined categories
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Load categories from localStorage or use default categories
        const storedCategories = JSON.parse(localStorage.getItem('subscriptionCategories')) || 
                                 ["Entertainment", "Productivity", "Finance", "Education", "Health & Fitness"];
        setCategories(storedCategories);
    }, []);

    const handleInputChange = (event) => {
        setNewSubscription({ ...newSubscription, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let finalCategory = newSubscription.category;
        if (newSubscription.category === 'Other') {
            finalCategory = newSubscription.customCategory;
            if (finalCategory && !categories.includes(finalCategory)) {
                const updatedCategories = [...categories, finalCategory];
                localStorage.setItem('subscriptionCategories', JSON.stringify(updatedCategories));
                setCategories(updatedCategories);
            }
        }
        updateSubscriptions({ ...newSubscription, category: finalCategory });
        setNewSubscription({ name: '', category: '', customCategory: '', amount: '', type: 'monthly' });
    };

    return (
        <form onSubmit={handleSubmit} className="subscription-form form__section">
            <div className='form__body form__body--2-col'>
                <div className='form__group'>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={newSubscription.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='form__group'>
                    <label>Category:</label>
                    <select
                        name="category"
                        value={newSubscription.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                        <option value="Other">Other</option>
                    </select>
                    {newSubscription.category === 'Other' && (
                        <input
                            type="text"
                            name="customCategory"
                            value={newSubscription.customCategory}
                            onChange={handleInputChange}
                            placeholder="Enter custom category"
                            required
                        />
                    )}
                </div>
                <div className='form__group'>
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={newSubscription.amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='form__group'>
                    <label>Type:</label>
                    <select
                        name="type"
                        value={newSubscription.type}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="monthly">Monthly</option>
                        <option value="annually">Annually</option>
                    </select>
                </div>
            </div>
            <div className='form__footer'>
                <button type="submit">Add Subscription</button>
            </div>
        </form>
    );
};

export default SubscriptionForm;
