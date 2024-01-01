import React, { useState } from 'react';
import './SubscriptionList.scss';
import { Tooltip } from 'react-tooltip';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { SUBSCRIPTION_TYPES } from '../../services/dataService';
import { FaCirclePlus, FaTrash } from "react-icons/fa6";
import Cur from '../Cur/Cur';

const SubscriptionList = ({ subscriptions, onDeleteSubscription, onClear, onAddSubscription }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hasSubscriptions = subscriptions && subscriptions.length > 0;

    const handleAdd = (event) => { 
        event.preventDefault();
        onAddSubscription();
    };

    const showConfirmationModal = () => {
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
        onClear();
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
                    <button className='btn-primary' onClick={handleAdd}><FaCirclePlus /><span className='hide--sm'>Add</span></button>
                    <button data-tooltip-id="clearAllTip" data-tooltip-content="This will delete all the subscriptions" onClick={showConfirmationModal}><FaTrash /><span className='hide--sm'>Delete All</span></button>
                </div>
                <Tooltip id="clearAllTip" className="danger-tooltip" />
            </div>
            {!hasSubscriptions && (<p>No subscriptions added yet. <a href="#" onClick={handleAdd}>Add your first subscription</a></p>)}
            <ul className="subscription-list subscription-list--md">
                {hasSubscriptions && (
                <li className="subscription-list__item subscription-list__item--header">
                    <div>#</div>
                    <div>Service</div>
                    <div>Category</div>
                    <div className="subscription-list__item-amount">Amount</div>
                    <div className="subscription-list__item-billing">Billing</div>
                    <div>&nbsp;</div>
                </li>
                )}
                {finalSubscriptions.map((subscription, index) => (
                    <li key={index} className="subscription-list__item">
                        {/* Subscription details */}
                        <div>{index+1}</div>
                        <div>{subscription.name}</div>
                        <div>{subscription.category}</div>
                        <div className="subscription-list__item-amount"><Cur/>{parseFloat(subscription.amount).toFixed(2)}</div>
                        <div className="subscription-list__item-billing">{subscription.type.charAt(0).toUpperCase() + subscription.type.slice(1)}</div>
                        {/* Delete button */}
                        <button className='btn-danger' onClick={() => onDeleteSubscription(index)}><FaTrash />Delete</button>
                    </li>
                ))}
            </ul>

            <ul className="subscription-list subscription-list--sm">
                {finalSubscriptions.map((subscription, index) => (
                    <li key={index} className={`subscription-list__item subscription-list__item--type-${subscription.type === SUBSCRIPTION_TYPES.MONTHLY ? 'm' : 'y'}`}>
                        {/* Subscription details */}
                        <div className="subscription-list__item-type" title={subscription.type}>
                            <div>{subscription.type === SUBSCRIPTION_TYPES.MONTHLY ? 'M' : 'Y'}</div>
                        </div>
                        <div>
                            {subscription.name}
                            <div className="subscription-list__item-category">{subscription.category}</div>
                        </div>
                        <div className="subscription-list__item-amount"><Cur/>{parseFloat(subscription.amount).toFixed(2)}</div>
                        {/* Delete button */}
                        <a href="#" className='btn-danger' onClick={() => onDeleteSubscription(index)}><FaTrash /></a>
                    </li>
                ))}
            </ul>

            <ConfirmationModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                message="This will delete all the subscriptions you have added till now. Are you sure you want to delete all the subscriptions?"
                />
        </div>
    );
};

export default SubscriptionList;
