const { deploy } = require("./deploy");
const { ethers } = require("hardhat");

var contractAddress; 
var disperse;
async function main() {
    
    disperse = await deploy("Disperse");
    contractAddress = await disperse.getAddress(); 

    await sendEther(0.01);
    await getBalance();
    await withdrawAll();
    await getBalance();
    await sendEther(0.01);
    
    const recipients = [
        "0x17AC63ee40906262B4b3debD4Ed9053D430BCFC1",
        "0x0587159Fa68272EE306eF8151d8A488eBeB46244",
        "0xC16c14DFC6C15eA1325BD25419351E3269845524",
    ];
    
    await disperseEvenly(recipients);
    await getBalance();
    await withdrawAll();
    await getBalance();
}

async function sendEther(amount) {
    const [deployer] = await ethers.getSigners();
    amount = ethers.parseEther(amount.toString()); 

    const tx = await deployer.sendTransaction({
        to: contractAddress,
        value: amount
    });

    await tx.wait();

    console.log(`Sent ${ethers.formatEther(amount)} ETH to ${contractAddress}`);
}

async function disperseEvenly(recipients) {
    const [deployer] = await ethers.getSigners();

    const tx = await disperse.disperseEvenly(recipients, {
        from: deployer.address
    });

    await tx.wait();
    console.log(`Ether dispersed evenly to ${recipients.length} recipients.`);
}

async function withdrawAll() {
    const [deployer] = await ethers.getSigners();

    const tx = await disperse.withdrawAll({
        from: deployer.address
    });

    await tx.wait();

    console.log(`Withdrew all Ether`);
}

async function getBalance() {
    const res = await disperse.getBalance();
    console.log(`Balance: ${ethers.formatEther(res)} ETH`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });