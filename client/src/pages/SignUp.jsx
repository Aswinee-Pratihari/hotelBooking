import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const SignUp = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <main>
      <h2 className="text-4xl tracking-tight font-bold ">Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex justify-between sm:items-center gap-10 sm:flex-row flex-col ">
          <div className="flex-1 ">
            <label
              htmlFor="firstName"
              className="block text-md font-medium text-gray-600"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              minLength={3}
              maxLength={10}
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-500 rounded-md"
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="lastName"
              className="block text-md font-medium text-gray-600"
            >
              LastName
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              minLength={3}
              maxLength={10}
              required
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-500 rounded-md"
            />
          </div>
        </div>

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
            required
            value={formData.email}
            onChange={handleChange}
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
            required
            minLength={6}
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-500 rounded-md"
          />
        </div>

        <div className="bottom flex justify-between items-center">
          <span className="text-gray-500 ">
            Already Have an Account?
            <Link to="/signIn" className="underline">
              {" "}
              Sign In
            </Link>
          </span>

          <button
            type="submit"
            className="text-white bg-blue-800 px-3 py-2 rounded-md hover:bg-blue-600 font-semibold text-lg"
          >
            Create Account
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
