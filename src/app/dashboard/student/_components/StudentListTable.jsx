"use client";

import React, { useState } from 'react'; 
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function StudentListTable() {
    const CustomButton=(props)=>{
        return <Button variant="destructive"><Trash2/></Button>
    }
    const [columnDefs, setColumnDefs] = useState([
        { field: 'id', filter: true },
        { field: 'name', filter: true },
        { field: 'year', filter: true }, 
        { field: 'department', filter: true },
        {field: 'action', cellRenderer:CustomButton},
    ]);

    const rowData = [
        { id: 1, name: 'John Doe', year: '3', department: 'Computer Science' },
        { id: 2, name: 'Jane Smith', year: '2', department: 'Electrical' },
        { id: 3, name: 'Alice Johnson', year: '4', department: 'Mechanical' },
        { id: 4, name: 'Bob Brown', year: '1', department: 'Civil' },
        { id: 5, name: 'Charlie Davis', year: '3', department: 'Biotechnology' },
        { id: 6, name: 'David Evans', year: '2', department: 'Physics' },
        { id: 7, name: 'Eva Garcia', year: '4', department: 'Mathematics' },
        { id: 8, name: 'Frank Harris', year: '1', department: 'Electrical' },
        { id: 9, name: 'Grace King', year: '3', department: 'Computer Science' },
        { id: 10, name: 'Henry Lee', year: '2', department: 'Mechanical' },
        { id: 11, name: 'Ivy Moore', year: '4', department: 'Computer Science' },
        { id: 12, name: 'Jack Nelson', year: '1', department: 'Civil' },
        { id: 13, name: 'Katherine O\'Brien', year: '2', department: 'Physics' },
        { id: 14, name: 'Liam Parker', year: '3', department: 'Biotechnology' },
        { id: 15, name: 'Mia Quinn', year: '4', department: 'Mathematics' },
        { id: 7, name: 'Eva Garcia', year: '4', department: 'Mathematics' },
        { id: 8, name: 'Frank Harris', year: '1', department: 'Electrical' },
        { id: 9, name: 'Grace King', year: '3', department: 'Computer Science' },
        { id: 10, name: 'Henry Lee', year: '2', department: 'Mechanical' },
        { id: 11, name: 'Ivy Moore', year: '4', department: 'Computer Science' },
        { id: 12, name: 'Jack Nelson', year: '1', department: 'Civil' },
        { id: 13, name: 'Katherine O\'Brien', year: '2', department: 'Physics' },
        { id: 14, name: 'Liam Parker', year: '3', department: 'Biotechnology' },
        { id: 15, name: 'Mia Quinn', year: '4', department: 'Mathematics' },
    ];

    return (
        <div
            className="ag-theme-quartz" 
            style={{ height: 500, width: '100%' }}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
            />
        </div>
    );
}

export default StudentListTable;
