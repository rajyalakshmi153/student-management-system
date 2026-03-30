import React from "react";

function Navbar() {
  const email = localStorage.getItem("email");

  return (
    <div className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-700">🎓 Student Management System</h1>
      <div className="text-gray-700 font-medium">
        Welcome, <span className="text-blue-600">{email}</span>
      </div>
    </div>
  );
}

export default Navbar;