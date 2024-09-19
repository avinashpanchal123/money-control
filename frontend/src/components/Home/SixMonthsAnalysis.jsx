import { useState, useEffect } from 'react';
import Apexchart from './ApexCharts'

const SixMonthsAnalysis = () => {
    // const [category, setCategory] = useState([]);
    useEffect(() => {

    }, [])
    const chartData = {
        series: [30, 40, 45, 100, 49, 60],
        labels: ['jan', 'feb', 'mar', 'apr', 'may','jun'],
        type: "bar",
    };
    return <>
        <Apexchart id="expense-bar"
            series={chartData.series}
            labels={chartData.labels}
            type={chartData.type}
        />
    </>

}

export default SixMonthsAnalysis