import React from 'react';
import { Pie } from 'react-chartjs-2';
import { SUBSCRIPTION_TYPES_LABELS, CATEGORY_COLORS, loadCurrencySymbol } from '../../services/dataService';
import { calculateSubscriptionCost } from "../../services/statsService";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const CategoryWiseChart = ({ subscriptions, calculatePerMonth }) => {
    const categories = [...new Set(subscriptions.map(sub => sub.category))];
    const currency = loadCurrencySymbol();
    
    const categoryData = categories.map(category => {
        return subscriptions
            .filter(sub => sub.category === category)
            .reduce((acc, sub) => {
                const cost = calculateSubscriptionCost(sub, calculatePerMonth);
                return acc + cost;
            }, 0);
    });

    // normalize all the data to 2 decimal places
    categoryData.map((data, index) => categoryData[index] = Math.round(data * 100) / 100);

    const chartData = {
        labels: categories,
        datasets: [{
            label: `${calculatePerMonth ? SUBSCRIPTION_TYPES_LABELS.MONTHLY : SUBSCRIPTION_TYPES_LABELS.YEARLY} (${currency})`,
            data: categoryData,
            backgroundColor: CATEGORY_COLORS,
            borderWidth: 1
        }]
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
                formatter: function(value, context) {
                    return `${currency}${value}`;
                }
            }
        }
    };
    return <Pie data={chartData} options={options} plugins={[ChartDataLabels]}/>;
};

export default CategoryWiseChart;
