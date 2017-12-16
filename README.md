# EthPay
Decentralized payroll application built on the Ethereum blockchain for quick easy payouts to employees or contractors

## How it works
Takes the Ethereum addresses for your employees and converts their salary from USD to ETH before sending payments out on the interval you set. This is all done automatically using web3js from the funded account of your choosing.

## Basic setup
This is a Node JS application so you will need to install node if you do not already have it as well as the latest version of npm. 

- Fork, download or clone the repo first.
### Install the dependencies
`npm install`
**Note: You will also need a running Ethereum node. Install `geth` before attempting to run this application**

### Employee Schema
Duplicate the `addresses.example.js` file and change it to simply `addresses.js`. Follow the schema in the file to enter your own employee information.
```
module.exports = 
    [
        {
            'name': 'employee name 1',
            'address': web3.eth.accounts[1],
            'salary': 2800
        },
        {
            'name': 'employee name 2',
            'address': web3.eth.accounts[2],
            'salary': 5000
        },
        {
            'name': 'employee name 3',
            'address': web3.eth.accounts[3],
            'salary': 3000
        }
    ] 
```

### Keys
Find the `keys.example.js` file and change it to simply `keys.js`. Enter your Etherscan API and the Private Key of the address from which payments will be sent.

### Geth Node
As previously mentioned, running this dApp requires a fully synced Geth node in order to function properly. Make sure you sync your node with the `--rpc` parameter. 
**Example:**
`geth --fast --rpc`
#### Test RPC
Alternatively you can run this using `testrpc`.
```
npm i -g testrpc
testrpc
```
You should then see a response similar to the following: 
```
EthereumJS TestRPC v6.0.3 (ganache-core: 2.0.2)

Available Accounts
==================
(0) 0x496add0bdf4a7be2017d7aa03d9c00f9368d2e76
(1) 0x4b8109b920b436a5c127322496635eb6da47b363
(2) 0x6e08c65495449e49cb8644053f13c6ca287e5b92
(3) 0xb32c62bf5e74bfd08c0ff2cc2a7abcef5487973e
(4) 0x9d69cb00c2f965ed9897c29e4f6896fc8a84bb87
(5) 0xe3c75c2221774c51692c386f4054cbf4678c5d90
(6) 0xa3a973e6468437ccd619cb1f8d2f73e95097fd98
(7) 0x46f33329bef40892161fcedac46efc1f0d058e39
(8) 0xe9f862f9768e09ab838fed71924d3e6050b2fe35
(9) 0xca6176fb015df5a06e3f09622b54323084f0522d

Private Keys
==================
(0) 5d7a146efb8da05c62ad6785a299fd63ad5e9fce23fb5b923ab6662f7c6bf1b3
(1) 8fc10a94bf45d97a0e10c85f3a6ad84f1da7555af87be5831e4716d31daeb199
(2) 89735f031039b196622836355508eefd04023827c13dcee3212b7e9b7174b4af
(3) 433613c7ae263ccde559c1911df687a0ad77bd838e898e80dd28147c486135f5
(4) 3c848853005e7863f6182c2426c6e890d8a2caa3ca39f55bc294e067d335ce71
(5) b2ac8e7cdbd131443309577f1470e2b5cb63c1dcdc2288f60a0dcf1c91bbdc51
(6) b2545d86c113890ffce24f88615ed826a169116c8e6037ee573b663c30bfc835
(7) 010734a765d790cca7cde71506f6ac702f8cf28ca5afd13547bbefefc8516d4c
(8) 8a81c1d0cfc4397c86bb96b85f94f95c515f9f01dbd7fc136477004db2897e01
(9) 72ce2bd7bd0ff8cd81fd12c3dbfc79d11813e79c06181f52b3e5e9fb2c2cc53b

HD Wallet
==================
Mnemonic:      almost already crystal divert worth dynamic sniff resist sort sock almost bachelor
Base HD Path:  m/44'/60'/0'/0/{account_index}

Listening on localhost:8545
```
You can then attach to your geth node
` geth attach http://localhost:8545 `

## Running
Once you have the above steps completed and you're ready to send you're first transaction, simply navigate to the `src` folder and run 
```
node app.js
```
