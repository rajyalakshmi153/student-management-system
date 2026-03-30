import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default Layout;