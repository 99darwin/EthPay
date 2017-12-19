const rp = require('request-promise');
const _ = require('lodash');

const keys = require('../keys.js');
const addresses = require('../internal.js');

const ethMultiplier = 1000000000000000000;

const addressBalances = () => {
    let addressArr = [];
    let nameArr = [];
    let txArr = [];
    for (let i = 0; i < addresses.length; i++) { 
        addressArr.push(addresses[i].address);
        nameArr.push(addresses[i].name);
    }
    for (let j = 0; j < addressArr.length; j++) {
        let addressSearch = {
            uri: 'https://api.etherscan.io/api',
            qs: {
                module: 'account',
                action: 'balancemulti',
                address: addressArr[j],
                tag: 'latest',
                apikey: keys.etherscanApi
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        }
        let txList = {
            uri: 'http://api.etherscan.io/api',
            qs: {
                module: 'account',
                action: 'txlist',
                address: addressArr[j],
                startblock: '0',
                endblock: '99999999',
                sort: 'asc',
                apikey: keys.etherscanApi
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        }
        rp(addressSearch)
            .then(function(res) {
                const balanceToEth = res.result[0].balance / ethMultiplier;
                console.log(`${nameArr[j]}'s balance is ${balanceToEth} ETH`);
            })
            .catch(function(err) {
                if (err) throw err;
            })
        rp(txList)
            .then(function(res) {
                console.log(`List of transactions for ${nameArr[j]}: `);
                txArr.push(res.result);
                console.log(_.first(txArr));
            })
            .catch(function(err) {
                if (err) throw err;
            })
    }
}
addressBalances();