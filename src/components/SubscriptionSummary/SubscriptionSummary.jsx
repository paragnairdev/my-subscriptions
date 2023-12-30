import React from 'react';
import './SubscriptionSummary.scss';
import Card from '../Card/Card';
import { faHandshakeAngle, faMoneyBill, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';

const SubscriptionSummary = ({ subscriptions }) => {
    const totalMonthlyCost = subscriptions.reduce((acc, sub) => {
        return acc + (sub.type === 'annually' ? parseFloat(sub.amount) / 12 : parseFloat(sub.amount));
    }, 0);

    const totalYearlyCost = subscriptions.reduce((acc, sub) => {
        return acc + (sub.type === 'monthly' ? parseFloat(sub.amount) * 12 : parseFloat(sub.amount));
    }, 0);

    return (
        <div className='subscription-summary App__row App__row--3-col'>
            <Card color='green' label='Total Subscriptions' metric={subscriptions.length} icon={faHandshakeAngle} />
            <Card color='blue' label='Total Monthly Cost' metric={`£${totalMonthlyCost.toFixed(2)}`} icon={faMoneyBill} />
            <Card color='pink' label='Total Yearly Cost' metric={`£${totalYearlyCost.toFixed(2)}`} icon={faMoneyBillTrendUp}/>
        </div>
    );
};

export default SubscriptionSummary;
