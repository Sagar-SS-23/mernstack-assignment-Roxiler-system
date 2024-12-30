import React from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Dropdown = ({ selectedMonth, onChange }) => (
  <select value={selectedMonth} onChange={(e) => onChange(e.target.value)}>
    {months.map((month, index) => (
      <option key={index} value={month}>
        {month}
      </option>
    ))}
  </select>
);

export default Dropdown;
