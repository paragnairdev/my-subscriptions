import React from 'react';
import './SubscriptionList.scss';

const SubscriptionList = ({ subscriptions, onDeleteSubscription, onClear }) => {
    if (!subscriptions || subscriptions.length === 0) {
        return <p>No subscriptions added yet.</p>;
    }

    return (
        <div>
            <div className='subscription-list__header'>
                <h2>My Subscriptions</h2>
                <button className='clear-btn' onClick={onClear}>Clear All</button>
            </div>
            <ul className="subscription-list">
                <li className="subscription-list__item subscription-list__item--header">
                    <div>Name</div>
                    <div>Category</div>
                    <div>Amount</div>
                    <div>Type</div>
                </li>
                {subscriptions.map((subscription, index) => (
                    <li key={index} className="subscription-list__item">
                        {/* Subscription details */}
                        <div>{subscription.name}</div>
                        <div>{subscription.category}</div>
                        <div>£{parseFloat(subscription.amount).toFixed(2)}</div>
                        <div>{subscription.type.charAt(0).toUpperCase() + subscription.type.slice(1)}</div>
                        {/* Delete button */}
                        <button className='delete-btn' onClick={() => onDeleteSubscription(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubscriptionList;
