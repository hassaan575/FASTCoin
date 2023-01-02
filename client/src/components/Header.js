import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex m-10 justify-center items-center mx-auto">
      <div className="m-3">
        <Link to="/home">
          <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
            Add Stock
          </button>
        </Link>
      </div>
      <div className="m-3">
        <Link to="/dashboard">
          <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
            Dashboard
          </button>
        </Link>
      </div>
      <div className="m-3">
        <Link to="/totalspending">
          <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
            Total Spending
          </button>
        </Link>
      </div>
      <div className="m-3">
        <Link to="/itemcount">
          <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
            Item Count
          </button>
        </Link>
      </div>
      /*<div className="m-3">
        <Link to="/iteminfo">
          <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
            Item Info
          </button>
        </Link>
      </div>*/
      <div className="m-3">
        <Link to="/stockout">
          <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
            Remove Expire Product
          </button>
        </Link>
      </div>
      <div className="m-3">
        <Link to="/totalearning">
          <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
            Total Earning
          </button>
        </Link>
      </div>
      <div className="m-3">
        <Link to="/priceEditor">
          <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
            Price Editor
          </button>
        </Link>
      </div>
      <div className="m-3">
        <Link to="/Product">
          <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
            Product
          </button>
        </Link>
      </div>
      <div className="m-3">
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
