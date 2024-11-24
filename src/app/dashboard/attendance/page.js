'use client'
import React, { useState } from 'react';
import MonthSelection from '@/app/_components/MonthSelection';
import { Button } from '@/components/ui/button';
import AttendanceGrid from './_components/AttendanceGrid';

function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState(null);

  const onSearchHandler = () => {
    if (selectedMonth) {
      console.log('Selected month:', selectedMonth);
      // Additional logic for searching or fetching data goes here
    } else {
      console.log('Please select a month.');
    }
  };

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Attendance</h2>
      <div className='flex gap-5 my-5 p-5 border rounded-lg shadow-sm'>
        <div className='flex gap-2 items-center'>
          <MonthSelection onSelectMonth={setSelectedMonth} />
        </div>
        <Button onClick={onSearchHandler}>Search</Button>
      </div>
      <AttendanceGrid />
    </div>
  );
}

export default Attendance;