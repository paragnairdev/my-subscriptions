import React from "react";
import { Bar } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { SUBSCRIPTION_TYPES, SUBSCRIPTION_TYPES_LABELS } from '../../services/dataService';
import { calculateSubscriptionCost } from "../../services/statsService";

const SubscriptionStackedChart = ({ subscriptions, calculatePerMonth }) => {
    const yearly = SUBSCRIPTION_TYPES.YEARLY;
    // random colours for the bars
    const colours = subscriptions.map(sub => `#${Math.floor(Math.random()*16777215).toString(16)}`);  
    const chartData = {
        labels: [calculatePerMonth ? SUBSCRIPTION_TYPES_LABELS.MONTHLY : SUBSCRIPTION_TYPES_LABELS.YEARLY],
        datasets: subscriptions.map((sub, index) => {
            return {
                label: sub.name,
                data: [calculateSubscriptionCost(sub, calculatePerMonth)],
                backgroundColor: colours[index],
                borderColor: colours[index],
                borderWidth: 1,
            }
        })
    };
    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked',
            },
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    };

    return <Bar data={chartData} options={options} />;
};

export default SubscriptionStackedChart;