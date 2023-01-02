import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import moment from "moment";
import Cart from "./cart";
import "../style/mycss.css";
import { Link, useNavigate } from "react-router-dom";

//   This example requires some changes to your config:

// const Product = [
//   {
//     id: 1,
//     name: "Earthen Bottle",
//     href: "#",
//     price: "$48",
//     quantity: "10",
//   },
//   {
//     id: 2,
//     name: "Nomad Tumbler",
//     href: "#",
//     price: "$35",
//     quantity: "10",
//   },
//   {
//     id: 3,
//     name: "Focus Paper Refill",
//     href: "#",
//     price: "$89",
//     quantity: "10",
//   },
//   {
//     id: 4,
//     name: "Machined Mechanical Pencil",
//     href: "#",
//     price: "$35",
//     quantity: "10",
//   },
//   // More products...
// ];

function Products({ state }) {
  const navigate = useNavigate();
  const { accounts, contract, contract2 } = state;
  const [loader, setLoader] = useState(true);
  const [updated, setUpdated] = useState([]);
  const [tocart, setToCart] = useState([]);
  const [list, setList] = useState([]);
  const getUpdated = async () => {
    console.log("in geting updated");
    const updatedlen = await contract.methods.returnProductIdLength().call();
    const update = [];
    for (let i = 0; i < updatedlen; i++) {
      const temp = await contract.methods.returnupdate(i).call();
      update.push({ key: i, ...temp });
    }
    // console.table(update);
    setUpdated(update);
  };
  useEffect(() => {
    let temp = localStorage.getItem("user");
    console.log("temp....", temp);
    if (temp == "user") {
      setLoader(false);
    }
  }, [localStorage.getItem("user")]);
  useEffect(async () => {
    getUpdated();
  }, []);
  const addtocart = (ids) => {
    console.log("in addto cart function");
    console.log(`the id from the parameter  ${ids}`);
    console.table(updated);
    const temparr = updated.filter((arr) => {
      if (arr.id == ids) return arr;
    });
    console.log(temparr);
    setToCart([...tocart, temparr[0]]);
    console.log(tocart.length);
    console.log(tocart);
  };
  function myOnChange(e, id, price) {
    let flag = true;
    let tempList = list;
    let obj = {};
    updated.map((val, index) => {
      if (val.id == id) {
        if (Number(val.quantity) >= e.target.value) {
          tempList.map((value, index) => {
            if (value.id == id) {
              value.quantity = Number(e.target.value);
              flag = false;
            }
          });
          if (flag) {
            obj.id = id;
            obj.price = price;
            obj.quantity = Number(e.target.value);
            tempList.push(obj);
            setList(tempList);
          }

          console.log("tempList..........", tempList);
        } else {
          alert("quantity not available");
        }
      }
    });

    console.log("obj..............", obj);
  }
  const sendmoney = async () => {
    const creationDate = moment().format("YYYY-MM-DD");
    console.log("i am in sendmoney");
    const response = await contract2.methods.getAddress().call();
    console.log(response);
    console.log(tocart);
    console.log(`length of to cart ${tocart.length}`);
    let ids = list.map((arr) => {
      return arr.id;
    });
    console.log("ids to be sold " + ids);
    let quantity = list.map((arr) => {
      return arr.quantity;
    });
    console.log("qunatity to be sold " + quantity);
    let price = list.map((arr) => {
      return arr.price * arr.quantity;
    });
    console.log(price);

    var sum = price.reduce(function (a, b) {
      return a + b;
    }, 0);

    console.log(sum);
    sum = sum.toString();
    console.log(typeof sum);
    // let params = [
    //   {
    //     from: accounts[0],
    //     to: response,
    //     gas: (6000000000000).toString(16),
    //     gasPrice: (900000000000).toString(16),
    //     value: (2000000000000000).toString(16),
    //   },
    // ];

    // let result = await window.ethereum
    //   .request({
    //     method: "eth_sendTransaction",
    //     params,
    //   })
    //   .catch((err) => console.log(err));
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(response);
    const tx = await signer.sendTransaction({
      to: response,
      value: ethers.utils.parseEther(sum),
    });
    await contract.methods
      .dataout(creationDate.toString(), "sold", ids, quantity)
      .send({ from: accounts[0] });
    getUpdated();
  };

  return (
    <>
      {loader ? (
        <div>
          <h1>page not found</h1>
        </div>
      ) : (
        <div className="bg-white flexceter flexcol">
          <div>
            <button
              style={{
                border: "red solid 1px",
                borderRadius: "15px",
                backgroundColor: "red",
                color: "white",
                padding: "10px",
                marginLeft: "1200px",
              }}
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              log out
            </button>
          </div>
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only" style={{ fontSize: "60px" }}>
              Products
            </h1>

            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              <h1>Name Price Quantity</h1>
              {updated.map((product) => (
                <a key={product.id} href={product.href} className="group">
                  {/* <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div> */}
                  <div className="flex flex-row">
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {product.name} &nbsp; &nbsp;{" "}
                    </p>

                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {product.price} &nbsp; &nbsp;
                    </p>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {product.quantity} &nbsp; &nbsp;
                    </p>
                    <div className="mgrt">
                      <input
                        style={{ border: "1px solid red" }}
                        min={1}
                        type="number"
                        onChange={(e) =>
                          myOnChange(e, product.id, product.price)
                        }
                      ></input>
                    </div>

                    {/* <div className="mt-1">
            <button
              onClick={() => addtocart(product.id)}
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
            >
              Get
            </button>
          </div> */}
                  </div>
                  <br></br>
                  <br></br>
                </a>
              ))}
            </div>
          </div>
          {/* <Cart
  contract1={contract}
  contract2={contract2}
  orderlist={tocart}
></Cart> */}
          <div className="wd30 mglf">
            <button
              onClick={sendmoney}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
            >
              Payment
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
