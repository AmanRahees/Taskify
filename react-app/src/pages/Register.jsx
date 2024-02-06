import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "member",
    password: "",
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("users/register/", {
        username: formData.username,
        email: formData.email,
        role: formData.role,
        password: formData.password,
      })
      .then((res) => {
        toast.success("Account Created!");
        navigate("/login");
      })
      .catch((error) => {
        toast.error("Invalid Entry!");
      });
  };

  return (
    <div className="h-screen bg-slate-800 flex justify-center items-center text-white">
      <form
        onSubmit={handleRegisterSubmit}
        className="border hover:border-teal-500 p-5 hover:shadow-lg hover:shadow-slate-700"
      >
        <h1 className="text-center text-4xl">Register</h1>
        <div className="mt-2">
          <label className="block">Username</label>
          <input
            className="bg-transparent border-b border-white outline-none p-2 w-64 focus:border-teal-500"
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleFormChange}
          />
        </div>
        <div className="mt-2">
          <label className="block">Email</label>
          <input
            className="bg-transparent border-b border-white outline-none p-2 w-64 focus:border-teal-500"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleFormChange}
          />
        </div>
        <div className="mt-2">
          <label className="block">Password</label>
          <input
            className="bg-transparent border-b border-white outline-none p-2 w-64 focus:border-teal-500"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleFormChange}
          />
        </div>
        <button type="submit" className="w-full px-2 py-1 mt-4 bg-teal-600">
          Submit
        </button>
        <p className="text-center mt-2">
          Don't have account?{" "}
          <Link to="/login" className="text-teal-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
