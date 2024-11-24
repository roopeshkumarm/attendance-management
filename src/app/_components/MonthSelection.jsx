import React, { useState } from "react";

function MonthSelection({ onSelectMonth }) {
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Set the initial month to the current month

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);
    if (onSelectMonth) {
      onSelectMonth(selectedMonth); // Call parent callback with the selected month
    }
  };

  const monthsMap = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  return (
    <div>
      <select
        value={month}
        onChange={handleMonthChange}
        className="p-2 border border-gray-300 rounded-md"
      >
        {Object.keys(monthsMap).map((monthKey) => (
          <option key={monthKey} value={monthKey}>
            {monthsMap[monthKey]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MonthSelection;