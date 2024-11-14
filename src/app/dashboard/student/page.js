"use client";
import React, { useState } from 'react';
import AddNewStudent from './_components/AddNewStudent';
import StudentListTable from './_components/StudentListTable';

function StudentPage() {
  const [studentList, setStudentList] = useState([]);

  const handleAddStudent = (newStudent) => {
    setStudentList((prevList) => [...prevList, { id: prevList.length + 1, ...newStudent }]);
  };

  const handleDeleteStudent = (id) => {
    setStudentList((prevList) => prevList.filter(student => student.id !== id));
  };

  return (
    <div className='p-4'>
      <h2 className='font-bold text-2xl flex justify-between items-center mb-6'>
        Students <AddNewStudent onAddStudent={handleAddStudent} />
      </h2>
      <StudentListTable studentList={studentList} onDeleteStudent={handleDeleteStudent} />
    </div>
  );
}

export default StudentPage;
