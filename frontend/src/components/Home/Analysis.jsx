import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Apexchart from "./ApexCharts";
import SixMonthsAnalysis from "./SixMonthsAnalysis";
import ThisMonthAnalysis from "./ThisMonthAnalalysis";


const Apexcharts = () => {
    useEffect(() => {

    }, [])
    const chartData = {
        series: [30, 25, 20, 15, 10],
        labels : ['Home', 'Food', 'Travel', 'Health', 'Insurance'],
        type: "donut",
    };
  
    return (
        <>
            <div className="min-h-screen text-white flex items-center justify-center bg-gray-800">
                <h1 className="text-xl font-bold mb-4 pl-20 text-left">Expense Overview</h1>
                <div className="flex space-x-20">
                   <ThisMonthAnalysis/>
                   <SixMonthsAnalysis/>
                </div>
               
            </div>
        </>
    );
};


export default Apexcharts;