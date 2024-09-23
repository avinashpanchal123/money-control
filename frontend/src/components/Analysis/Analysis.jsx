import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Apexchart from "./ApexCharts";
import axios from 'axios';
import SixMonthsAnalysis from "./SixMonthsAnalysis";
import ThisMonthAnalysis from "./ThisMonthAnalalysis";


const Apexcharts = () => {
    useEffect(() => {
        async function getAnalysis(params) {
           try{
            let res =  await axios.get('http://localhost:3000/analysis', {
                withCredentials : true
            });
           }catch(err){
            console.log(err);
           }
        }
        getAnalysis()
    }, [])
  
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