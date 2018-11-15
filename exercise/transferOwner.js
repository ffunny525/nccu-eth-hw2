const fs = require("fs");
const Web3 = require("web3");

let web3 = new Web3("http://localhost:8545");

const abi = JSON.parse(
  fs.readFileSync("../contract/Bank_sol_Bank.abi").toString()
);
const address = fs.readFileSync("../address.txt").toString();

let bank = new web3.eth.Contract(abi, address);

// accounts[0] transferOwner to accounts[1]
// your code

async function main() {
  let [zero, first, ...others] = await web3.eth.getAccounts();
  bank.methods
    .transferOwner(first)
    .send({ from: zero, gas: 1000000 })
    .on("receipt", console.log)
    .on("error", console.error);
}

main();
