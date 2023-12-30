import React, { useState } from 'react';
import './SubscriptionList.scss';
import { VscClearAll } from "react-icons/vsc";
import { Tooltip } from 'react-tooltip';
import { MdDelete } from "react-icons/md";
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const SubscriptionList = ({ subscriptions, onDeleteSubscription, onClear }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!subscriptions || subscriptions.length === 0) {
        return <p>No subscriptions added yet.</p>;
    }

    const showConfirmationModal = () => {
        setIsModalOpen(true);
    };

    // order subscriptions by name
    const finalSubscriptions = subscriptions.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });

    return (
        <div>
            <div className='subscription-list__header'>
                <h2>My Subscriptions</h2>
                <div className='subscription-list__actions'>
                    <button data-tooltip-id="clearAllTip" data-tooltip-content="This will delete all the subscriptions" className='clear-btn' onClick={showConfirmationModal}><VscClearAll /> Clear All</button>
                    <Tooltip id="clearAllTip" className="danger-tooltip" />
                </div>
            </div>
            <ul className="subscription-list subscription-list--md">
                <li className="subscription-list__item subscription-list__item--header">
                    <div>Name</div>
                    <div>Category</div>
                    <div className="subscription-list__item-amount">Amount</div>
                    <div className="subscription-list__item-billing">Billing</div>
                    <div>&nbsp;</div>
                </li>
                {finalSubscriptions.map((subscription, index) => (
                    <li key={index} className="subscription-list__item">
                        {/* Subscription details */}
                        <div>{subscription.name}</div>
                        <div>{subscription.category}</div>
                        <div className="subscription-list__item-amount">£{parseFloat(subscription.amount).toFixed(2)}</div>
                        <div className="subscription-list__item-billing">{subscription.type.charAt(0).toUpperCase() + subscription.type.slice(1)}</div>
                        {/* Delete button */}
                        <button className='delete-btn' onClick={() => onDeleteSubscription(index)}>Delete</button>
                    </li>
                ))}
            </ul>

            <ul className="subscription-list subscription-list--sm">
                {finalSubscriptions.map((subscription, index) => (
                    <li key={index} className={`subscription-list__item subscription-list__item--type-${subscription.type === 'monthly' ? 'm' : 'y'}`}>
                        {/* Subscription details */}
                        <div className="subscription-list__item-type" title={subscription.type}>
                            <div>{subscription.type === 'monthly' ? 'M' : 'Y'}</div>
                        </div>
                        <div>
                            {subscription.name}
                            <div className="subscription-list__item-category">{subscription.category}</div>
                        </div>
                        <div className="subscription-list__item-amount">£{parseFloat(subscription.amount).toFixed(2)}</div>
                        {/* Delete button */}
                        <a href="javascript:void(0)" className='btn-danger' onClick={() => onDeleteSubscription(index)}><MdDelete /></a>
                    </li>
                ))}
            </ul>

            <ConfirmationModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={onClear}
                message="Are you sure you want to delete all the subscriptions?"
                />
        </div>
    );
};

export default SubscriptionList;
