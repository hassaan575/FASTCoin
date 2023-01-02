import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login({ state, setLogin }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
    console.log("login handle change");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { accounts, contract } = state;

    const count = await contract.methods.getlengthuser().call();
    console.log("login");
    const response = await contract.methods
      .login(user.email, user.password)
      .call();
    console.log(response);
    if (response.utype === "0" && response.id === "0") {
      alert("Account does not exist! create account");
    } else {
      if (response.utype === "1" && user.email == "admin@gmail.com") {
        localStorage.setItem("admin", "admin");
        localStorage.setItem("adminEmail", user.email);
        setLogin();
        navigate("/home");
      } else {
        localStorage.setItem("user", "user");
        localStorage.setItem("userEmail", user.email);
        setLogin();
        navigate("/Product");
      }
    }
  };

  return (
    <div>
      <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        <div className="w-full sm:max-w-md p-5 mx-auto">
          <h2 className="mb-12 text-center text-5xl font-extrabold">
            Supply-Chain
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="email">
                Email-Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={user.email}
                required
                autoComplete="off"
                onChange={handleChange}
                className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={user.password}
                required
                autoComplete="off"
                onChange={handleChange}
                className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              />
            </div>
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
              >
                Sign In
              </button>
            </div>
            <div className="mt-6 text-center">
              <Link to="/signup" className="underline">
                Sign up for an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
