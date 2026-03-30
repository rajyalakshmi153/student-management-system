import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({
    courseName: '',
    faculty: ''
  });

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(savedCourses);
  }, []);

  const handleAddCourse = (e) => {
    e.preventDefault();

    const newCourse = {
      id: Date.now(),
      ...course
    };

    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));

    setCourse({ courseName: '', faculty: '' });
  };

  const handleDelete = (id) => {
    const updatedCourses = courses.filter((c) => c.id !== id);
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="p-8 w-full bg-gray-100 min-h-screen">
          <h2 className="text-4xl font-bold text-blue-700 mb-6">Manage Courses</h2>

          <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
            <h3 className="text-2xl font-semibold mb-4">Add Course</h3>

            <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Course Name"
                value={course.courseName}
                onChange={(e) => setCourse({ ...course, courseName: e.target.value })}
                className="p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Faculty Name"
                value={course.faculty}
                onChange={(e) => setCourse({ ...course, faculty: e.target.value })}
                className="p-3 border rounded-lg"
                required
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold md:col-span-2">
                Add Course
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Course List</h3>

            {courses.length === 0 ? (
              <p className="text-gray-500">No courses added yet.</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-3 text-left">Course Name</th>
                    <th className="p-3 text-left">Faculty</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c.id} className="border-b">
                      <td className="p-3">{c.courseName}</td>
                      <td className="p-3">{c.faculty}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;