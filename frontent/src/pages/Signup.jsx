import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../util";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignupInfo({...signupInfo,[e.target.name]:e.target.value})
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required");
    }

    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { message, success, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <h1>Sign up</h1>
        <form onSubmit={handleSignup} autoComplete="off">
          <div>
            <label htmlFor="name">Name</label>
            <input
              autoComplete="name"
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter Your Name..."
              value={signupInfo.name}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              autoComplete="email"
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter Your Email..."
              value={signupInfo.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              autoComplete="new-password"
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter Your Password..."
              value={signupInfo.password}
            />
          </div>
          <button type="submit">Signup</button>
          <span>
            Already have an account ? <Link to="/login"> Login </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
