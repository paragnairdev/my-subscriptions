import React from 'react';
import './SubscriptionSummary.scss';
import Card from '../Card/Card';
import { FaMoneyBill, FaMoneyBillWave } from "react-icons/fa";
import { FcMultipleDevices } from "react-icons/fc";
import { SUBSCRIPTION_TYPES, SUBSCRIPTION_TYPES_LABELS } from '../../services/dataService';


const SubscriptionSummary = ({ subscriptions }) => {
    const yearly = SUBSCRIPTION_TYPES.YEARLY;
    const monthly = SUBSCRIPTION_TYPES.MONTHLY;
    const totalMonthlyCost = subscriptions.reduce((acc, sub) => {
        return acc + (sub.type === yearly ? parseFloat(sub.amount) / 12 : parseFloat(sub.amount));
    }, 0);

    const totalYearlyCost = subscriptions.reduce((acc, sub) => {
        return acc + (sub.type === monthly ? parseFloat(sub.amount) * 12 : parseFloat(sub.amount));
    }, 0);

    return (
        <div className='subscription-summary App__row App__row--3-col'>
            <Card color='green' label='Total Subscriptions' metric={subscriptions.length} icon={FcMultipleDevices} />
            <Card color='blue' label={`Total ${SUBSCRIPTION_TYPES_LABELS.MONTHLY} Cost`} metric={`£${totalMonthlyCost.toFixed(2)}`} icon={FaMoneyBill} />
            <Card color='pink' label={`Total ${SUBSCRIPTION_TYPES_LABELS.YEARLY} Cost`} metric={`£${totalYearlyCost.toFixed(2)}`} icon={FaMoneyBillWave}/>
        </div>
    );
};

export default SubscriptionSummary;
