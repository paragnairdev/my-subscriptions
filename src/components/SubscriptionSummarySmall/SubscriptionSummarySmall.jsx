import React from "react";
import './SubscriptionSummarySmall.scss';
import AnimatedNumber from "../AnimatedNumber/AnimatedNumber";
import { FaMoneyBillWave, FaCoins } from "react-icons/fa6";
import { FcMultipleDevices } from "react-icons/fc";

const SubscriptionSummarySmall = ({ currency, totalSubscriptions, monthlyCost, yearlyCost }) => {
    return (
        <div className='subscription-summary-small App__row'>
            <div className='subscription-summary-small__item'>
                <div className='subscription-summary-small__icon'><FcMultipleDevices /></div>
                <div className='subscription-summary-small__label'>Total</div>
                <div className='subscription-summary-small__metric'>
                    <AnimatedNumber target={totalSubscriptions} />
                </div>
            </div>
            <div className='subscription-summary-small__item'>
            <div className='subscription-summary-small__icon'><FaMoneyBillWave /></div>
                <div className='subscription-summary-small__label'>Monthly Cost</div>
                <div className='subscription-summary-small__metric'>{currency}<AnimatedNumber target={monthlyCost} /></div>
            </div>
            <div className='subscription-summary-small__item'>
            <div className='subscription-summary-small__icon'><FaCoins /></div>
                <div className='subscription-summary-small__label'>Yearly Cost</div>
                <div className='subscription-summary-small__metric'>{currency}<AnimatedNumber target={yearlyCost} /></div>
            </div>
        </div>
    );
};

export default SubscriptionSummarySmall;