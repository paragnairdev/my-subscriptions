import React from 'react';
import Chart from 'react-apexcharts';

const SparklineChart = ({ data, chartType }) => {
    const chartData = {
        labels: data.map((_, index) => index.toString()), // Using index as label
        datasets: [
            {
                data: data,
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
            },
        ],
    };

    // if chartType is not set or the values are neither bar or line or area then set it to bar
    const type = chartType && ['bar', 'line', 'area'].includes(chartType) ? chartType : 'bar';

    const options = {
        chart: {
          type: 'bar',
          width: 100,
          height: 50,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '100%'
          }
        },
        labels: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ],
        xaxis: {
          crosshairs: {
            width: 1
          },
          
        },
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function(seriesName){
                return''
              }
            }
          },
          marker: {
            show: false
          }
        }
      };

    return (
        <Chart
            options={options}
            series={chartData.datasets}
            type={type}
            width={100}
            height={50}/>
    );
};

export default SparklineChart;
