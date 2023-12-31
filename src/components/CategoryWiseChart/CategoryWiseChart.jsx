import React from 'react';
import { Pie } from 'react-chartjs-2';
import { SUBSCRIPTION_TYPES_LABELS } from '../../services/dataService';
import { calculateSubscriptionCost } from "../../services/statsService";

const CategoryWiseChart = ({ subscriptions, calculatePerMonth }) => {
    const categories = [...new Set(subscriptions.map(sub => sub.category))];
    
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
            label: `${calculatePerMonth ? SUBSCRIPTION_TYPES_LABELS.MONTHLY : SUBSCRIPTION_TYPES_LABELS.YEARLY} (£)`,
            data: categoryData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderWidth: 1
        }]
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        }
    };
    return <Pie data={chartData} options={options} />;
};

export default CategoryWiseChart;
