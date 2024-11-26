import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { supabase } from "@/config/supabase";

function AttendanceGrid({ selectedMonth }) {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);

  const monthsMap = {
    1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
    7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
  };

  useEffect(() => {
    const fetchData = async () => {
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

      const formattedRowData = students.map((student) => {
        const studentAttendance = Array.from({ length: monthsMap[selectedMonth] }, (_, i) => {
          const day = i + 1;
          const attendanceRecord = attendance.find(
            (record) =>
              record.s_id === student.id &&
              record.date === `2024-${String(selectedMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`
          );

          // Key change: Mark with cross if data is available
          return attendanceRecord ? false : null;
        });

        return {
          ...student,
          ...Object.fromEntries(
            studentAttendance.map((att, i) => [i + 1, att])
          ),
        };
      });

      setRowData(formattedRowData);
    };

    fetchData();
  }, [selectedMonth]);

  const colDefsMemo = useMemo(() => {
    const staticCols = [
      { field: "id", headerName: "ID", pinned: "left" },
      { field: "name", headerName: "Name", pinned: "left" },
    ];

    const M = new Date().getMonth() + 1;
    const d = new Date().getDate();
    let S;
    if(M > selectedMonth) S = monthsMap[selectedMonth];
    else if(M === selectedMonth) S = d;
    else S = 0;
    const dayCols = Array.from({ length: S }, (_, i) => ({
      field: `${i + 1}`,
      headerName: `${i + 1}`,
      cellRenderer: (params) => {
        if (params.value === null) {
          return '✔'; // Empty cell for no data
        }
        return params.value === false ? "❌" : "✔"; // ❌ for data present, ✔ for no data
      },
      editable: true,
      width: 100,
    }));

    return [...staticCols, ...dayCols];
  }, [selectedMonth]);

  useEffect(() => {
    setColDefs(colDefsMemo);
  }, [colDefsMemo]);

  const onCellValueChanged = async (params) => {
    const { data, colDef, newValue } = params;
    const studentId = data.id;
    const day = colDef.field;
    const date = `2024-${String(selectedMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    try {
      const { error } = await supabase
        .from("attendance")
        .upsert([
          {
            student_id: studentId,
            date,
            attendance: !(newValue === false), // Invert logic for attendance
          },
        ]);

      if (error) {
        console.error("Error updating attendance:", error.message);
      }

      const updatedRowData = rowData.map((row) =>
        row.id === studentId ? { ...row, [day]: newValue } : row
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