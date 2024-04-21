# Disperser

This project lets you disperse your Ether to a set of addresses provided.

## Setup
### Prerequisites
[Install Node.js](https://nodejs.org/en/download/package-manager)

### Clone and Install
```
git clone https://github.com/eviterin/Contract-Deployer.git
cd Disperser
npm install 
```

### Wallet

Add your private key to the `.env` file. 
Make sure that the wallet has at least 0.001 Eth on the chain that you will deploy on. 

## Run

```shell
npx hardhat compile
npx hardhat run scripts/showcase.js --network base-sepolia
```
Compiles `Disperser.sol` and then deploys it to the Base Sepolia chain.

The `Disperser.sol` contract can be seeded with Eth using a transfer and then the `disperseEvenly` function can be called which then disperses the funds evenly to all provided addresses.

A `Withdraw` function is also available, which refunds the contract's Ether to its deployer.

Expected output of running `showcase.js`:
```
Compiled 1 Solidity file successfully (evm target: paris).
Disperse deployed to: 0x399aA7863f0982066E5f9C2Ae1123747a57eB780
Sent 0.01 ETH to 0x399aA7863f0982066E5f9C2Ae1123747a57eB780
Balance: 0.01 ETH
Withdrew all ETH
Balance: 0.0 ETH
Sent 0.01 ETH to 0x399aA7863f0982066E5f9C2Ae1123747a57eB780
Ether dispersed evenly to 3 recipients.
Balance: 0.000000000000000001 ETH
Withdrew all ETH
Balance: 0.0 ETH
```
