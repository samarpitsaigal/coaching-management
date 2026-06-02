import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../util";

const Login = ({ setIsAuthenticated }) => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);
  //   const copyLoginInfo = { ...loginInfo };
  //   copyLoginInfo[name] = value;
  //   setLoginInfo(copyLoginInfo);
  // };

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { message, success, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("role", result.role);
        const role = localStorage.getItem("role");
        setIsAuthenticated(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!result.success) {
        handleError(result.message);
        return;
      }
      console.log(result);
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLogin} autoComplete="off">
          <div>
            <label htmlFor="email">Email</label>
            <input
              autoComplete="email"
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter Your Email..."
              value={loginInfo.email}
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
              value={loginInfo.password}
            />
          </div>
          <button type="submit">Login</button>
          <span>
            Does't have an account ? <Link to="/signup"> Signup </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
