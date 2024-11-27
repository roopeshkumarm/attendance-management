"use client";
import React, { useState, useEffect } from "react";
import AddNewStudent from "./_components/AddNewStudent";
import StudentListTable from "./_components/StudentListTable";
import { addStudent, getStudents, deleteStudent } from "@/lib/supabaseHelper";

function StudentPage() {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const students = await getStudents();
      setStudentList(students);
    };
    fetchData();
  }, []);

  const handleAddStudent = async (newStudent) => {
    try {
      const studentData = await addStudent(newStudent);
      alert("New student added:", studentData);

      const students = await getStudents();
      setStudentList(students);

      // setStudentList((prev) => [...prev, studentData]);

    } catch (error) {
      alert("Error adding new student:", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmDelete) {
      try {
        await deleteStudent(id);
        setStudentList((prev) => prev.filter((student) => student.id !== id));
      } catch (error) {
        alert("Error deleting student:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl flex justify-between items-center mb-6">
        Students <AddNewStudent onAddStudent={handleAddStudent} />
      </h2>
      <StudentListTable
        studentList={studentList}
        onDeleteStudent={handleDeleteStudent}
      />
    </div>
  );
}

export default StudentPage;
