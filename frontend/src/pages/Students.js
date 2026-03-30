import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Students() {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    name: '',
    email: '',
    course: '',
    password: ''
  });

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(savedStudents);
  }, []);

  const handleAddStudent = (e) => {
    e.preventDefault();

    const newStudent = {
      id: Date.now(),
      ...student
    };

    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));

    setStudent({
      name: '',
      email: '',
      course: '',
      password: ''
    });
  };

  const handleDelete = (id) => {
    const updatedStudents = students.filter((s) => s.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="p-8 w-full bg-gray-100 min-h-screen">
          <h2 className="text-4xl font-bold text-blue-700 mb-6">Manage Students</h2>

          <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Add Student</h3>

            <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Student Name"
                value={student.name}
                onChange={(e) => setStudent({ ...student, name: e.target.value })}
                className="p-3 border rounded-lg"
                required
              />
              <input
                type="email"
                placeholder="Student Email"
                value={student.email}
                onChange={(e) => setStudent({ ...student, email: e.target.value })}
                className="p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Course"
                value={student.course}
                onChange={(e) => setStudent({ ...student, course: e.target.value })}
                className="p-3 border rounded-lg"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={student.password}
                onChange={(e) => setStudent({ ...student, password: e.target.value })}
                className="p-3 border rounded-lg"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold col-span-1 md:col-span-2 lg:col-span-4"
              >
                Add Student
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Student List</h3>

            {students.length === 0 ? (
              <p className="text-gray-500">No students added yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-100 text-left">
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Course</th>
                      <th className="p-3">Password</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{s.name}</td>
                        <td className="p-3">{s.email}</td>
                        <td className="p-3">{s.course}</td>
                        <td className="p-3">{s.password}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleDelete(s.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;