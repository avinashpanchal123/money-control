import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Apexchart from "./ApexCharts";
import SixMonthsAnalysis from "./SixMonthsAnalysis";


const Apexcharts = () => {
    const [category, setCategory] = useState([]);
    useEffect(() => {

    }, [])
    const chartData = {
        series: [30, 25, 20, 15, 10],
        labels : ['Home', 'Food', 'Travel', 'Health', 'Insurance'],
        type: "donut",
    };
    // const cpuChartData = {
    //     // series: cpuUsage.map(cpu => ({
    //     //     name: `Core ${cpuUsage.indexOf(cpu) + 1}`,
    //     //     data: [cpu.user, cpu.sys, cpu.idle, cpu.irq]
    //     // })),
    //     options: {
    //         chart: {
    //             type: 'bar',
    //             height: 350,
    //             stacked: true,
    //         },
    //         plotOptions: {
    //             bar: {
    //                 horizontal: true,
    //             },
    //         },
    //         xaxis: {
    //             categories: ['User', 'System', 'Idle', 'IRQ'],
    //         },
    //         title: {
    //             text: "CPU Usage per Core",
    //             align: 'center'
    //         },
    //     },
    // };

    
    return (
        <>
            <div className="bg-black pt-20 text-white px-8 md:px-16 lg:px-24">
                <h1 className="text-xl font-bold mb-4 pl-20 text-left">Expense Overview</h1>
                <div className="flex space-x-20">
                    <Apexchart id="expense-pie"
                    series={chartData.series}
                    labels={chartData.labels}
                    type={chartData.type}
                    />
                   <SixMonthsAnalysis/>
                </div>
               
            </div>
        </>
    );
};


export default Apexcharts;