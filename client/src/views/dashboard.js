import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { ethers } from "ethers";
import { Link, useNavigate } from "react-router-dom";

function Dashboard({ state }) {
  const navigate = useNavigate();
  const { accounts, contract, contract2 } = state;
  const [loader, setLoader] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const [date, setdate] = useState("");
  const [amount, setAmount] = useState("");

  const withdraw = async (e) => {
    e.preventDefault();
    console.log("in withdraw");
    let owner = await contract2.methods.returnowner().call();
    let balance = await contract2.methods.getbalance().call();
    if (balance != 0) {
      console.log("about too call");
      let response = await contract2.methods
        .withdraw(balance, String(owner))
        .send({ from: accounts[0] });
      console.log(response);
    } else {
      alert("you dont have any balance in the contract");
    }
  };

  const [datainlength, setdatainlength] = useState(0);
  const [dataoutlength, setdataoutlength] = useState(0);
  useEffect(async () => {
    setdatainlength(await contract.methods.returndatainLength(date).call());
    setdataoutlength(await contract.methods.returndataoutLength(date).call());
    let money = await contract2.methods.getbalance().call();
    //let val = ethers.utils.parseEther(money);
    setAmount(Number(money) * 0.000000000000000001);
    console.log(
      "datainlength.........",
      datainlength,
      "....dataoutlength....",
      dataoutlength
    );
  }, [date]);
  useEffect(() => {
    let temp = localStorage.getItem("admin");
    if (temp == "admin") {
      setLoader(false);
    }
  }, [localStorage.getItem("admin")]);

  const getTrasncation = async () => {
    console.log("in geting updated");
    const Translen = await contract2.methods.transLength().call();
    console.log("trans len" + Translen);
    const update = [];
    console.table("aaaaaaaaaaaaaaaaaaaaaaaaw", update);

    for (let i = Translen - 1; i >= 0; i--) {
      const temp = await contract2.methods.getAllTrasaction(i).call();
      update.push({ key: i, ...temp });
    }
    console.table("ahwejw", update);
    setTransaction(update);
  };

  useEffect(async () => {
    getTrasncation();
  }, []);

  return (
    <>
      {loader ? (
        <div>
          <h1>page not found</h1>
        </div>
      ) : (
        <div>
          <Header />
          <div>
            <div className="w-full sm:max-w-md p-5 mx-auto">
              <h2 className="mb-6 text-center text-5xl font-extrabold">
                Dashboard
              </h2>
              <form>
                <div className="mb-4">
                  <p>total amount: {amount}</p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={(e) => withdraw(e)}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
                  >
                    Get
                  </button>
                </div>
              </form>
            </div>
          </div>
          <h2 className="mb-6 text-center text-5xl font-extrabold">
            Transaction Data
          </h2>
          <div className="flexceter">
            <table>
              <thead>
                <tr style={{ border: "1px solid black" }}>
                  <th style={{ border: "1px solid black", marginLeft: "5px" }}>
                    Wallet
                  </th>
                  <th style={{ border: "1px solid black", marginLeft: "5px" }}>
                    Status
                  </th>
                  <th style={{ border: "1px solid black", marginLeft: "5px" }}>
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {transaction.map((value, index) => {
                  if (index % 2 == 0) {
                    return (
                      <tr style={{ border: "1px solid black" }}>
                        <td
                          style={{
                            border: "1px solid black",
                            marginLeft: "5px",
                          }}
                        >
                          {value.wallet}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            marginLeft: "5px",
                          }}
                        >
                          {value.status}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            marginLeft: "5px",
                          }}
                        >
                          {Number(value.value) * 0.000000000000000001}
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
                          style={{
                            border: "1px solid black",
                            marginLeft: "5px",
                          }}
                        >
                          {value.wallet}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            marginLeft: "5px",
                          }}
                        >
                          {value.status}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            marginLeft: "5px",
                          }}
                        >
                          {Number(value.value) * 0.000000000000000001}
                        </td>
                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
