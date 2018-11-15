const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('../contract/Bank_sol_Bank.abi').toString())
const address = fs.readFileSync('../address.txt').toString()

let bank = new web3.eth.Contract(abi, address)

web3.eth.getAccounts().then(function (accounts) {

    // accounts[0] deposit 3 ether
    bank.methods.deposit().send({
        from: accounts[1],
        gas: 3400000,
        value: web3.utils.toWei('1', 'ether')
    })
        .on('receipt', console.log)
        .on('error', console.error)

})
