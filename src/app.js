const _ = require('lodash');
const rp = require('request-promise');
const keys = require('../keys.js');
const Web3 = require('Web3');
const Tx = require('ethereumjs-tx');
const TestRPC = require('ethereumjs-testrpc');
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8546'));
    // web3.setProvider(TestRPC.provider());
};
const e = web3.eth;
const defaultAccount = e.defaultAccount = e.accounts[9];
const privateKey = new Buffer(keys.privateKey, 'hex');
console.log(`Default account to send from: ${defaultAccount}`);
console.log(`Private key for this account: ${privateKey}`);
let count = e.getTransactionCount(defaultAccount);
console.log(`Transaction count for default account: ${count}`);
const ethMultiplier = 1000000000000000000;
let gasLimit = web3.toHex(210000);
let gasPrice = web3.toHex(20000000000);
const addresses = require('../addresses.example.js');
const interval = 10;
const payEmployees = () => {
    paymentDetails();
    clearInterval(refreshInterval);
}
const refreshInterval = setInterval(payEmployees, interval);
const paymentDetails = () => {
    let price = {
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
    rp(price)
        .then(function(res) {
            price = res.result.ethusd;
            console.log(`The current price of Ethereum in USD is $${price}`);
            // console.log(`Salaries for employees are as follows: ${JSON.stringify(addresses.salary)}`);
            const sendEth = () => {
                const employeeTx0 = {
                    nonce: count,
                    to: addresses.e1.address,
                    value: web3.toHex(addresses.e1.salary / price * ethMultiplier),
                    gasPrice: gasPrice,
                    gasLimit: gasLimit,
                    data: 'OxO'
                };
                console.log(employeeTx0);
                count++;
                const tx = new Tx(employeeTx0);
                tx.sign(privateKey);
                const serializedTx = tx.serialize();
                e.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
                    if (!err) {
                        console.log(`Successful tx, here's the hash: ${hash}`);
                    } else {
                        console.log(err);
                    }
                });
            }
            sendEth();
            // const employeeTx1 = {
            //     nonce: count,
            //     to: employees.e2,
            //     value: web3.toHex(salary.e1),
            //     gasPrice: gasPrice,
            //     gasLimit: gasLimit,
            //     data: 'OxO'
            // };
            // count++;
            // const employeeTx2 = {
            //     nonce: count,
            //     to: employees.e2,
            //     value: web3.toHex(salary.e1),
            //     gasPrice: gasPrice,
            //     gasLimit: gasLimit,
            //     data: 'OxO'
            // };
            // count++;
        })  
        .catch(function(err) {
            console.log(err);
        });
    
    console.log(`Employee 1: ${addresses.e1.address}\nEmployee 2: ${addresses.e2.address}\nEmployee 3: ${addresses.e3.address}`);
}




