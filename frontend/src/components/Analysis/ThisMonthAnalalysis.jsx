import React, { useEffect, useState } from 'react';
import Apexchart from "./ApexCharts";
import axios from 'axios'; 

const ThisMonthAnalysis = () => {
    const [chartData, setChartData] = useState({
        series: [],
        labels: [],
        type: "donut",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://money-control-1xjr.onrender.com/analysis', {
                    withCredentials: true // Ensure cookies are sent with the request
                });
                const data = response.data;

                const series = data.map(item => item.totalSpent);
                const labels = data.map(item => item.category);

                setChartData({
                    series: series,
                    labels: labels,
                    type: "donut"
                });
            } catch (error) {
                console.error("Error fetching the data", error);
            }
        };

        fetchData();
    }, []);

    return <>
        <Apexchart id="expense-pie"
            series={chartData.series}
            labels={chartData.labels}
            type={chartData.type}
        />
    </>;
};

export default ThisMonthAnalysis;
