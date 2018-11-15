const fs = require("fs");
const Web3 = require("web3");

let web3 = new Web3("http://localhost:8545");

const abi = JSON.parse(
  fs.readFileSync("./contract/Bank_sol_Bank.abi").toString()
);
const bytecode =
  "0x" + fs.readFileSync("./contract/Bank_sol_Bank.bin").toString();

const bank = new web3.eth.Contract(abi);

async function main() {
  let [first, ...others] = await web3.eth.getAccounts();
  bank.options.data = bytecode;
  let result = await bank
    .deploy({
      arguments: []
    })
    .send({
      from: first,
      gas: 1500000,
      gasPrice: "30000000000000"
    })
  fs.writeFileSync('./address.txt', result.options.address)
}

main();
