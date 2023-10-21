"use client";
import { useEffect } from "react"
import { Chart } from "chart.js";
function FilledLineChart() {
    useEffect(() => {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [{
                    data: [125, 130, 120, 90, 80, 70, 60, 50, 50, 70, 90, 100],
                    label: "Mental Health",
                    borderColor: "rgb(62,149,205)",
                    backgroundColor: "rgb(62,149,205,0.1)",
                }, {
                    data: [70, 90, 44, 60, 83, 90, 100, 90, 80, 93, 110, 80],
                    label: "Drug",
                    borderColor: "rgb(60,186,159)",
                    backgroundColor: "rgb(60,186,159,0.1)",
                }, {
                    data: [10, 21, 60, 44, 17, 21, 17, 44, 40, 25, 30, 40],
                    label: "Accident",
                    borderColor: "rgb(255,165,0)",
                    backgroundColor: "rgb(255,165,0,0.1)",
                }
                ]
            },
        });
    }, [])


    return (
        <>
            {/* Filled line chart */}
            <h1 className="w-[150px] mx-auto mt-10 text-xl font-semibold capitalize ">Filled line Chart</h1>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
        </>
    )
}

export default FilledLineChart;