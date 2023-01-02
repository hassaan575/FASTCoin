pragma solidity 0.8.17;

//SPDX-License-Identifier: MIT

contract Data {
    //-----------------------------struct initializing
    struct stock {
        string[3] supply; // for stockin id ,name , expirydate  // for stockOut id , status, chill(doesnt matter )
        int256 price;
        int256 quantity;
    }

    struct supply {
        string id;
        string name;
        int256 price;
        int256 quantity;
    }

    struct User {
        uint256 user_Type;
        string email;
        string password;
    }
    //------------------------------------------ varaiable decleartaion
    mapping(string => stock[]) public valuesIn;
    mapping(string => stock[]) public valuesOut;
    mapping(string => supply) public updated;
    string[] public ProductId; //storing keys for updated
    string[] public datesOfDataEntry; // //storing keys for expirary

    User[] private user;

    //---------------------------------------constructor---------
    constructor() {
        user.push(User(1, "admin@gmail.com", "admin")); // store information who deployed contract
    }

    //--------------------------------------fucntions------------------

    function getlengthuser() public view returns (uint256) {
        return user.length;
    }

    function sameaccountcheck(string memory mail) public view returns (bool) {
        for (uint256 i = 0; i < user.length; i++) {
            if (
                keccak256(abi.encodePacked(user[i].email)) ==
                keccak256(abi.encodePacked(mail))
            ) {
                return true;
            }
        }
        return false;
    }

    function login(string memory mail, string memory passcode)
        public
        view
        returns (uint256 utype, uint256 id)
    {
        for (uint256 i = 0; i < getlengthuser(); i++) {
            if (
                keccak256(abi.encodePacked(user[i].email)) ==
                keccak256(abi.encodePacked(mail)) &&
                keccak256(abi.encodePacked(user[i].password)) ==
                keccak256(abi.encodePacked(passcode))
            ) {
                return (user[i].user_Type, i);
            }
        }
        return (0, 0);
    }

    function signup(
        uint256 utype,
        string memory mail,
        string memory passcode
    ) public returns (bool) {
        if (sameaccountcheck(mail) == true) {
            return false;
        }
        user.push(User(utype, mail, passcode));
        return true;
    }

    function datain(
        string memory _date,
        string memory _name,
        string memory _number,
        string memory expirydate,
        int256 _price,
        int256 quantity
    ) public returns (bool) {
        string[3] memory dummy;
        dummy = [_number, _name, expirydate];
        valuesIn[_date].push(stock(dummy, _price, quantity));
        datesOfDataEntry.push(_date); //storing the keys of data enter
        if (updated[_number].price > 0) {
            //for old product
            updated[_number].quantity = updated[_number].quantity + quantity;
            return true;
        } else {
            //for new product
            ProductId.push(_number);
            updated[_number] = supply(_number, _name, _price, quantity);
            return true;
        }
    }

    //status will be change from the front end from sold to expire
    function dataout(
        string memory _date,
        string memory _status,
        string[] memory _number,
        int256[] memory quantity
    ) public {
        for (uint256 i = 0; i < _number.length; i++) {
            if (updated[_number[i]].price > 0) {
                string[3] memory dummy;
                dummy = [_number[i], _status, "chill"];
                valuesOut[_date].push(
                    stock(dummy, updated[_number[i]].price, quantity[i])
                );
                if (updated[_number[i]].quantity < quantity[i]) {
                    updated[_number[i]].quantity = 0;
                } else {
                    updated[_number[i]].quantity =
                        updated[_number[i]].quantity -
                        quantity[i];
                }
            }
            // product doesnot exsist in update and stock In
        }
    }

    // function handelCart(string memory _date , string [] memory ids , int[] memory productQuantity) public {
    //         for(uint i = 0 ; i< ids.length ; i++)
    //         {
    //                 dataout(_date, "sold" , ids[i] ,productQuantity[i]);
    //         }

    // }

    function expiray(string memory _date, string[] memory inputID)
        public
        view
        returns (string memory ids, int256 quantity)
    {
        string memory ID;
        int256 quantityarr = 0;
        bool flag = true;
        // string [] memory ID = new string [](1);
        // int [] memory quantityarr;
        // uint index=0;
        for (uint256 i = 0; i < datesOfDataEntry.length; i++) {
            for (uint256 j = 0; j < valuesIn[datesOfDataEntry[i]].length; j++) {
                flag = true;
                if (
                    keccak256(
                        abi.encodePacked(
                            valuesIn[datesOfDataEntry[i]][j].supply[2]
                        )
                    ) == keccak256(abi.encodePacked(_date))
                ) {
                    if (inputID.length > 0) {
                        for (uint256 k = 0; k < inputID.length; k++) {
                            if (
                                keccak256(
                                    abi.encodePacked(
                                        valuesIn[datesOfDataEntry[i]][j].supply[
                                            0
                                        ]
                                    )
                                ) == keccak256(abi.encodePacked(inputID[k]))
                            ) {
                                flag = false;
                            }
                        }
                        if (flag == true) {
                            quantityarr = valuesIn[datesOfDataEntry[i]][j]
                                .quantity;
                            ID = valuesIn[datesOfDataEntry[i]][j].supply[0];
                            // quantityarr[index] = valuesIn[datesOfDataEntry[i]][j].quantity;
                            // ID[index] = valuesIn[datesOfDataEntry[i]][j].supply[0];
                            return (ID, quantityarr);
                            //                      dataout(_date,"expiray",ID[index],quantityarr[index]);
                            //index++;
                        }
                    } else {
                        quantityarr = valuesIn[datesOfDataEntry[i]][j].quantity;
                        ID = valuesIn[datesOfDataEntry[i]][j].supply[0];
                        // quantityarr[index] = valuesIn[datesOfDataEntry[i]][j].quantity;
                        // ID[index] = valuesIn[datesOfDataEntry[i]][j].supply[0];
                        return (ID, quantityarr);
                        //                      dataout(_date,"expiray",ID[index],quantityarr[index]);
                        //index++;
                    }
                }
            }
        }
        return ("NOTHING FOUND", quantityarr);
    }


    function updatePrice(int price, string memory id) public returns (bool)
    {
        updated[id].price= price;
        return true;

    }
      


    function totalSpendings(string memory date)
        public
        view
        returns (int256 spendings)
    {
        int256 spends = 0;
        for (uint256 j = 0; j < valuesIn[date].length; j++) {
            spends =
                spends +
                (valuesIn[date][j].quantity * valuesIn[date][j].price);
        }
        return spends;
    }

    function totalEarnings(string memory date)
        public
        view
        returns (int256 earning)
    {
        int256 earns = 0;
        for (uint256 j = 0; j < valuesOut[date].length; j++) {
            if (
                keccak256(abi.encodePacked(valuesOut[date][j].supply[1])) ==
                keccak256(abi.encodePacked("sold"))
            ) {
                earns =
                    earns +
                    (valuesIn[date][j].quantity * valuesIn[date][j].price);
            }
        }
        return earns;
    }

    //fucntion to return updated arr
    function returnupdate(uint256 index) public view returns (supply memory) {
        return (updated[ProductId[index]]);
    }

    function returndatain(string memory date)
        public
        view
        returns (stock[] memory)
    {
        return (valuesIn[date]);
    }

    function returndataout(string memory date)
        public
        view
        returns (stock[] memory)
    {
        return (valuesOut[date]);
    }

    function returndatainLength(string memory date)
        public
        view
        returns (uint256)
    {
        return (valuesIn[date].length);
    }

    function returndatainLengthindex(string memory date, uint256 id)
        public
        view
        returns (stock memory)
    {
        return (valuesIn[date][id]);
    }

    function returndataoutLength(string memory date)
        public
        view
        returns (uint256)
    {
        return (valuesOut[date].length);
    }

    function returnProductIdLength() public view returns (uint256) {
        return (ProductId.length);
    }

    function returnProductId() public view returns (string[] memory) {
        return (ProductId);
    }
}
