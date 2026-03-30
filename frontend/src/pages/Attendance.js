import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Attendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [attendance, setAttendance] = useState({
    studentEmail: '',
    date: '',
    status: ''
  });

  useEffect(() => {
    const savedAttendance = JSON.parse(localStorage.getItem('attendance')) || [];
    setAttendanceList(savedAttendance);
  }, []);

  const handleAddAttendance = (e) => {
    e.preventDefault();

    const newAttendance = {
      id: Date.now(),
      ...attendance
    };

    const updatedAttendance = [...attendanceList, newAttendance];
    setAttendanceList(updatedAttendance);
    localStorage.setItem('attendance', JSON.stringify(updatedAttendance));

    setAttendance({ studentEmail: '', date: '', status: '' });
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="p-8 w-full bg-gray-100 min-h-screen">
          <h2 className="text-4xl font-bold text-blue-700 mb-6">Manage Attendance</h2>

          <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
            <h3 className="text-2xl font-semibold mb-4">Add Attendance</h3>

            <form onSubmit={handleAddAttendance} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="email"
                placeholder="Student Email"
                value={attendance.studentEmail}
                onChange={(e) => setAttendance({ ...attendance, studentEmail: e.target.value })}
                className="p-3 border rounded-lg"
                required
              />
              <input
                type="date"
                value={attendance.date}
                onChange={(e) => setAttendance({ ...attendance, date: e.target.value })}
                className="p-3 border rounded-lg"
                required
              />
              <select
                value={attendance.status}
                onChange={(e) => setAttendance({ ...attendance, status: e.target.value })}
                className="p-3 border rounded-lg"
                required
              >
                <option value="">Select Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold md:col-span-3">
                Add Attendance
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Attendance List</h3>

            {attendanceList.length === 0 ? (
              <p className="text-gray-500">No attendance added yet.</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-3 text-left">Student Email</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceList.map((a) => (
                    <tr key={a.id} className="border-b">
                      <td className="p-3">{a.studentEmail}</td>
                      <td className="p-3">{a.date}</td>
                      <td className="p-3">{a.status}</td>
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

export default Attendance;