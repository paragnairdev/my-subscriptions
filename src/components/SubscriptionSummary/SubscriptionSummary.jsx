import React, { useEffect } from 'react';
import './SubscriptionSummary.scss';
import { SUBSCRIPTION_TYPES, loadCurrencySymbol } from '../../services/dataService';
import SubscriptionSummaryLarge from '../SubscriptionSummaryLarge/SubscriptionSummaryLarge';
import SubscriptionSummarySmall from '../SubscriptionSummarySmall/SubscriptionSummarySmall';

const SubscriptionSummary = ({ subscriptions }) => {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const yearly = SUBSCRIPTION_TYPES.YEARLY;
    const monthly = SUBSCRIPTION_TYPES.MONTHLY;
    const currency = loadCurrencySymbol();
    const totalMonthlyCost = subscriptions.reduce((acc, sub) => {
        return acc + (sub.type === yearly ? parseFloat(sub.amount) / 12 : parseFloat(sub.amount));
    }, 0);

    const totalYearlyCost = subscriptions.reduce((acc, sub) => {
        return acc + (sub.type === monthly ? parseFloat(sub.amount) * 12 : parseFloat(sub.amount));
    }, 0);

    return (
        <div>
        {
            windowWidth > 768 
            ? <SubscriptionSummaryLarge currency={currency} totalSubscriptions={subscriptions.length} monthlyCost={totalMonthlyCost} yearlyCost={totalYearlyCost} />
            : <SubscriptionSummarySmall currency={currency} totalSubscriptions={subscriptions.length} monthlyCost={totalMonthlyCost} yearlyCost={totalYearlyCost} />
        }
        </div>
    );
};

export default SubscriptionSummary;
