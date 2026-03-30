import React from "react";

function DashboardCard({ title, count, color, icon }) {
  return (
    <div className={`bg-white shadow-lg rounded-3xl p-6 hover:shadow-2xl transition transform hover:-translate-y-1 border-l-8 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
          <p className="text-4xl font-bold mt-3 text-gray-800">{count}</p>
        </div>
        <div className="text-5xl">{icon}</div>
      </div>
    </div>
  );
}

export default DashboardCard;