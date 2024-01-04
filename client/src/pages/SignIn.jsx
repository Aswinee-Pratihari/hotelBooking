import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
    console.log(formData);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <main>
      <h2 className="text-4xl tracking-tight font-bold ">
        Login into your Account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-md font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-500 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-md font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="mt-1 p-2 w-full border border-gray-500 rounded-md"
          />
        </div>

        <div className="bottom flex justify-between items-center">
          <span className="text-gray-500 ">
            Don't Have an Account?
            <Link to="/signUp" className="underline">
              {" "}
              Sign Up
            </Link>
          </span>

          <button
            type="submit"
            className="text-white bg-blue-800 px-3 py-2 rounded-md hover:bg-blue-600 font-semibold text-lg"
          >
            Login Into Your Account
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
