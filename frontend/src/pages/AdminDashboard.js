import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [marks, setMarks] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
  });

  const [courseForm, setCourseForm] = useState({
    courseName: "",
    faculty: "",
  });

  const [marksForm, setMarksForm] = useState({
    studentEmail: "",
    subject: "",
    score: "",
  });

  const [attendanceForm, setAttendanceForm] = useState({
    studentEmail: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
      navigate("/login");
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = () => {
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
    setCourses(JSON.parse(localStorage.getItem("courses")) || []);
    setMarks(JSON.parse(localStorage.getItem("marks")) || []);
    setAttendance(JSON.parse(localStorage.getItem("attendance")) || []);
  };

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const addStudent = (e) => {
    e.preventDefault();
    const alreadyExists = students.find((s) => s.email === studentForm.email);
    if (alreadyExists) return alert("Student already exists!");

    const updated = [...students, { id: Date.now(), ...studentForm }];
    localStorage.setItem("students", JSON.stringify(updated));
    setStudentForm({ name: "", email: "", password: "", course: "" });
    loadData();
    alert("Student added successfully!");
  };

  const addCourse = (e) => {
    e.preventDefault();
    const updated = [...courses, { id: Date.now(), ...courseForm }];
    localStorage.setItem("courses", JSON.stringify(updated));
    setCourseForm({ courseName: "", faculty: "" });
    loadData();
    alert("Course added successfully!");
  };

  const addMarks = (e) => {
    e.preventDefault();
    const studentExists = students.find((s) => s.email === marksForm.studentEmail);
    if (!studentExists) return alert("Student email not found!");

    const updated = [...marks, { id: Date.now(), ...marksForm }];
    localStorage.setItem("marks", JSON.stringify(updated));
    setMarksForm({ studentEmail: "", subject: "", score: "" });
    loadData();
    alert("Marks added successfully!");
  };

  const addAttendance = (e) => {
    e.preventDefault();
    const studentExists = students.find((s) => s.email === attendanceForm.studentEmail);
    if (!studentExists) return alert("Student email not found!");

    const updated = [...attendance, { id: Date.now(), ...attendanceForm }];
    localStorage.setItem("attendance", JSON.stringify(updated));
    setAttendanceForm({ studentEmail: "", date: "", status: "Present" });
    loadData();
    alert("Attendance added successfully!");
  };

  const deleteItem = (type, id) => {
    const map = {
      students,
      courses,
      marks,
      attendance,
    };
    const updated = map[type].filter((item) => item.id !== id);
    localStorage.setItem(type, JSON.stringify(updated));
    loadData();
  };

  const renderDashboard = () => (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow-lg flex flex-col lg:flex-row justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-3">Welcome Admin 👨‍💼</h2>
          <p className="text-blue-100 text-lg">
            Manage students, courses, marks and attendance in one place.
          </p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
          alt="Admin"
          className="w-52 mt-6 lg:mt-0"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Students" count={students.length} color="border-blue-500" icon="👨‍🎓" />
        <DashboardCard title="Courses" count={courses.length} color="border-green-500" icon="📚" />
        <DashboardCard title="Marks" count={marks.length} color="border-purple-500" icon="📝" />
        <DashboardCard title="Attendance" count={attendance.length} color="border-red-500" icon="📅" />
      </div>
    </>
  );

  const renderStudents = () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Add Student</h2>
        <form onSubmit={addStudent} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input className="p-3 border rounded-xl" placeholder="Name" value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} required />
          <input className="p-3 border rounded-xl" placeholder="Email" value={studentForm.email} onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })} required />
          <input className="p-3 border rounded-xl" placeholder="Password" value={studentForm.password} onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })} required />
          <input className="p-3 border rounded-xl" placeholder="Course" value={studentForm.course} onChange={(e) => setStudentForm({ ...studentForm, course: e.target.value })} required />
          <button className="md:col-span-4 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">Add Student</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">All Students</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">{s.course}</td>
                <td className="p-3">
                  <button onClick={() => deleteItem("students", s.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Add Course</h2>
        <form onSubmit={addCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="p-3 border rounded-xl" placeholder="Course Name" value={courseForm.courseName} onChange={(e) => setCourseForm({ ...courseForm, courseName: e.target.value })} required />
          <input className="p-3 border rounded-xl" placeholder="Faculty" value={courseForm.faculty} onChange={(e) => setCourseForm({ ...courseForm, faculty: e.target.value })} required />
          <button className="md:col-span-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">Add Course</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">All Courses</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-green-100">
              <th className="p-3 text-left">Course Name</th>
              <th className="p-3 text-left">Faculty</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{c.courseName}</td>
                <td className="p-3">{c.faculty}</td>
                <td className="p-3">
                  <button onClick={() => deleteItem("courses", c.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMarks = () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Add Marks</h2>
        <form onSubmit={addMarks} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input className="p-3 border rounded-xl" placeholder="Student Email" value={marksForm.studentEmail} onChange={(e) => setMarksForm({ ...marksForm, studentEmail: e.target.value })} required />
          <input className="p-3 border rounded-xl" placeholder="Subject" value={marksForm.subject} onChange={(e) => setMarksForm({ ...marksForm, subject: e.target.value })} required />
          <input className="p-3 border rounded-xl" placeholder="Score" value={marksForm.score} onChange={(e) => setMarksForm({ ...marksForm, score: e.target.value })} required />
          <button className="md:col-span-3 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700">Add Marks</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">All Marks</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-purple-100">
              <th className="p-3 text-left">Student Email</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Score</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{m.studentEmail}</td>
                <td className="p-3">{m.subject}</td>
                <td className="p-3">{m.score}</td>
                <td className="p-3">
                  <button onClick={() => deleteItem("marks", m.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Add Attendance</h2>
        <form onSubmit={addAttendance} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input className="p-3 border rounded-xl" placeholder="Student Email" value={attendanceForm.studentEmail} onChange={(e) => setAttendanceForm({ ...attendanceForm, studentEmail: e.target.value })} required />
          <input type="date" className="p-3 border rounded-xl" value={attendanceForm.date} onChange={(e) => setAttendanceForm({ ...attendanceForm, date: e.target.value })} required />
          <select className="p-3 border rounded-xl" value={attendanceForm.status} onChange={(e) => setAttendanceForm({ ...attendanceForm, status: e.target.value })}>
            <option>Present</option>
            <option>Absent</option>
          </select>
          <button className="md:col-span-3 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700">Add Attendance</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">All Attendance</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-red-100">
              <th className="p-3 text-left">Student Email</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{a.studentEmail}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">{a.status}</td>
                <td className="p-3">
                  <button onClick={() => deleteItem("attendance", a.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4727/4727424.png"
        alt="Reports"
        className="w-40 mx-auto mb-6"
      />
      <h2 className="text-3xl font-bold text-indigo-700 mb-3">Reports Section</h2>
      <p className="text-gray-600 text-lg">
        Here you can later add charts, analytics, and student performance reports.
      </p>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "students":
        return renderStudents();
      case "courses":
        return renderCourses();
      case "marks":
        return renderMarks();
      case "attendance":
        return renderAttendance();
      case "reports":
        return renderReports();
      default:
        return renderDashboard();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} logout={logout} />
        <div className="flex-1 p-8 bg-gray-100 min-h-screen">{renderSection()}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;