import { useState } from "react";
import '../login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? "http://localhost:4000/api/auth/login"
        : "http://localhost:4000/api/auth/register";

      const payload = isLogin
        ? { email: user.email, password: user.password }
        : { username: user.username, email: user.email, password: user.password };

      const { data } = await axios.post(url, payload);
      setMessage(data.message || "Success!");

      if (isLogin) {
        navigate("/");
      } else {
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 style={{ color: "#012334" }}>{isLogin ? "Login to Music Streaming " : "Create an Account"}</h1>
        <form onSubmit={handleSubmit} id="registerForm">
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="username"><b>Name</b></label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your name"
                value={user.username}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="email"><b>Email</b></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password"><b>Password</b></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="cpassword"><b>Confirm Password</b></label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                placeholder="Confirm your password"
                value={user.cpassword}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {message && <p className="error-msg">{message}</p>}
          <button type="submit" className="login-btn">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p className="signup-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className="toggle-btn"
            onClick={() => setIsLogin(!isLogin)}
            style={{ marginLeft: "10px", border: "none", background: "none", color: "#0a66c2", cursor: "pointer" }}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
