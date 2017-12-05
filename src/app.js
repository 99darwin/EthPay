var _ = require('lodash');
var Tx = require('ethereumjs-tx');
var Web3 = require('Web3');
var TestRPC = require('ethereumjs-testrpc');
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
};
const defaultAccount = web3.eth.defaultAccount = web3.eth.accounts[0];
let count = web3.eth.getTransactionCount(defaultAccount);