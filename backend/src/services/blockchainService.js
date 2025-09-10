const { ethers } = require('ethers');
const config = require('../config/config');

class BlockchainService {
    constructor() {
        this.provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
        this.wallet = new ethers.Wallet(config.privateKey, this.provider);
        this.contract = null;
        this.initContract();
    }

    initContract() {
        if (!config.contractAddress) {
            console.warn('Contract address not configured');
            return;
        }

        const contractABI = [
            "function redeemZapps(string memory zappCode, uint256 zappAmount, bytes memory signature) external",
            "function balanceOf(address owner) external view returns (uint256)",
            "function getUserZappBalance(address user) external view returns (uint256)",
            "function getUserTotalRedeemed(address user) external view returns (uint256)",
            "function calculateTokensForZapps(uint256 zappAmount) external pure returns (uint256)",
            "function getExchangeRate() external pure returns (uint256)",
            "function isZappCodeUsed(string memory zappCode) external view returns (bool)",
            "event ZappRedeemed(address indexed user, string zappCode, uint256 zappAmount, uint256 tokenAmount)"
        ];

        this.contract = new ethers.Contract(config.contractAddress, contractABI, this.wallet);
    }

    async getContractInfo() {
        if (!this.contract) {
            throw new Error('Contract not initialized');
        }

        try {
            const exchangeRate = await this.contract.getExchangeRate();
            return {
                contractAddress: config.contractAddress,
                exchangeRate: exchangeRate.toString(),
                rateDescription: '1 Zapp = 0.01 ZAPPKA tokens'
            };
        } catch (error) {
            throw new Error(`Failed to get contract info: ${error.message}`);
        }
    }

    async calculateTokensForZapps(zappAmount) {
        if (!this.contract) {
            throw new Error('Contract not initialized');
        }

        try {
            const tokenAmount = await this.contract.calculateTokensForZapps(zappAmount);
            return tokenAmount.toString();
        } catch (error) {
            throw new Error(`Failed to calculate tokens: ${error.message}`);
        }
    }

    async isZappCodeUsed(zappCode) {
        if (!this.contract) {
            throw new Error('Contract not initialized');
        }

        try {
            return await this.contract.isZappCodeUsed(zappCode);
        } catch (error) {
            throw new Error(`Failed to check Zapp code: ${error.message}`);
        }
    }

    async redeemZapps(zappCode, zappAmount, signature) {
        if (!this.contract) {
            throw new Error('Contract not initialized');
        }

        try {
            const tx = await this.contract.redeemZapps(zappCode, zappAmount, signature);
            const receipt = await tx.wait();
            return {
                txHash: receipt.transactionHash,
                blockNumber: receipt.blockNumber,
                gasUsed: receipt.gasUsed.toString()
            };
        } catch (error) {
            throw new Error(`Failed to redeem Zapps: ${error.message}`);
        }
    }

    async getUserBalances(userAddress) {
        if (!this.contract) {
            throw new Error('Contract not initialized');
        }

        try {
            const [tokenBalance, zappBalance, totalRedeemed] = await Promise.all([
                this.contract.balanceOf(userAddress),
                this.contract.getUserZappBalance(userAddress),
                this.contract.getUserTotalRedeemed(userAddress)
            ]);

            return {
                tokenBalance: tokenBalance.toString(),
                zappBalance: zappBalance.toString(),
                totalRedeemed: totalRedeemed.toString()
            };
        } catch (error) {
            throw new Error(`Failed to get user balances: ${error.message}`);
        }
    }

    async getNetworkInfo() {
        try {
            const network = await this.provider.getNetwork();
            const blockNumber = await this.provider.getBlockNumber();
            const gasPrice = await this.provider.getGasPrice();

            return {
                name: network.name,
                chainId: network.chainId,
                blockNumber,
                gasPrice: gasPrice.toString()
            };
        } catch (error) {
            throw new Error(`Failed to get network info: ${error.message}`);
        }
    }
}

module.exports = new BlockchainService();
