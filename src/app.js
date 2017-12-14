// dependencies
const _ = require('lodash');
const rp = require('request-promise');
const BigNumber = require('bignumber.js');
const Web3 = require('Web3');
const Tx = require('ethereumjs-tx');
const TestRPC = require('ethereumjs-testrpc');
// define web3 host
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
};
// shorten web3.eth so we don't have to type it every time
const e = web3.eth;
// define the default 'from' account
const defaultAccount = e.defaultAccount = e.accounts[1];
// get nonce for default account
let count = e.getTransactionCount(defaultAccount);
console.log(`Transaction count for default account: ${count}`);
// eth to wei converter
const ethMultiplier = 1000000000000000000;
// set gaslimit
let gasLimit = web3.toHex(100000);
// set gas price
let gasPrice = web3.toHex(21000000000);
// import employee addresses
const addresses = require('../addresses.js');
// import keys
const keys = require('../keys.js');
// private key buffer
const privateKey = new Buffer(keys.privateKey, 'hex');
const privateKeyTest = new Buffer(keys.privateKeyTest, 'hex');
console.log(`Default account to send from: ${defaultAccount}`);
console.log(`Private key for this account: ${privateKey}`);
// define payment schedule
const interval = 10;
// call the primary function required to pay out employees at the defined interval
const payEmployees = () => {
    paymentDetails();
    clearInterval(refreshInterval);
}
const refreshInterval = setInterval(payEmployees, interval);
// build out logic for paying employees
const paymentDetails = () => {
    // etherscan call to get current ether price (etherscan)
    let priceCall = {
        uri: 'https://api.etherscan.io/api',
        qs: {
            module: 'stats',
            action: 'ethprice',
            apikey: keys.etherscanApi
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    }
    rp(priceCall)
        .then(function(res) {
            // return USD price
            const price = res.result.ethusd;
            console.log(`The current price of Ethereum in USD is $${price}`);
            // create empty arrays for employee salaries and addresses
            let salaryArr = [];
            let employeeArr = [];
            let testArr = [];
            // loop through employees
            for (let i = 0; i < addresses.length; i++) {
                // find amount in eth employee is owed based on USD salary agreement
                let salaries = Math.round(addresses[i].salary / price * ethMultiplier, 15);
                let salariesRound = new BigNumber(salaries, 10);
                // push salary into empty salary array
                salaryArr.push(salariesRound);
                console.log(`Salary amount: ${salariesRound}`);
                console.log(`Salary array: ${salaryArr}`);
                // parse employee addresses
                employees = addresses[i].address;
                // push addresses into empty array
                employeeArr.push(employees);
                // test
                console.log(`Test amount before conversion: ${addresses[i].test}`);
                let test = Math.round(addresses[i].test / price * ethMultiplier, 15);
                let testRound = new BigNumber(test, 10);
                testArr.push(testRound);
                console.log(`Test amount: ${testRound}`);
                console.log(`Test array: ${testArr}`);
            }
            // send ether function
            const sendEth = () => {
                // loop through the previously created salary array
                for (let j = 0; j < salaryArr.length; j++) {
                    console.log(`Salary amount to send: ${salaryArr[j]}`);
                    console.log(`Employee receiving: ${employeeArr[j]}`);
                    // create transaction object
                    const employeeTx = {
                        nonce: count,
                        to: employeeArr[j],
                        value: web3.toHex(salaryArr[j]),
                        gasPrice: gasPrice,
                        gasLimit: gasLimit,
                        data: ''
                    };
                    // increase nonce
                    count++;
                    // create new Tx using transaction object
                    const tx = new Tx(employeeTx);
                    // sign the transaction with private key
                    tx.sign(privateKey);
                    // serialize the transaction
                    const serializedTx = tx.serialize();
                    // sent the raw transaction
                    e.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
                        if (!err) {
                            // log the successful transaction hash for cross referencing
                            console.log(`Successful tx, here's the hash: ${hash}`);
                        } else {
                            console.log(err);
                        }
                    });
                }
            }
            // call the send eth function
            sendEth();
        })  
        .catch(function(err) {
            console.log(err);
        });
}




