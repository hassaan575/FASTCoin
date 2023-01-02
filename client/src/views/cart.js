import React, { useEffect, useState } from "react";

function Cart({ contract1, contract2, orderlist }) {
  const [expiryDate, setExpiryDate] = useState({
    quantity: "",
  });

  const handleChange = (e) => {
    setExpiryDate({
      quantity: e.target.value,
    });
    // const orderlist2 = orderlist.map((arr) => {
    //   if (arr.id == id) {
    //     arr.quantity = expiryDate.quantity;
    //   }
    // });
    // console.log(orderlist2);

    console.log(e.target.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-6 text-center text-5xl font-extrabold">Your Cart</h2>
        <form onSubmit={handleSubmit}>
          {orderlist.map((order12) => {
            return (
              <>
                <div key={order12.id}>
                  <div className="mb-4">
                    <label className="block mb-1">quantity</label>
                    <input
                      id={order12.id}
                      type="number"
                      name="quantity"
                      value={expiryDate.quantity}
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
                      Get
                    </button>
                  </div>
                </div>
              </>
            );
          })}
          ;
        </form>
      </div>
    </>
  );
}

export default Cart;
