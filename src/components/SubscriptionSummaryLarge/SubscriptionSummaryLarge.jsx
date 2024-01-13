import React from "react";
import { FaCoins, FaMoneyBillWave } from "react-icons/fa6";
import { FcMultipleDevices } from "react-icons/fc";
import { SUBSCRIPTION_TYPES_LABELS } from '../../services/dataService';
import Card from "../Card/Card";

const SubscriptionSummaryLarge = ({ currency, totalSubscriptions, monthlyCost, yearlyCost }) => {
    return (
        <div className='subscription-summary App__row App__row--3-col'>
            <Card color='green' label='Total Subscriptions' metric={totalSubscriptions} icon={FcMultipleDevices} />
            <Card color='blue' label={`Total ${SUBSCRIPTION_TYPES_LABELS.MONTHLY} Cost`} metric={monthlyCost} metricSymbol={currency} icon={FaMoneyBillWave} />
            <Card color='pink' label={`Total ${SUBSCRIPTION_TYPES_LABELS.YEARLY} Cost`} metric={yearlyCost} metricSymbol={currency} icon={FaCoins}/>
        </div>
    );
};

export default SubscriptionSummaryLarge;