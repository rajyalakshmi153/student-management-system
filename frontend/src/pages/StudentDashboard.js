import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StudentSidebar from "../components/StudentSidebar";
import DashboardCard from "../components/DashboardCard";

function StudentDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  const [student, setStudent] = useState(null);
  const [myMarks, setMyMarks] = useState([]);
  const [myAttendance, setMyAttendance] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    if (role !== "STUDENT") {
      navigate("/login");
      return;
    }

    const students = JSON.parse(localStorage.getItem("students")) || [];
    const marks = JSON.parse(localStorage.getItem("marks")) || [];
    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
    const allCourses = JSON.parse(localStorage.getItem("courses")) || [];

    const currentStudent = students.find((s) => s.email === email);

    setStudent(currentStudent);
    setMyMarks(marks.filter((m) => m.studentEmail === email));
    setMyAttendance(attendance.filter((a) => a.studentEmail === email));
    setCourses(allCourses);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderSection = () => {
    if (!student) return <p>Loading...</p>;

    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-3xl p-8 shadow-lg flex flex-col lg:flex-row justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-3">Welcome {student.name} 👋</h2>
                <p className="text-green-100 text-lg">
                  Here you can check your profile, marks, courses and attendance.
                </p>
              </div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Student"
                className="w-52 mt-6 lg:mt-0"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard title="My Courses" count={courses.length} color="border-green-500" icon="📚" />
              <DashboardCard title="My Marks" count={myMarks.length} color="border-purple-500" icon="📝" />
              <DashboardCard title="Attendance" count={myAttendance.length} color="border-red-500" icon="📅" />
            </div>
          </>
        );

      case "profile":
        return (
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-green-700 mb-6">My Profile</h2>
            <div className="space-y-4 text-lg">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Course:</strong> {student.course}</p>
            </div>
          </div>
        );

      case "courses":
        return (
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-green-700 mb-6">My Courses</h2>
            <table className="w-full">
              <thead>
                <tr className="bg-green-100">
                  <th className="p-3 text-left">Course Name</th>
                  <th className="p-3 text-left">Faculty</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.id} className="border-b">
                    <td className="p-3">{c.courseName}</td>
                    <td className="p-3">{c.faculty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "marks":
        return (
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-purple-700 mb-6">My Marks</h2>
            <table className="w-full">
              <thead>
                <tr className="bg-purple-100">
                  <th className="p-3 text-left">Subject</th>
                  <th className="p-3 text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {myMarks.map((m) => (
                  <tr key={m.id} className="border-b">
                    <td className="p-3">{m.subject}</td>
                    <td className="p-3">{m.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "attendance":
        return (
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-red-700 mb-6">My Attendance</h2>
            <table className="w-full">
              <thead>
                <tr className="bg-red-100">
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {myAttendance.map((a) => (
                  <tr key={a.id} className="border-b">
                    <td className="p-3">{a.date}</td>
                    <td className="p-3">{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <StudentSidebar activeSection={activeSection} setActiveSection={setActiveSection} logout={logout} />
        <div className="flex-1 p-8 bg-gray-100 min-h-screen">{renderSection()}</div>
      </div>
    </div>
  );
}

export default StudentDashboard;