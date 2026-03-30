function Card({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 hover:scale-105 transition">
      <h3 className="text-gray-500 text-lg">{title}</h3>
      <p className="text-3xl font-bold text-indigo-600 mt-2">{value}</p>
    </div>
  );
}

export default Card;