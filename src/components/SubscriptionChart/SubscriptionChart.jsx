import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const SubscriptionChart = ({ subscriptions }) => {
    const chartData = {
        labels: subscriptions.map(sub => sub.name),
        datasets: [
            {
                label: 'Monthly Cost (£)',
                data: subscriptions.map(sub => {
                    return sub.type === 'annually' ? parseFloat(sub.amount) / 12 : parseFloat(sub.amount);
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
