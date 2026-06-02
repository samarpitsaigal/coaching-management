import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../util";

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    class: "",
    mobile: "",
    monthlyFees: "",
    admissionDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, class: studentClass, monthlyFees } = student;

    if (!name || !studentClass || !monthlyFees) {
      return handleError("Name, Class and Fees are required");
    }

    try {
      const res = await API.post("/studentsRouter/add", student);

      handleSuccess("Student Added Successfully");

      setTimeout(() => {
        navigate("/students");
      }, 1000);
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="add-student">
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          onChange={handleChange}
        />

        <input
          type="text"
          name="class"
          placeholder="Class"
          onChange={handleChange}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          onChange={handleChange}
        />

        <input
          type="number"
          name="monthlyFees"
          placeholder="Monthly Fees"
          onChange={handleChange}
        />
        <input type="date" name="admissionDate" onChange={handleChange} />

        <button type="submit">Add Student</button>
        <button type="button" onClick={() => navigate("/students")}>
          Students
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default AddStudent;
