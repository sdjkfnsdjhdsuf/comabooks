import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { AuthService } from "generated";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await AuthService.authContollerSignIn({
        body: { login: username, password },
      });

      localStorage.setItem("token", response.accessToken);
      navigate("/forms");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(true);
    }
    setLoading(false);
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="login-form-container">
      <div className="login-title">Log In</div>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="User name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
      {loginError && (
        <div className="login-error">Вы не смогли войти, попробуйте снова!</div>
      )}
    </div>
  );
};

export default Login;
