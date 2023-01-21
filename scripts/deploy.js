const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domain');
    const domainContract = await domainContractFactory.deploy("pns");
    await domainContract.deployed();

    console.log("Contract deployed to: ",domainContract.address);

    let txn = await domainContract.register("Bitcoin",{value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain Bitcoin.pns");
    txn = await domainContract.setRecord("Bitcoin", "Am i a Bitcoin or a pns");
    await txn.wait();
    console.log("Set record for Bitcoin.pns");
    
    const address = await domainContract.getAddress("Bitcoin");
    console.log("Owner of domain Bitcoin", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(balance));
}
const runMain = async () => {
    try {
         await main();
         process.exit(0);
    } catch (error){
        console.log(error);
        process.exit(1);
    }
};
runMain();