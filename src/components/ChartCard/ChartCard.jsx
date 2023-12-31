import React from 'react';
import './ChartCard.scss';
import SparklineChart from '../SparklineChart/SparklineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLineChart } from '@fortawesome/free-solid-svg-icons';
import { SUBSCRIPTION_TYPES } from '../../services/dataService';

const ChartCard = ({ label, subscriptions, type, costing }) => {
    // if type is not set or the values are neither yearly or monthly then set it to all
    const yearly = SUBSCRIPTION_TYPES.YEARLY;
    const monthly = SUBSCRIPTION_TYPES.MONTHLY;
    const subType = type && [yearly, monthly].includes(type) ? type : 'all';
    const costingType = costing && [yearly, monthly].includes(costing) ? costing : monthly;
    const annualSubscriptions = subscriptions.filter(sub => sub.type === yearly);
    const monthlySubscriptions = subscriptions.filter(sub => sub.type === yearly);

    // if the type is all then return all subscriptions
    const filteredSubscriptions = subType === 'all' ? subscriptions : subType === yearly ? annualSubscriptions : monthlySubscriptions;

    const chartData = filteredSubscriptions.map(sub => {
        let output = sub.type === yearly ? parseFloat(sub.amount) / 12 : parseFloat(sub.amount)

        // round the number to 0 decimal places
        output = Math.round(output * 100) / 100;
        return output;
    });

    const total = parseFloat(filteredSubscriptions.reduce((acc, sub) => {
        // if costing is monthly then divide yearly subscriptions by 12
        return costingType === monthly && sub.type === yearly ? parseFloat(sub.amount) / 12 : parseFloat(sub.amount);
    }, 0)).toFixed(2);
    
    const count = filteredSubscriptions.length;

    return (
        <div className='chart-card App__section'>
            <div className="chart-card__graph">
                <SparklineChart data={chartData} chartType="bar"/>
            </div>
            <div className="chart-card__details">
                <div className="chart-card__label">{label}</div>
                <div className="chart-card__total">£{total}</div>
                <div className="chart-card__count" title={`${count} subscriptions`}><FontAwesomeIcon icon={faLineChart} /> {count}</div>
            </div>
        </div>
    );
};

export default ChartCard;