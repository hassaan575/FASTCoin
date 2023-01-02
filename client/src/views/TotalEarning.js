import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

function TotalEarning({ state }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [expiryDate, setExpiryDate] = useState({
    date: "",
  });
  useEffect(() => {
    let temp = localStorage.getItem("admin");
    if (temp == "admin") {
      setLoader(false);
    }
  }, [localStorage.getItem("admin")]);
  const handleChange = (e) => {
    setExpiryDate({
      date: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { contract } = state;

    const response = await contract.methods
      .totalEarnings(expiryDate.date.toString())
      .call();

    alert(response);
  };
  return (
    <>
      {loader ? (
        <div>Page not found</div>
      ) : (
        <div>
          <Header></Header>
          <div>
            <div className="w-full sm:max-w-md p-5 mx-auto">
              <h2 className="mb-6 text-center text-5xl font-extrabold">
                Total Earning
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1">Enter Date</label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    required
                    autoComplete="off"
                    onChange={handleChange}
                    className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
                  >
                    Get
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TotalEarning;
