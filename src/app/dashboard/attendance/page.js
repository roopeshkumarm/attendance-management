'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import AttendanceGrid from './_components/AttendanceGrid';

function Attendance() {``
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

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [searchedMonth, setSearchedMonth] = useState(null); 

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value, 10); 
    setSelectedMonth(newMonth); 
  };

  const onSearchHandler = () => {
    setSearchedMonth(selectedMonth);
  };

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Attendance</h2>
      <div className='flex gap-5 my-5 p-5 border rounded-lg shadow-sm'>
        <div className='flex gap-2 items-center'>
          <div>
            <select
              value={selectedMonth}
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
        </div>
        <Button onClick={onSearchHandler}>Search</Button>
      </div>
      {searchedMonth && (
        <AttendanceGrid selectedMonth={searchedMonth} />
      )}
    </div>
  );
}

export default Attendance;
