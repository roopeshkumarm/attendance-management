"use client";
import React, { useState, useEffect } from "react";
import AddNewStudent from "./_components/AddNewStudent";
import StudentListTable from "./_components/StudentListTable";
import { addStudent, getStudents, deleteStudent } from "@/lib/supabaseHelper";

function StudentPage() {
  const [studentList, setStudentList] = useState([]);

  // Fetch student data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const students = await getStudents();
      setStudentList(students);
    };
    fetchData();
  }, []);

  // Handle adding a new student
  const handleAddStudent = async (newStudent) => {
    try {
      // Add the student to the database
      const studentData = await addStudent(newStudent);
      alert("New student added:", studentData);

      // Option 1: Refetch the entire student list after adding a new student
      const students = await getStudents();
      setStudentList(students);

      // Option 2: Alternatively, you could directly add the student to the current list
      // setStudentList((prev) => [...prev, studentData]);

    } catch (error) {
      alert("Error adding new student:", error);
    }
  };

  // Handle deleting a student
  const handleDeleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmDelete) {
      try {
        // Delete the student from the database
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
