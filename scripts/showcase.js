const { deploy } = require("./deploy");

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function main() {
    const unlockTime = Math.floor(Date.now() / 1000) + 10; 
    const deployOptions = { value: ethers.parseEther("0.001") };
    const lock = await deploy("Lock", [unlockTime], deployOptions);

    console.log("Attempting to withdraw");
    try {
        const initialWithdrawResponse = await lock.withdraw();
        await initialWithdrawResponse.wait();
        console.log("Withdraw successful (unexpectedly)");
    } catch (error) {
        console.log("Withdraw failed (expected)");
    }

    console.log("Sleeping for 15 seconds")
    await sleep(15000);

    console.log("Attempting to withdraw again")
    try {
        const withdrawResponse = await lock.withdraw();
        await withdrawResponse.wait();
        console.log("Withdraw successful (expected)");
    } catch (error) {
        console.log("Withdraw failed (unexpectedly):", error.message); 
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
