import React, { useState, useEffect, useReducer } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  searchQuery: "",
};

function reducer(givenstate, action) {
  switch (action.type) {
    case "SEARCH":
      return { ...givenstate, searchQuery: action.query };
    default:
      return givenstate;
  }
}

function PriceEditor({ state }) {
  const navigate = useNavigate();
  const { accounts, contract } = state;
  const [loader, setLoader] = useState(true);
  const [serachFlag, setserachFlag] = useState(false);
  const [updated, setUpdated] = useState([]);
  const [price, setprice] = useState(0);
  const [givenstate, dispatch] = useReducer(reducer, initialState);
  const [mainupdated, setMainupdated] = useState([]);

  function handleSearchChange(event) {
    dispatch({ type: "SEARCH", query: event.target.value });
    let temp = updated.filter((obj) => obj[1].includes(event.target.value));
    if (temp.length > 0) {
      console.log("update by temp in change price");
      setUpdated(temp);
    } else {
      console.log("update by mainupdated in change price");
      console.table(mainupdated);
      setUpdated(mainupdated);
    }
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    // Perform the search using the searchQuery value from state
  }

  useEffect(() => {
    let temp = localStorage.getItem("admin");
    if (temp == "admin") {
      setLoader(false);
    }
  }, [localStorage.getItem("admin")]);
  useEffect(() => {
    console.log("mainupdated......,", mainupdated);
  }, [mainupdated]);

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
    setMainupdated(update);
  };

  const changeprice = async (id, price) => {
    console.log("change price ");
    await contract.methods.updatePrice(price, id).send({ from: accounts[0] });
    getUpdated();
    setprice(0);
  };
  useEffect(async () => {
    getUpdated();
  }, []);
  function myChange(e, index) {
    let temp = updated;
    temp[index].price = e.target.value;
    console.log("data............", temp[index]);
    setUpdated(temp);
  }
  return (
    <>
      {loader ? (
        <div>Page not found</div>
      ) : (
        <div>
          <Header></Header>
          <div>
            <form onSubmit={handleSearchSubmit}>
              <input
                className="rounded-full bg-white-500 text-black p-2 border-rose-600 "
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  marginLeft: "500px",
                  marginRight: "10px",
                }}
                value={state.searchQuery}
                onChange={handleSearchChange}
              />
              <button
                className="rounded-full bg-red-500 text-white p-2"
                type="submit"
                style={{ borderRadius: "10px", padding: "2px" }}
              >
                Search
              </button>
            </form>
            <div className="w-full sm:max-w-md p-5 mx-auto">
              <h2 className="mb-6 text-center text-5xl font-extrabold">
                Price Editor
              </h2>
              <div className="flexceter">
                <table>
                  <thead>
                    <tr style={{ border: "1px solid black" }}>
                      <th
                        style={{ border: "1px solid black", marginLeft: "5px" }}
                      >
                        Id
                      </th>
                      <th
                        style={{ border: "1px solid black", marginLeft: "5px" }}
                      >
                        Name
                      </th>
                      <th
                        style={{ border: "1px solid black", marginLeft: "5px" }}
                      >
                        Quantity
                      </th>
                      <th
                        style={{ border: "1px solid black", marginLeft: "5px" }}
                      >
                        Price
                      </th>
                      <th
                        style={{ border: "1px solid black", marginLeft: "5px" }}
                      >
                        Edit Price
                      </th>
                      <th
                        style={{ border: "1px solid black", marginLeft: "5px" }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {updated.map((value, index) => {
                      if (index % 2 == 0) {
                        return (
                          <tr style={{ border: "1px solid black" }}>
                            <td
                              style={{
                                border: "1px solid black",
                                marginLeft: "5px",
                              }}
                            >
                              {value.id}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                marginLeft: "5px",
                              }}
                            >
                              {value.name}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                marginLeft: "5px",
                              }}
                            >
                              {value.quantity}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                marginLeft: "5px",
                              }}
                            >
                              {value.price}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                marginLeft: "5px",
                              }}
                            >
                              <input
                                type="number"
                                min={1}
                                onChange={(e) => {
                                  myChange(e, index);
                                }}
                              ></input>
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                marginLeft: "5px",
                              }}
                            >
                              <button
                                onClick={() =>
                                  changeprice(value.id, value.price)
                                }
                              >
                                edit
                              </button>
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
                              {value.id}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                marginLeft: "5px",
                              }}
                            >
                              {value.name}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                marginLeft: "5px",
                              }}
                            >
                              {value.quantity}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                marginLeft: "5px",
                              }}
                            >
                              {value.price}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                marginLeft: "5px",
                              }}
                            >
                              <input
                                type="number"
                                min={1}
                                onChange={(e) => {
                                  myChange(e, index);
                                }}
                              ></input>
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                marginLeft: "5px",
                              }}
                            >
                              <button
                                onClick={() =>
                                  changeprice(value.id, value.price)
                                }
                              >
                                edit
                              </button>
                            </td>
                          </tr>
                        );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PriceEditor;
