import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    // ==========================
    // ADMIN LOGIN
    // ==========================
    if (form.email === "admin@gmail.com" && form.password === "admin123") {
      localStorage.setItem("email", form.email);
      localStorage.setItem("role", "ADMIN");
      localStorage.setItem("token", "admin-token");

      alert("Admin login successful!");
      navigate("/admin");
      return;
    }

    // ==========================
    // STUDENT LOGIN
    // ==========================
    const students = JSON.parse(localStorage.getItem("students")) || [];

    const foundStudent = students.find(
      (s) => s.email === form.email && s.password === form.password
    );

    if (foundStudent) {
      localStorage.setItem("email", foundStudent.email);
      localStorage.setItem("role", "STUDENT");
      localStorage.setItem("token", "student-token");

      alert("Student login successful!");
      navigate("/student");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-50 p-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="Login"
            className="w-72 mb-6"
          />
          <h2 className="text-3xl font-bold text-blue-700 mb-2">Student Management System</h2>
          <p className="text-gray-600 text-center">
            Login to access your academic dashboard and manage student data.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-3">Login</h1>
          <p className="text-gray-500 mb-8">Enter your credentials to continue</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>

          {/* Demo Credentials */}
          <div className="mt-8 bg-gray-50 border rounded-2xl p-5">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Demo Credentials</h3>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Admin:</span> admin@gmail.com / admin123
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-semibold">Student:</span> Register first, then login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;