import Apexchart from "./ApexCharts";

const ThisMonthAnalysis = () => {
    const chartData = {
        series: [30, 25, 20, 15, 10],
        labels: ['Home', 'Food', 'Travel', 'Health', 'Insurance'],
        type: "donut",
    };

    return <>
        <Apexchart id="expense-pie"
            series={chartData.series}
            labels={chartData.labels}
            type={chartData.type}
        />
    </>
}

export default ThisMonthAnalysis;