import { supabase } from "@/config/supabase";

export const addStudent = async (student) => {
    const { data, error } = await supabase
      .from('students')  // Ensure this is the correct table name
      .insert([{
        name: student.name,
        year: student.year,
        dept: student.dept
      }]);
  
    if (error) throw new Error(error.message);  // If error, throw it
    return data;  // Return the inserted student data (with auto-generated id)
  };

export const getStudents = async() => {
    const { data, error } = await supabase
        .from("students")
        .select("*");
    if (error) throw new Error(error.message);
    return data;
}

export const  deleteStudent = async (id) => {
    const { data, error } = await supabase
      .from('students')
      .delete()
      .match({ id });
  
    if (error) throw new Error(error.message);
    return data;
}