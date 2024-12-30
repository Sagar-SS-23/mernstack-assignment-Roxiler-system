import React, { useState } from "react";
import Dropdown from "./components/Dropdown";
import TransactionsTable from "./components/TransactionsTable";
import StatisticsBox from "./components/StatisticsBox";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

function App() {
  const [month, setMonth] = useState("March");

  return (
    <div>
      <h1>Transaction Dashboard</h1>
      <Dropdown selectedMonth={month} onChange={setMonth} />
      <StatisticsBox month={month} />
      <TransactionsTable month={month} />
      <BarChart month={month} />
      <PieChart month={month} />
    </div>
  );
}

export default App;





