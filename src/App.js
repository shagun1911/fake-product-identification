import { ethers } from 'ethers'
import { useState, useEffect } from 'react';
import "./app.css"
function App() {
  const contractaddress = "0x8f7a3ff983293860fd099bc4342d110df7f155f9";
  const abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        }
      ],
      "name": "reportFakeProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "uploadProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        }
      ],
      "name": "isFakeProduct",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "productList",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "product_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "product_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "product_price",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isFake",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "returnitem",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "product_id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "product_name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "product_price",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isFake",
              "type": "bool"
            }
          ],
          "internalType": "struct fakeProdDetector.Product",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  const [address, setaddress] = useState("")
  const [contract, setcontract] = useState({})
  const [productname, setproductname] = useState("")
  const [price, setprice] = useState()
  const [id, setid] = useState()
  const [table, settable] = useState({})

  const connectwallet = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const _contract = new ethers.Contract(contractaddress, abi, signer);
    setcontract(_contract)
  }

  const button = async () => {
    const _address = await window.ethereum.request({
      "method": "eth_requestAccounts",
      "params": []
    });
    setaddress(_address[0]);
    console.log(table[1])
  }
  const _uploadProduct = async () => {
    await contract.uploadProduct(productname, Number(price))
  }
  const _reportfake = async () => {
    try {
      const res = await contract.returnitem(Number(id))
      settable(res)
    } 
    catch(error) {
      if(error.message.includes('Product not found')){
        alert("product not found")
      }
    }
  }

  const _reportfakeproduct = async () => {
    await contract.reportFakeProduct(Number(id))
  }
  useEffect(() => {
    connectwallet();
  }, [])


  return (
    <div className="App">
      <button type="submit" class="btn btn-primary" onClick={button}>Connect</button>
      <p>{address}</p>
      <label htmlFor="exampleInputEmail1" className="form-label">
        Name:
      </label>
      <input
        type="email"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        onChange={(e) => {
          setproductname(e.target.value)
        }}
      />
      <label htmlFor="exampleInputEmail1" className="form-label">
        Price:
      </label>
      <input
        type="email"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        onChange={(e) => {
          setprice(e.target.value)
        }}
      />
      <button type="submit" class="btn btn-primary" onClick={_uploadProduct}>Add</button>
      <br />
      <label htmlFor="exampleInputEmail1" className="form-label">
        ID:
      </label>
      <input
        type="email"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        onChange={(e) => {
          setid(e.target.value)
        }}
      />
      <button type="submit" class="btn btn-primary" onClick={_reportfake}>Show</button>
      <button type="submit" class="btn btn-primary" onClick={_reportfakeproduct}>reportfake</button>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Product name</th>
            <th scope="col">Price</th>
            <th scope="col">is Fake</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{Number(table[0])}</th>
            <td>{table[1]}</td>
            <td>{Number(table[2])}</td>
            <td>{table[3]}</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default App;