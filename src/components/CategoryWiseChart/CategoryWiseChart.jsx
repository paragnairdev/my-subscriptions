import React from 'react';
import { Pie } from 'react-chartjs-2';

const CategoryWiseChart = ({ subscriptions }) => {
    const categories = [...new Set(subscriptions.map(sub => sub.category))];
    
    const categoryData = categories.map(category => {
        return subscriptions
            .filter(sub => sub.category === category)
            .reduce((acc, sub) => {
                return acc + (sub.type === 'annually' ? parseFloat(sub.amount) / 12 : parseFloat(sub.amount));
            }, 0);
    });

    const chartData = {
        labels: categories,
        datasets: [{
            label: 'Yearly (£)',
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
