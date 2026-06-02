import { useEffect, useState } from "react";
import API from "../services/api";
import { handleError, handleSuccess } from "../util";
import "../styles/Payment.css";

import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Payments = () => {
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: "",
    month: "",
    amount: "",
  });

  const role = localStorage.getItem("role");

  //delete payment
  const deletePayment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payment?"))
      return;

    try {
      await API.delete(`/paymentRouter/delete/${id}`);

      handleSuccess("Payment Deleted Successfully");

      fetchPayments();
    } catch (err) {
      handleError(err.message);
    }
  };

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await API.get("/studentsRouter");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch payments
  const fetchPayments = async () => {
    try {
      const res = await API.get("/paymentRouter");
      setPayments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchPayments();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { studentId, month, amount } = formData;

    if (!studentId || !month || !amount) {
      return handleError("All fields are required");
    }

    try {
      await API.post("/paymentRouter/add", formData);

      handleSuccess("Payment Added Successfully");

      // Reset form
      setFormData({
        studentId: "",
        month: "",
        amount: "",
      });

      // Refresh payments
      fetchPayments();
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <Layout className="payments-page">
      <h2>Payments</h2>

      {/*  ADMIN ONLY FORM */}
      {role === "admin" && (
        <form onSubmit={handleSubmit} className="payment-form">
          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="month"
            placeholder="Month (e.g. Jan)"
            value={formData.month}
            onChange={handleChange}
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
          />

          <button type="submit">Add Payment</button>
          <button type="button" onClick={() => navigate("/students")}>Students</button>
        </form>
      )}

      {/* Payments Table */}
      <table className="tab">
        <thead>
          <tr>
            <th>Student</th>
            <th>Month</th>
            <th>Amount</th>
            <th>Date</th>
            {
              role==="admin" && (
                <th>Action</th>
              )
            }
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td>{p.studentId?.name}</td>
              <td>{p.month}</td>
              <td>₹ {p.amount}</td>
              <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
              <td>
                {role === "admin" && (
                  <button onClick={() => deletePayment(p._id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Payments;
