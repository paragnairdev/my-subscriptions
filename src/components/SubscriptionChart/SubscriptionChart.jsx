import React from 'react';
import { Bar } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { SUBSCRIPTION_TYPES_LABELS, COLORS, loadCurrencySymbol, getChartLabelColor } from '../../services/dataService';
import { calculateSubscriptionCost } from "../../services/statsService";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const SubscriptionChart = ({ subscriptions, calculatePerMonth }) => {
    const finalData = subscriptions.map(sub => calculateSubscriptionCost(sub, calculatePerMonth));
    const currency = loadCurrencySymbol();

    // normalize all the data to 2 decimal places
    finalData.map((data, index) => finalData[index] = Math.round(data * 100) / 100);
    const chartData = {
        labels: subscriptions.map(sub => sub.name),
        datasets: [
            {
                label: `${calculatePerMonth ? SUBSCRIPTION_TYPES_LABELS.MONTHLY : SUBSCRIPTION_TYPES_LABELS.YEARLY} Cost (${currency})`,
                data: finalData,
                backgroundColor: subscriptions.map((_, index) => COLORS[index % COLORS.length]), // Assign color from array
                borderColor: subscriptions.map((_, index) => COLORS[index % COLORS.length]),
                borderWidth: 0,
            },
        ],
    };

    const labelColor = getChartLabelColor();

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: labelColor
                }
            },
            datalabels: {
                color: labelColor,
                anchor: 'end', // Position of the label
                align: 'end', // Alignment of the label
                formatter: function(value, context) {
                    return `${currency}${value}`;
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: labelColor // Sets x-axis labels to white
                }
            },
            y: {
                ticks: {
                    color: labelColor // Sets y-axis labels to white
                }
            }
        },
        indexAxis: 'y',
    };

    return <Bar data={chartData} options={options} plugins={[ChartDataLabels]}/>;
};

export default SubscriptionChart;
