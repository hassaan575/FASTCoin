import React, { Component } from "react";
import DataContract from "./contracts/Data.json";
import MoneyContract from "./contracts/Money.json";
import getWeb3 from "./getWeb3";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";
import TotalSpending from "./views/TotalSpending";
import ItemCount from "./views/ItemCount";
import ItemInfo from "./views/ItemInfo";
import StockOut from "./views/StockOut";
import TotalEarning from "./views/TotalEarning";
import Product from "./views/product";
import Dashboard from "./views/dashboard";
import PriceEditor from "./views/priceEditor";
class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    contract2: null,
    isLogin: false,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DataContract.networks[networkId];
      const instance = new web3.eth.Contract(
        DataContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      const deployedNetwork2 = MoneyContract.networks[networkId];
      const instance2 = new web3.eth.Contract(
        MoneyContract.abi,
        deployedNetwork2 && deployedNetwork2.address
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3,
        accounts,
        contract: instance,
        contract2: instance2,
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  // runExample = async () => {
  // 	const { contract } = this.state;

  // 	// Get the value from the contract to prove it worked.
  // 	const response = await contract.methods.getlength().call();

  // 	// Update state with the result.
  // 	this.setState({ storageValue: response });
  // };
  // handleChange(event) {
  // 	this.setState({ [event.target.name]: event.target.value });
  // }
  // async handleSubmit(event) {
  // 	event.preventDefault();
  // 	const { accounts, contract } = this.state;

  // 	await contract.methods
  // 		.signup(this.state.email, this.state.password)
  // 		.send({ from: accounts[0] });
  // 	const response = await contract.methods.getlength().call();
  // 	this.setState({ storageValue: response });
  // }

  setLogin = () => {
    this.setState({ ...this.state, isLogin: true });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Login state={this.state} setLogin={this.setLogin} />}
          />
          <Route path="/signup" element={<Signup state={this.state} />} />
          <Route path="/home" element={<Home state={this.state} />} />
          <Route
            path="/totalspending"
            element={<TotalSpending state={this.state} />}
          />
          <Route
            path="/priceEditor"
            element={<PriceEditor state={this.state} />}
          />
          <Route path="/dashboard" element={<Dashboard state={this.state} />} />
          <Route path="/itemcount" element={<ItemCount state={this.state} />} />
          <Route path="/iteminfo" element={<ItemInfo state={this.state} />} />
          <Route path="/stockout" element={<StockOut state={this.state} />} />
          <Route
            path="/totalearning"
            element={<TotalEarning state={this.state} />}
          />

          <Route path="/Product" element={<Product state={this.state} />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
