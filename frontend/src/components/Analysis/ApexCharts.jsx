import Chart from "react-apexcharts";
const Apexchart = ({ id, labels, series, type }) => {
    const chartData = {
        options: {
            chart: {
                id: id
            }
        }

    };
    if (type == "donut") {
        chartData.options.labels = labels;
        chartData.series = series
    }
    if (type == "bar") {
        chartData.options.xaxis = {
            categories: labels
        };
        chartData.series = [
            {
                name: "series-1",
                data: series,
            }
        ]
        console.log(chartData, 'xxxx');
    }

    return <>
        <Chart
            options={chartData.options}
            type={type}
            width="500"
            series={chartData.series}
        />
    </>
}

export default Apexchart;