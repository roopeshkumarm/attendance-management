'use client'
import React from "react";

function Record({ attendees, handleAttendanceChange, attendanceLocked }) {
  return (
    <div className="p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Attendance
            </th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <tr key={attendee.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{attendee.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={attendee.isPresent}
                  disabled={attendanceLocked} 
                  onChange={() => handleAttendanceChange(attendee.id)} 
                  className={`form-checkbox h-5 w-5 text-green-500 ${
                    attendanceLocked ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}

export default Record;
