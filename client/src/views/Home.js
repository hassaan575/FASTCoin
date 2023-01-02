import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import moment from "moment";
import "../style/mycss.css";
import Reader from "./Reader";
function Home({ state }) {
  const [stock, setStock] = useState({
    name: "",
    number: "",
    price: "",
    quantity: "",
    date: "",
  });
  const { accounts, contract } = state;
  const [flag, setFlag] = useState(false);
  const [barcodeData, setBarcodeData] = "";
  const [updated, setUpdated] = useState([]);
  const [value, setValue] = useState("");
  const getUpdated = async () => {
    console.log("in geting updated");
    const updatedlen = await contract.methods.returnProductIdLength().call();
    const update = [];
    for (let i = 0; i < updatedlen; i++) {
      const temp = await contract.methods.returnupdate(i).call();
      update.push({ key: i, ...temp });
    }
    console.table(update);
    setUpdated(update);
  };

  useEffect(async () => {
    getUpdated();
  }, []);

  const handleChange = (e) => {
    setStock({
      ...stock,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const creationDate = moment().format("YYYY-MM-DD");
    if (stock.quantity <= 0 || stock.price <= 0) {
      alert("quantity and price cant be -tive");
      return 0;
    }
    console.log("stock enter");
    console.log(stock);
    console.log(stock.date.toString());
    console.log(creationDate.toString());
    // const check2 = await contract.methods
    //   .checksameitemnumberin(stock.number)
    //   .call();
    await contract.methods
      .datain(
        creationDate.toString(),
        stock.name,
        stock.number,
        stock.date.toString(),
        stock.price,
        stock.quantity
      )
      .send({ from: accounts[0] });

    //assuming stock added successfully
    alert("Added successfully");
    setStock({
      name: "",
      number: "",
      price: "",
      quantity: "",
      date: "",
      creationDate: "",
    });
    getUpdated();
  };
  useEffect(() => {
    setStock({ ...stock, number: value });
    console.log("stock..........", stock);
  }, [value]);
  useEffect(() => {
    console.log("Stocks.", stock);
  }, [stock]);
  return (
    <div>
      <Header></Header>
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-6 text-center text-5xl font-extrabold">Add Stock</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              value={stock.name}
              autoComplete="off"
              onChange={handleChange}
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Number</label>
            <input
              id="number"
              type="text"
              name="number"
              required
              value={stock.number}
              autoComplete="off"
              onChange={handleChange}
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
            <button
              style={{
                borderRadius: "10px",
                border: "1px solid red",
                backgroundColor: "red",
                color: "white",
              }}
              onClick={() => {
                setFlag(true);
              }}
            >
              get barcode
            </button>
            {flag ? (
              <div>
                <Reader setValue={setValue} />
                <button
                  style={{
                    borderRadius: "10px",
                    border: "1px solid red",
                    backgroundColor: "red",
                    color: "white",
                  }}
                  onClick={() => {
                    setFlag(false);
                  }}
                >
                  close it
                </button>{" "}
              </div>
            ) : (
              <span />
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Expiry Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={stock.date}
              required
              autoComplete="off"
              onChange={handleChange}
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Price</label>
            <input
              id="price"
              type="number"
              name="price"
              value={stock.price}
              required
              autoComplete="off"
              onChange={handleChange}
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">quantity</label>
            <input
              id="quantity"
              type="number"
              name="quantity"
              value={stock.quantity}
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
              Add
            </button>
          </div>
        </form>
      </div>
      {localStorage.setItem("updated", updated)}
      <div className="flexceter">
        <table>
          <thead>
            <tr style={{ border: "1px solid black" }}>
              <th style={{ border: "1px solid black", marginLeft: "5px" }}>
                Id
              </th>
              <th style={{ border: "1px solid black", marginLeft: "5px" }}>
                Name
              </th>
              <th style={{ border: "1px solid black", marginLeft: "5px" }}>
                Quantity
              </th>
              <th style={{ border: "1px solid black", marginLeft: "5px" }}>
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {updated.map((value, index) => {
              if (index % 2 == 0) {
                return (
                  <tr style={{ border: "1px solid black" }}>
                    <td
                      style={{ border: "1px solid black", marginLeft: "5px" }}
                    >
                      {value.id}
                    </td>
                    <td
                      style={{ border: "1px solid black", marginLeft: "5px" }}
                    >
                      {value.name}
                    </td>
                    <td
                      style={{ border: "1px solid black", marginLeft: "5px" }}
                    >
                      {value.quantity}
                    </td>
                    <td
                      style={{ border: "1px solid black", marginLeft: "5px" }}
                    >
                      {value.price}
                    </td>
                  </tr>
                );
              } else
                return (
                  <tr
                    style={{
                      border: "1px solid black",
                      backgroundColor: "grey",
                    }}
                  >
                    <td
                      style={{ border: "1px solid black", marginLeft: "5px" }}
                    >
                      {value.id}
                    </td>
                    <td
                      style={{ border: "1px solid black", marginLeft: "5px" }}
                    >
                      {value.name}
                    </td>
                    <td
                      style={{ border: "1px solid black", marginLeft: "5px" }}
                    >
                      {value.quantity}
                    </td>
                    <td
                      style={{ border: "1px solid black", marginLeft: "5px" }}
                    >
                      {value.price}
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
