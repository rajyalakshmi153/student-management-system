import React from "react";

function Sidebar({ activeSection, setActiveSection, logout }) {
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "students", label: "Students", icon: "👨‍🎓" },
    { key: "courses", label: "Courses", icon: "📚" },
    { key: "marks", label: "Marks", icon: "📝" },
    { key: "attendance", label: "Attendance", icon: "📅" },
    { key: "reports", label: "Reports", icon: "📈" },
  ];

  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-blue-800 to-indigo-900 text-white p-6 shadow-2xl">
      <div className="mb-10 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
          alt="Admin"
          className="w-24 mx-auto mb-3"
        />
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <p className="text-blue-200 text-sm">Manage everything here</p>
      </div>

      <div className="space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveSection(item.key)}
            className={`w-full text-left px-4 py-3 rounded-2xl transition text-lg font-medium ${
              activeSection === item.key
                ? "bg-white text-blue-700 shadow-lg"
                : "hover:bg-blue-700"
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}

        <button
          onClick={logout}
          className="w-full text-left px-4 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-lg font-medium mt-8"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;