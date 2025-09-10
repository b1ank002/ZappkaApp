// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Script, console} from "forge-std/Script.sol";
import {ZappkaToken} from "../src/ZappkaToken.sol";

/**
 * @title DeployScript
 * @dev Deployment script for ZappkaToken contract
 * @author Your Name
 */
contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("Deploying contracts with the account:", deployer);
        console.log("Account balance:", deployer.balance);

        vm.startBroadcast(deployerPrivateKey);

        ZappkaToken zappkaToken = new ZappkaToken();

        vm.stopBroadcast();

        console.log("ZappkaToken deployed to:", address(zappkaToken));
        console.log("Contract name:", zappkaToken.name());
        console.log("Contract symbol:", zappkaToken.symbol());
        console.log("Total supply:", zappkaToken.totalSupply());
        console.log("Exchange rate:", zappkaToken.getExchangeRate());
        console.log("Rate description: 1 Zapp = 0.01 ZAPPKA tokens");

        // Save contract address to file for backend
        string memory contractAddress = vm.toString(address(zappkaToken));
        vm.writeFile("contract-address.txt", contractAddress);
        console.log("Contract address saved to contract-address.txt");

        // Save deployment info
        string memory deploymentInfo = string(
            abi.encodePacked(
                "ZappkaToken Deployment Information\n",
                "================================\n",
                "Contract Address: ",
                contractAddress,
                "\n",
                "Deployer: ",
                vm.toString(deployer),
                "\n",
                "Network: ",
                vm.toString(block.chainid),
                "\n",
                "Block Number: ",
                vm.toString(block.number),
                "\n",
                "Timestamp: ",
                vm.toString(block.timestamp),
                "\n",
                "Gas Used: ",
                vm.toString(gasleft()),
                "\n"
            )
        );
        vm.writeFile("deployment-info.txt", deploymentInfo);
        console.log("Deployment info saved to deployment-info.txt");
    }
}
