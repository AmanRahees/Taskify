import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

function Login() {
  let { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };
  return (
    <div className="h-screen bg-slate-800 flex justify-center items-center text-white">
      <form
        onSubmit={handleLoginSubmit}
        className="border hover:border-teal-500 p-5 hover:shadow-lg hover:shadow-slate-700"
      >
        <h1 className="text-center text-4xl">Login</h1>
        <span className="block font-bold text-red-600 text-center my-2"></span>
        <div className="mt-2">
          <label className="block">Email</label>
          <input
            className="bg-transparent border-b border-white outline-none p-2 w-64 focus:border-teal-500"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleLoginChange}
            required
          />
        </div>
        <div className="mt-2">
          <label className="block">Password</label>
          <input
            className="bg-transparent border-b border-white outline-none p-2 w-64 focus:border-teal-500"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleLoginChange}
            required
          />
        </div>
        <div>
          <button className="w-full px-2 py-1 mt-4 bg-teal-600">Submit</button>
          <p className="text-center mt-2">
            Don't have account?{" "}
            <Link to="/register" className="text-teal-500">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
