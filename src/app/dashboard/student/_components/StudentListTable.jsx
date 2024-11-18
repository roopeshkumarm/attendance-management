"use client";
import React from 'react'; 
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function StudentListTable({ studentList, onDeleteStudent }) {
  const CustomButton = (props) => (
    <Button variant="destructive" onClick={() => onDeleteStudent(props.data.id)}>
      <Trash2 />
    </Button>
  );

  const columnDefs = [
    { field: 'id', headerName: 'ID', filter: false },
    { field: 'name', headerName: 'Name', filter: true },
    { field: 'year', headerName: 'Year', filter: true },
    { field: 'dept', headerName: 'Department', filter: true },
    { field: 'action', headerName: 'Action', cellRenderer: CustomButton },
  ];

  return (
    <div
      className="ag-theme-quartz"
      style={{ height: 500, width: '100%' }}
    >
      <AgGridReact
        rowData={studentList}
        columnDefs={columnDefs}
      />
    </div>
  );
}

export default StudentListTable;
