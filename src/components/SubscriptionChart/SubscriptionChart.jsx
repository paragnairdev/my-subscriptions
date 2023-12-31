import React from 'react';
import { Bar } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { SUBSCRIPTION_TYPES_LABELS } from '../../services/dataService';
import { calculateSubscriptionCost } from "../../services/statsService";

const SubscriptionChart = ({ subscriptions, calculatePerMonth }) => {
    const finalData = subscriptions.map(sub => calculateSubscriptionCost(sub, calculatePerMonth));

    // normalize all the data to 2 decimal places
    finalData.map((data, index) => finalData[index] = Math.round(data * 100) / 100);
    const chartData = {
        labels: subscriptions.map(sub => sub.name),
        datasets: [
            {
                label: `${calculatePerMonth ? SUBSCRIPTION_TYPES_LABELS.MONTHLY : SUBSCRIPTION_TYPES_LABELS.YEARLY} Cost (£)`,
                data: finalData,
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
