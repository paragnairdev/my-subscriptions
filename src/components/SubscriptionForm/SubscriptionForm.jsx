import React, { useState, useEffect, useRef } from 'react';
import { loadData, addCategory } from '../../services/dataService';

const SubscriptionForm = ({ addNewSubscription, onClose }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const nameInputRef = useRef(null);

    const [newSubscription, setNewSubscription] = useState({
        name: '',
        category: '',
        customCategory: '',
        amount: '',
        type: 'monthly',
    });

    // Predefined categories
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const { categories } = loadData();
        setCategories(categories);
        
        if (isSubmitted) {
            nameInputRef.current.focus();
            setIsSubmitted(false);
        }
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
                addCategory(finalCategory);

                // Update categories in state
                setCategories([...categories, finalCategory]);
            }
        }
        addNewSubscription({ ...newSubscription, category: finalCategory });
        setNewSubscription({ name: '', category: '', customCategory: '', amount: '', type: 'monthly' });
        setIsSubmitted(true);
        nameInputRef.current.focus();
    };

    return (
        <form onSubmit={handleSubmit} className="subscription-form form__section">
            <div className='form__body form__body--2-col'>
                <div className='form__group'>
                    <label>Name:</label>
                    <input
                        ref={nameInputRef}
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
                    <label>Billing:</label>
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
                <button onClick={onClose}>Cancel</button>
                <button type="submit">Add Subscription</button>
            </div>
        </form>
    );
};

export default SubscriptionForm;
