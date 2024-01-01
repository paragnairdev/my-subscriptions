import React from 'react';
import { Bar } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { SUBSCRIPTION_TYPES_LABELS, COLORS } from '../../services/dataService';
import { calculateSubscriptionCost } from "../../services/statsService";
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
                backgroundColor: subscriptions.map((_, index) => COLORS[index % COLORS.length]), // Assign color from array
                borderColor: subscriptions.map((_, index) => COLORS[index % COLORS.length]),
                borderWidth: 0,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            },
            datalabels: {
                color: 'white',
                anchor: 'end', // Position of the label
                align: 'end', // Alignment of the label
                formatter: function(value, context) {
                    return `£${value}`;
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
        indexAxis: 'y',
    };

    return <Bar data={chartData} options={options} plugins={[ChartDataLabels]}/>;
};

export default SubscriptionChart;
