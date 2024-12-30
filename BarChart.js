import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fetchBarChart } from "../services/api";

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadChartData = async () => {
      const { data } = await fetchBarChart(month);
      setChartData(data);
    };
    loadChartData();
  }, [month]);

  const labels = chartData.map((item) => item.range);
  const counts = chartData.map((item) => item.count);

  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Number of Items",
            data: counts,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      }}
    />
  );
};

export default BarChart;

