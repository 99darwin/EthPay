const _ = require('lodash');
const rp = require('request-promise');
const keys = require('../keys.js');
const Web3 = require('Web3');
const Tx = require('ethereumjs-tx');
const TestRPC = require('ethereumjs-testrpc');

module.exports = {
    send: (request, response) => {
        // define web3 host
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // testrpc
        };

        // shorten web3.eth so we don't have to type it every time
        const e = web3.eth;

        // define the default 'from' account
        const defaultAccount = e.defaultAccount = e.accounts[8];

        // private key buffer
        const privateKey = new Buffer(keys.privateKey, 'hex');
        console.log(`Default account to send from: ${defaultAccount}`);
        console.log(`Private key for this account: ${privateKey}`);

        // get nonce for default account
        let count = e.getTransactionCount(defaultAccount);
        console.log(`Transaction count for default account: ${count}`);

        // eth to wei converter
        const ethMultiplier = 1000000000000000000;
        // set gaslimit
        let gasLimit = web3.toHex(210000);
        // set gas price
        let gasPrice = web3.toHex(20000000000);
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

                    // return USD price
                    price = res.result.ethusd;
                    console.log(`The current price of Ethereum in USD is $${price}`);

                    // create empty arrays for employee salaries and addresses
                    let salaryArr = [];
                    let employeeArr = [];

                    // loop through employees
                    for (let i = 0; i < request.body.length; i++) {
                        // find amount in eth employee is owed based on USD salary agreement
                        salaries = request.body[i].salary / price * ethMultiplier;

                        // push salary into empty salary array
                        salaryArr.push(salaries);

                        // parse employee addresses
                        employees = request.body[i].address;
                        // push addresses into empty array
                        employeeArr.push(employees);
                    }

                    // send ether function
                    const sendEth = () => {
                        // loop through the previously created salary array
                        for (let j = 0; j < salaryArr.length; j++) {
                            // create transaction object
                            const employeeTx = {
                                nonce: count,
                                to: employeeArr[j],
                                value: web3.toHex(salaryArr[j]),
                                gasPrice: gasPrice,
                                gasLimit: gasLimit,
                                data: 'OxO'
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
                    response.status(200).json("Donezo");
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
        }
    }
