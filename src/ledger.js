const rp = require('request-promise');

const keys = require('../keys.js');
const addresses = require('../addresses.js');

const ethMultiplier = 1000000000000000000;

const addressBalances = () => {
    let addressArr = [];
    let nameArr = [];
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
        rp(addressSearch)
            .then(function(res) {
                const balanceToEth = res.result[0].balance / ethMultiplier;
                console.log(`${nameArr[j]}'s balance is ${balanceToEth} ETH`);
            })
            .catch(function(err) {
                if (err) throw err;
            })
    }
}
addressBalances();