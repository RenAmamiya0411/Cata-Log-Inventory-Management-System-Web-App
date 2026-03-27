import axios from "../api/axios.js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (password.length < 6) newErrors.password = "Password must be atleast 6 characters";
    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const { data } = await axios.post("/auth/register", { name, email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      toast.success("Account Registered");
      navigate("/");
    } catch (error) {
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-300">Name</label>
            <input className="form-inputs" type="text" value={name} onChange={e => setName(e.target.value)} />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
            <input className="form-inputs" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-300">Password</label>
            <input
              className="form-inputs"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>
          <button className="w-full btn-primary py-2" type="submit">
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <Link className="text-indigo-400 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
