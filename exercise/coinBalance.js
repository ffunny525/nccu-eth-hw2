const fs = require("fs");
const Web3 = require("web3");

let web3 = new Web3("http://localhost:8545");

const abi = JSON.parse(
  fs.readFileSync("../contract/Bank_sol_Bank.abi").toString()
);
const address = fs.readFileSync("../address.txt").toString();

let bank = new web3.eth.Contract(abi, address);

// get account[0] coin balance
// your code

async function main() {
  let resultArray = await web3.eth.getAccounts();
//   let truly = resultArray.map((v, i) => {
//     return bank.methods.getCoinBalance().call({ from: v });
//   });
//   Promise.all(truly).then(input => {
//     console.log(input);
//   });
    let result = await bank.methods.getCoinBalance().call({ from: resultArray[0] })
    console.log(result)
}

main();
