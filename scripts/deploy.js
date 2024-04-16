const { ethers } = require("hardhat");

async function deploy(contractName, constructorArgs = [], deployOptions = {}) {
    try {
        const ContractFactory = await ethers.getContractFactory(contractName);
        const contract = await ContractFactory.deploy(...constructorArgs, deployOptions);
    
        await contract.waitForDeployment()  
        console.log(`${contractName} deployed to:`, await contract.getAddress());
        return contract;
    } catch (error) {
        console.error("Deployment failed: " + error);
        throw error;
    }
}

module.exports = { deploy };