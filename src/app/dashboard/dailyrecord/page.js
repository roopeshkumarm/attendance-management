'use client'; 

import React, { useState, useEffect } from "react";
import { getStudents, AddAttendance, checkAttendanceForToday } from "@/lib/supabaseHelper";
import Record from "@/app/dashboard/dailyrecord/_components/record";
import { Button } from "@/components/ui/button";

function DailyRecord() {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendanceLocked, setAttendanceLocked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const isLocked = await checkAttendanceForToday();
      setAttendanceLocked(isLocked);

      if (!isLocked) {
        try {
          const students = await getStudents();
          const formattedStudents = students.map((student) => ({
            id: student.id,
            name: student.name,
            isPresent: false,
          }));
          setAttendees(formattedStudents);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    const currentDate = new Date();
    const today = currentDate.toISOString().split("T")[0];
    const month = currentDate.getMonth() + 1;

    const absentStudents = attendees.filter((attendee) => !attendee.isPresent);

    try {
      for (const student of absentStudents) {
        await AddAttendance(student.id, month, today);
      }
      setAttendanceLocked(true);
      console.log("Attendance updated and locked for today.");
    } catch (error) {
      console.error("Error updating attendance:", error.message);
    }
  };

  const handleAttendanceChange = (id) => {
    setAttendees((prevAttendees) =>
      prevAttendees.map((attendee) =>
        attendee.id === id
          ? { ...attendee, isPresent: !attendee.isPresent }
          : attendee
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Daily Record ({new Date().toLocaleDateString()})
        </h2>
        <Button onClick={handleUpdate} disabled={attendanceLocked}>
          {attendanceLocked ? "Attendance Submitted" : "Submit"}
        </Button>
      </div>
      <Record
        attendees={attendees}
        handleAttendanceChange={handleAttendanceChange}
        attendanceLocked={attendanceLocked}
      />
    </div>
  );
}

export default DailyRecord;
