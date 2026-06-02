import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Student";
import AddStudent from "./pages/AddDtudent";
import Payments from "./pages/Payment";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          }
        />

        <Route path="/students" element={<Students />} />

        <Route path="/add-student" element={<AddStudent />} />

        <Route path="/payments" element={<Payments />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;