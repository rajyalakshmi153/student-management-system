import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    course: ''
  });

  const handleRegister = (e) => {
    e.preventDefault();

    const students = JSON.parse(localStorage.getItem('students')) || [];

    const alreadyExists = students.find(
      (student) => student.email === form.email
    );

    if (alreadyExists) {
      alert("Student already registered with this email!");
      return;
    }

    const newStudent = {
      id: Date.now(),
      ...form
    };

    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    alert("Registration successful! Please login.");
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="Student"
            className="w-20 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-blue-700">Student Register</h2>
          <p className="text-gray-500 mt-2">Create your student account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Course (Example: CSE)"
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            required
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg transition">
            Register
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;