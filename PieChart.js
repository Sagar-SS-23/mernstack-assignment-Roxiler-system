import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { fetchPieChart } from "../services/api";

const PieChart = ({ month }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadChartData = async () => {
      const { data } = await fetchPieChart(month);
      setChartData(data);
    };
    loadChartData();
  }, [month]);

  const labels = chartData.map((item) => item._id);
  const counts = chartData.map((item) => item.count);

  return (
    <Pie
      data={{
        labels,
        datasets: [
          {
            data: counts,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
          },
        ],
      }}
    />
  );
};

export default PieChart;
