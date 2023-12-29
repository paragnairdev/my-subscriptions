import React from 'react';
import './SubscriptionSummary.scss';
import Card from '../Card/Card';
import { faHandshakeAngle } from '@fortawesome/free-solid-svg-icons';

const SubscriptionSummary = ({ subscriptions }) => {
    const totalMonthlyCost = subscriptions.reduce((acc, sub) => {
        return acc + (sub.type === 'annually' ? parseFloat(sub.amount) / 12 : parseFloat(sub.amount));
    }, 0);

    const totalYearlyCost = subscriptions.reduce((acc, sub) => {
        return acc + (sub.type === 'monthly' ? parseFloat(sub.amount) * 12 : parseFloat(sub.amount));
    }, 0);

    return (
        <div className='subscription-summary'>
            <Card color='green' label='Total Subscriptions' metric={subscriptions.length} icon={faHandshakeAngle} />
            <Card color='blue' label='Total Monthly Cost' metric={`£${totalMonthlyCost.toFixed(2)}`} />
            <Card color='purple' label='Total Yearly Cost' metric={`£${totalYearlyCost.toFixed(2)}`} />
        </div>
    );
};

export default SubscriptionSummary;
