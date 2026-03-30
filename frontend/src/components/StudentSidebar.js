import React from "react";

function StudentSidebar({ activeSection, setActiveSection, logout }) {
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "🏠" },
    { key: "profile", label: "My Profile", icon: "👤" },
    { key: "courses", label: "My Courses", icon: "📚" },
    { key: "marks", label: "My Marks", icon: "📝" },
    { key: "attendance", label: "My Attendance", icon: "📅" },
  ];

  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-green-700 to-emerald-900 text-white p-6 shadow-2xl">
      <div className="mb-10 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Student"
          className="w-24 mx-auto mb-3"
        />
        <h2 className="text-2xl font-bold">Student Panel</h2>
        <p className="text-green-200 text-sm">View your academic details</p>
      </div>

      <div className="space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveSection(item.key)}
            className={`w-full text-left px-4 py-3 rounded-2xl transition text-lg font-medium ${
              activeSection === item.key
                ? "bg-white text-green-700 shadow-lg"
                : "hover:bg-green-700"
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

export default StudentSidebar;