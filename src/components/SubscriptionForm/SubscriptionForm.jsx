import React, { useState, useEffect, useRef } from 'react';
import { loadData, addCategory, SUBSCRIPTION_TYPES, SUBSCRIPTION_TYPES_LABELS } from '../../services/dataService';
import OptionSelector from '../OptionSelector/OptionSelector';

const SubscriptionForm = ({ addNewSubscription, onClose }) => {
    const options = [
        { label: SUBSCRIPTION_TYPES_LABELS.MONTHLY, value: SUBSCRIPTION_TYPES.MONTHLY },
        { label: SUBSCRIPTION_TYPES_LABELS.YEARLY, value: SUBSCRIPTION_TYPES.YEARLY },
    ];
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [billingFrequency, setBillingFrequency] = useState(options[0]); // [monthly, yearly
    const nameInputRef = useRef(null);

    const [newSubscription, setNewSubscription] = useState({
        name: '',
        category: '',
        customCategory: '',
        amount: '',
        type: billingFrequency.value,
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
    }, [isSubmitted]);

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
        // remove the property customCategory from the newSubscription object
        delete newSubscription.customCategory;
        addNewSubscription({ ...newSubscription, category: finalCategory });
        setNewSubscription({ ...newSubscription, name: '', category: '', customCategory: '', amount: '' });
        setIsSubmitted(true);
        nameInputRef.current.focus();
    };

    const handleBillingSelection = (option) => {
        setBillingFrequency(option);
        setNewSubscription({ ...newSubscription, type: option.value });
    };

    return (
        <form onSubmit={handleSubmit} className="subscription-form form__section">
            <div className='form__body form__body--2-col'>
                <div className='form__group'>
                    <label>Service:</label>
                    <input
                        ref={nameInputRef}
                        type="text"
                        name="name"
                        placeholder='Service Name'
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
                        className='hint-amount'
                        placeholder='9.99'
                        value={newSubscription.amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='form__group'>
                    <label>Billing:</label>
                    <OptionSelector options={options} selectedOption={billingFrequency} onOptionSelected={handleBillingSelection} fill={true}/>
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
