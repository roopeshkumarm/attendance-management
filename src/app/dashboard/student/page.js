"use client"
import React from 'react';
import AddNewStudent from './_components/AddNewStudent';
import StudentListTable from './_components/StudentListTable';

function student() {

  // const [studentlist,setStudentList]=useState([]);
  return (
    <div className='p-7'>
        <h2 className='font-bold text-2xl flex justify-between items-center'>Students <AddNewStudent /></h2>
        <StudentListTable/> 
      
      </div>
      
  );
}

export default student;
