import React from 'react';
import { Bar } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { SUBSCRIPTION_TYPES, SUBSCRIPTION_TYPES_LABELS } from '../../services/dataService';

const SubscriptionChart = ({ subscriptions, calculatePerMonth }) => {
    const yearly = SUBSCRIPTION_TYPES.YEARLY;
    const chartData = {
        labels: subscriptions.map(sub => sub.name),
        datasets: [
            {
                label: `${calculatePerMonth ? SUBSCRIPTION_TYPES_LABELS.MONTHLY : SUBSCRIPTION_TYPES_LABELS.YEARLY} Cost (£)`,
                data: subscriptions.map(sub => {
                    // if calculatePerMonth is true, then we need to calculate the monthly cost
                    return calculatePerMonth 
                        ? parseFloat(
                            sub.type === yearly ? parseFloat(sub.amount) / 12 : parseFloat(sub.amount)
                        ).toFixed(2) 
                        // otherwise, we just need to return the amount
                        : parseFloat(
                            sub.type === yearly ? parseFloat(sub.amount) : parseFloat(sub.amount) * 12
                        ).toFixed(2);
                }),
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'white' // Sets x-axis labels to white
                }
            },
            y: {
                ticks: {
                    color: 'white' // Sets y-axis labels to white
                }
            }
        },
    };

    return <Bar data={chartData} options={options}/>;
};

export default SubscriptionChart;
