import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>TUITION</h2>

        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/students")}>Students</button>
        <button onClick={() => navigate("/payments")}>Payments</button>

        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Main Content */}
      <div className="main">{children}</div>
    </div>
  );
};

export default Layout;
