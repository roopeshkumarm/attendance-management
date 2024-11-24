"use client";
import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { supabase } from "@/config/supabase";

function AttendanceGrid() {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      const { data: students, error: studentsError } = await supabase
        .from("students")
        .select("*");

      if (studentsError) {
        console.error("Error fetching students:", studentsError.message);
        return;
      }

      const { data: attendance, error: attendanceError } = await supabase
        .from("attendance")
        .select("*");

      if (attendanceError) {
        console.error("Error fetching attendance:", attendanceError.message);
        return;
      }

      const today = new Date();
      const currentDate = today.getDate(); // Get today's date (1-31)

      const formattedRowData = students.map((student) => {
        const studentAttendance = Array.from({ length: currentDate }, (_, i) => {
          const day = i + 1;
          const attendanceRecord = attendance.find(
            (record) =>
              record.s_id === student.id &&
              record.date === `2024-11-${String(day).padStart(2, "0")}`
          );
          return attendanceRecord ? true : false;
        });

        return {
          ...student,
          ...Object.fromEntries(
            studentAttendance.map((att, i) => [i + 1, att])
          ),
        };
      });

      setRowData(formattedRowData);
      console.log("Row data set:", formattedRowData);
    };

    fetchData();
  }, []);

  const colDefsMemo = useMemo(() => {
    const today = new Date();
    const currentDate = today.getDate(); // Get today's date (1-31)

    const staticCols = [
      { field: "id", headerName: "ID", pinned: "left" },
      { field: "name", headerName: "Name", pinned: "left" },
    ];

    const dayCols = Array.from({ length: currentDate }, (_, i) => ({
      field: `${i + 1}`,
      headerName: `${i + 1}`,
      cellRenderer: (params) => (params.value ? "❌" : "✔"),
      editable: true,
      width: 100,
    }));

    return [...staticCols, ...dayCols];
  }, []);

  useEffect(() => {
    setColDefs(colDefsMemo);
  }, [colDefsMemo]);

  const onCellValueChanged = async (params) => {
    const { data, colDef, newValue } = params;
    const studentId = data.id;
    const day = colDef.field;
    const date = `2024-11-${String(day).padStart(2, "0")}`;

    try {
      const { error } = await supabase
        .from("attendance")
        .upsert([
          {
            student_id: studentId,
            date,
            attendance: !!newValue,
          },
        ]);

      if (error) {
        console.error("Error updating attendance:", error.message);
      } else {
        console.log(`Attendance for student ${studentId} on day ${day} updated`);
      }

      const updatedRowData = rowData.map((row) =>
        row.id === studentId ? { ...row, [day]: !!newValue } : row
      );
      setRowData(updatedRowData);
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  return (
    <div>
      <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  );
}

export default AttendanceGrid;
