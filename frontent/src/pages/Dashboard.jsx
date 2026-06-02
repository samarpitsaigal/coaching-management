import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/studentsRouter/fees")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const total = data.reduce((sum, s) => sum + s.totalFees, 0);
  const paid = data.reduce((sum, s) => sum + s.paidFees, 0);
  const pending = data.reduce((sum, s) => sum + s.pendingFees, 0);

  return (
    <Layout>

      <h2>Dashboard</h2>

      {/* Cards */}
      <div className="cards">
        <div className="card total">Total ₹ {total}</div>
        <div className="card paid">Paid ₹ {paid}</div>
        <div className="card pending">Pending ₹ {pending}</div>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Pending</th>
          </tr>
        </thead>

        <tbody>
          {data.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>{s.pendingFees}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </Layout>
  );
};

export default Dashboard