import { supabase } from "@/config/supabase";

export const addStudent = async (student) => {
  const { data, error } = await supabase
    .from("students")
    .insert([
      {
        name: student.name,
        year: student.year,
        dept: student.dept,
      },
    ]);

  if (error) throw new Error(error.message);
  return data;
};

export const getStudents = async () => {
  const { data, error } = await supabase.from("students").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const deleteStudent = async (id) => {
  const { data, error } = await supabase
    .from("students")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return data;
};

export const AddAttendance = async (s_id, month, date) => {
  const { data, error } = await supabase
    .from("attendance")
    .insert([
      {
        month: month,
        date: date,
        s_id: s_id,
      },
    ]);

  if (error) throw new Error(error.message);
  return data;
};

export const checkAttendanceForToday = async () => {
  const today = new Date().toISOString().split("T")[0]; 
  const { data, error } = await supabase
    .from("attendance")
    .select("a_id")
    .eq("date", today);

  if (error) {
    console.error("Error checking attendance for today:", error);
    return false;
  }

  return data.length > 0;
};
