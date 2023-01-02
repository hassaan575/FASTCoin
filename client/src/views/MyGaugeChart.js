import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const BarChart = ({ data1, data2 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Data 1", "Data 2"],
        datasets: [
          {
            label: "Length",
            data: [data1, data2],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    return () => chart.destroy();
  }, [data1, data2]);

  return <canvas ref={canvasRef} />;
};
export default BarChart;
