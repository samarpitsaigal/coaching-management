import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { handleError, handleSuccess } from "../util";
import "../styles/Students.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const [filterData, setFilterData] = useState([]);

  const role = localStorage.getItem("role");


  //delete
const deleteStudent = async (id) => {
  try {
    const res = await API.delete(`/studentsRouter/delete/${id}`);

    if (res.data.success) {
      setStudents(students.filter((s) => s._id !== id));
      alert("Student deleted successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

  const searchStudent = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilterData(students);
      return;
    }

    const filter = students.filter((s) =>
      s.name.toLowerCase().includes(searchValue.toLowerCase()),
    );

    setFilterData(filter);
  };


  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await API.get("/studentsRouter/fees");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Layout className="students-page">
      <div className="header">
        <h2>Students</h2>
        {role === "admin" && (
          <button onClick={() => navigate("/add-student")}>
            + Add Student
          </button>
        )}
        <button onClick={() => navigate("/payments")}>Payments</button>
      </div>

      <input
        type="text"
        placeholder="Search student..."
        className="search"
        onChange={searchStudent}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Total Fees</th>
            <th>Paid Fees</th>
            <th>Pending Fees</th>
            <th>Admission Date</th>
            {
              role === "admin" && (
                <th>Action</th>
              )
            }
          </tr>
        </thead>

        <tbody>
          {(filterData.length ? filterData : students).map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>₹ {s.totalFees}</td>
              <td style={{ color: "green" }}>₹ {s.paidFees}</td>
              <td style={{ color: "red" }}>₹ {s.pendingFees}</td>
              <td>{new Date(s.admissionDate).toLocaleDateString()}</td>
              <td>
                {role === "admin" && (
                  <button onClick={() => deleteStudent(s._id)}>Delete</button>
                ) }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Students;
