import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Marks() {
  const [marksList, setMarksList] = useState([]);
  const [marks, setMarks] = useState({
    studentEmail: '',
    subject: '',
    score: ''
  });

  useEffect(() => {
    const savedMarks = JSON.parse(localStorage.getItem('marks')) || [];
    setMarksList(savedMarks);
  }, []);

  const handleAddMarks = (e) => {
    e.preventDefault();

    const newMarks = {
      id: Date.now(),
      ...marks
    };

    const updatedMarks = [...marksList, newMarks];
    setMarksList(updatedMarks);
    localStorage.setItem('marks', JSON.stringify(updatedMarks));

    setMarks({ studentEmail: '', subject: '', score: '' });
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="p-8 w-full bg-gray-100 min-h-screen">
          <h2 className="text-4xl font-bold text-blue-700 mb-6">Manage Marks</h2>

          <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
            <h3 className="text-2xl font-semibold mb-4">Add Marks</h3>

            <form onSubmit={handleAddMarks} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="email"
                placeholder="Student Email"
                value={marks.studentEmail}
                onChange={(e) => setMarks({ ...marks, studentEmail: e.target.value })}
                className="p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                value={marks.subject}
                onChange={(e) => setMarks({ ...marks, subject: e.target.value })}
                className="p-3 border rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Score"
                value={marks.score}
                onChange={(e) => setMarks({ ...marks, score: e.target.value })}
                className="p-3 border rounded-lg"
                required
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold md:col-span-3">
                Add Marks
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Marks List</h3>

            {marksList.length === 0 ? (
              <p className="text-gray-500">No marks added yet.</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-3 text-left">Student Email</th>
                    <th className="p-3 text-left">Subject</th>
                    <th className="p-3 text-left">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {marksList.map((m) => (
                    <tr key={m.id} className="border-b">
                      <td className="p-3">{m.studentEmail}</td>
                      <td className="p-3">{m.subject}</td>
                      <td className="p-3">{m.score}</td>
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

export default Marks;