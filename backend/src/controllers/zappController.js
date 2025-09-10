const zappService = require('../services/zappService');
const blockchainService = require('../services/blockchainService');

class ZappController {
    async generateZappCode(req, res) {
        try {
            const { userAddress } = req.body;
            
            if (!userAddress) {
                return res.status(400).json({ 
                    success: false,
                    error: 'User address is required' 
                });
            }

            const session = zappService.createSession(userAddress);
            
            res.json({
                success: true,
                sessionId: session.id,
                zappCode: session.zappCode,
                instructions: {
                    step1: 'Open Zappka app on your phone',
                    step2: 'Go to "Przelewy i historia żappsów" (Transfers and Zapps history)',
                    step3: 'Tap "Wyślij przelew" (Send transfer)',
                    step4: `Send any amount to: ${process.env.ZAPPKA_RECEIVER_ACCOUNT}`,
                    step5: `Include this code in the description: ${session.zappCode}`,
                    step6: 'Complete the payment and return here'
                },
                zappkaAccount: process.env.ZAPPKA_RECEIVER_ACCOUNT
            });
        } catch (error) {
            console.error('Error generating Zapp code:', error);
            res.status(500).json({ 
                success: false,
                error: 'Failed to generate Zapp code' 
            });
        }
    }

    async verifyZapp(req, res) {
        try {
            const { sessionId, zappAmount } = req.body;
            
            if (!sessionId || !zappAmount) {
                return res.status(400).json({ 
                    success: false,
                    error: 'Session ID and Zapp amount are required' 
                });
            }

            const result = zappService.verifyZapp(sessionId, zappAmount);
            
            if (!result.success) {
                return res.json(result);
            }

            // Calculate token amount
            const tokenAmount = await blockchainService.calculateTokensForZapps(zappAmount);
            
            res.json({
                success: true,
                signature: result.signature,
                zappCode: result.zappCode,
                zappAmount: result.zappAmount,
                tokenAmount,
                contractData: {
                    zappCode: result.zappCode,
                    zappAmount: result.zappAmount,
                    signature: result.signature
                }
            });
        } catch (error) {
            console.error('Error verifying Zapp:', error);
            res.status(500).json({ 
                success: false,
                error: 'Failed to verify Zapp' 
            });
        }
    }

    async redeemTokens(req, res) {
        try {
            const { sessionId, signature, zappCode, zappAmount } = req.body;
            
            if (!sessionId || !signature || !zappCode || !zappAmount) {
                return res.status(400).json({ 
                    success: false,
                    error: 'All redemption parameters are required' 
                });
            }

            const session = zappService.getSession(sessionId);
            if (!session) {
                return res.status(404).json({ 
                    success: false,
                    error: 'Session not found' 
                });
            }

            if (session.status !== 'verified') {
                return res.status(400).json({ 
                    success: false,
                    error: 'Session not verified' 
                });
            }

            // Check if Zapp code was already used
            const isUsed = await blockchainService.isZappCodeUsed(zappCode);
            if (isUsed) {
                return res.status(400).json({ 
                    success: false,
                    error: 'Zapp code already used' 
                });
            }

            // Call smart contract to redeem Zapps
            const txResult = await blockchainService.redeemZapps(zappCode, zappAmount, signature);
            
            // Update session status
            zappService.completeRedemption(sessionId, txResult.txHash);
            
            res.json({
                success: true,
                txHash: txResult.txHash,
                blockNumber: txResult.blockNumber,
                gasUsed: txResult.gasUsed,
                message: 'Tokens redeemed successfully!',
                zappCode,
                zappAmount,
                tokenAmount: (zappAmount * 100) / 10000 // 1 Zapp = 0.01 ZAPPKA
            });
        } catch (error) {
            console.error('Error redeeming tokens:', error);
            res.status(500).json({ 
                success: false,
                error: 'Failed to redeem tokens: ' + error.message 
            });
        }
    }

    async getUserHistory(req, res) {
        try {
            const { address } = req.params;
            
            if (!address) {
                return res.status(400).json({ 
                    success: false,
                    error: 'User address is required' 
                });
            }

            // Get on-chain data
            const balances = await blockchainService.getUserBalances(address);
            
            // Get session history
            const history = zappService.getUserSessions(address);
            
            res.json({ 
                success: true,
                history,
                balances: {
                    zappBalance: balances.zappBalance,
                    totalRedeemed: balances.totalRedeemed,
                    tokenBalance: balances.tokenBalance
                }
            });
        } catch (error) {
            console.error('Error getting user history:', error);
            res.status(500).json({ 
                success: false,
                error: 'Failed to get user history' 
            });
        }
    }

    async getContractInfo(req, res) {
        try {
            const contractInfo = await blockchainService.getContractInfo();
            const networkInfo = await blockchainService.getNetworkInfo();
            
            res.json({
                success: true,
                ...contractInfo,
                zappkaAccount: process.env.ZAPPKA_RECEIVER_ACCOUNT,
                network: networkInfo
            });
        } catch (error) {
            console.error('Error getting contract info:', error);
            res.status(500).json({ 
                success: false,
                error: 'Failed to get contract info' 
            });
        }
    }

    async manualVerify(req, res) {
        try {
            const { sessionId, zappAmount } = req.body;
            
            if (!sessionId || !zappAmount) {
                return res.status(400).json({ 
                    success: false,
                    error: 'Session ID and Zapp amount are required' 
                });
            }

            const result = zappService.manualVerify(sessionId, zappAmount);
            
            res.json({
                success: true,
                message: 'Manually verified',
                signature: result.signature,
                zappCode: result.zappCode,
                zappAmount: result.zappAmount
            });
        } catch (error) {
            console.error('Error in manual verification:', error);
            res.status(500).json({ 
                success: false,
                error: 'Failed to manually verify' 
            });
        }
    }

    async getStats(req, res) {
        try {
            const stats = zappService.getSessionStats();
            const networkInfo = await blockchainService.getNetworkInfo();
            
            res.json({
                success: true,
                sessions: stats,
                network: networkInfo,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error getting stats:', error);
            res.status(500).json({ 
                success: false,
                error: 'Failed to get stats' 
            });
        }
    }
}

module.exports = new ZappController();
