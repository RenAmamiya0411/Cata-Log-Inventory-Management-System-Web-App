import axios from "../api/axios.js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      toast.success("Welcome Back!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
            <input className="form-inputs" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-300">Password</label>
            <input
              className="form-inputs"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full btn-primary py-2" type="submit">
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-400">
          Don't have an account?{" "}
          <Link className="text-indigo-400 hover:underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
