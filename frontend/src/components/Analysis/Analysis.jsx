import React from "react";
import Chart from "react-apexcharts";


const Apexcharts = () => {
    const chartData = {
        options: {
            chart: {
                id: "expense-pie"
            },
            labels: ['Home', 'Food', 'Travel', 'Health', 'Insurance'],
        },
        series: [30, 25, 20, 15, 10], 
    };

    return (
        <Chart
            options={chartData.options}
            type="donut"
            width="500"
            series={chartData.series}
        />
    );
};


export default Apexcharts;