import React,{useState} from "react";
import Header from "../components/Header";
import moment from "moment";

function StockOut({state}) {
	const [stockOut, setStockOut] = useState({
		number: "",
		quantity: "",
		date: moment().format("YYYY-MM-DD"),
		status: "",
	});

	const handleChange = (e) => {
		setStockOut({
			...stockOut,
			[e.target.name]: e.target.value,
		});
	};
    

	const handleSubmit = async (e) => {
		e.preventDefault();


        const { accounts, contract } = state;
		const creationDate = moment().format("YYYY-MM-DD");
		let returnids = [];
		let returnquantity = [];
		console.log('in expirery about to call the function');
		let check1 = await contract.methods.expiray(creationDate, returnids).call();
		while(check1.ids != 'NOTHING FOUND'){
		console.log(check1.ids);
		returnids.push(check1.ids);
		returnquantity.push(check1.quantity);
		check1 = await contract.methods.expiray(creationDate,returnids).call();
		}

		console.log(returnquantity);
		console.log(returnids);
       
		await contract.methods
		.dataout(
		  creationDate.toString(),
		  'expiry',
		  returnids,
		  returnquantity,
		  
		)
		.send({ from: accounts[0] });

		
	};

	return (
		<div>
			<Header></Header>
			<div className="w-full sm:max-w-md p-5 mx-auto">
				<h2 className="mb-6 text-center text-5xl font-extrabold">Remove Expired Items</h2>
				{/* <form onSubmit={handleSubmit}> */}
					{/* <div className="mb-4">
						<label className="block mb-1">Number</label>
						<input
							id="number"
							type="text"
							name="number"
							required
                            value={stockOut.number}
							autoComplete="off"
							onChange={handleChange}
							className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
						/>
					</div> */}

					{/* <div className="mb-4 flex">
						<input type="radio" id="sold" name="status" value="sold"  onChange={handleChange} /> {" "}
						<label className="block mb-1">
							Sold
						</label>
						<br />
						  <input
							type="radio"
							id="expire"
							name="status"
							value="expired"
                            onChange={handleChange}
						/> {" "}
						<label className="block mb-1" >
							Expire
						</label>
						<br />
					</div> */}

					{/* <div className="mb-4">
						<label className="block mb-1">quantity</label>
						<input
							id="quantity"
							type="text"
							name="quantity"
							required
							autoComplete="off"
							onChange={handleChange}
							className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
						/>
					</div> */}

					<div className="mt-6">
						<button
						onClick={handleSubmit}
							type="submit"
							className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
						>
							Update
						</button>
					</div>
				{/* </form> */}
			</div>
		</div>
	);
}

export default StockOut;