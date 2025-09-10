// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ZappkaToken
 * @dev ERC20 token for Zappka Zapps conversion
 * @author Your Name
 */
contract ZappkaToken is ERC20, Ownable, ReentrancyGuard {
    // Exchange rate: 1 Zapp = 0.01 ZAPPKA tokens (100 Zapps = 1 ZAPPKA)
    uint256 public constant ZAPP_TO_TOKEN_RATE = 100;
    uint256 public constant DECIMALS = 18;

    // Mapping to track used Zapp codes
    mapping(string => bool) public usedZappCodes;
    mapping(address => uint256) public userZappBalance;
    mapping(address => uint256) public userTotalRedeemed;

    // Events
    event ZappRedeemed(address indexed user, string zappCode, uint256 zappAmount, uint256 tokenAmount);
    event TokensMinted(address indexed to, uint256 amount);
    event ZappCodeUsed(string zappCode, address user);

    constructor() ERC20("Zappka Token", "ZAPPS") Ownable(msg.sender) {
        // Mint initial supply to owner (1M tokens)
        _mint(msg.sender, 1000000 * 10 ** DECIMALS);
    }

    /**
     * @dev Redeem Zapps for ZAPPKA tokens
     * @param zappCode Unique code from Zappka app
     * @param zappAmount Amount of Zapps being redeemed
     * @param signature Signature to verify the redemption
     */
    function redeemZapps(string memory zappCode, uint256 zappAmount, bytes memory signature) external nonReentrant {
        require(!usedZappCodes[zappCode], "Zapp code already used");
        require(zappAmount > 0, "Invalid Zapp amount");
        require(verifyZappRedemption(msg.sender, zappCode, zappAmount, signature), "Invalid signature");

        usedZappCodes[zappCode] = true;
        userZappBalance[msg.sender] += zappAmount;
        userTotalRedeemed[msg.sender] += zappAmount;

        uint256 tokenAmount = (zappAmount * 10 ** DECIMALS) / ZAPP_TO_TOKEN_RATE;

        _mint(msg.sender, tokenAmount);

        emit ZappRedeemed(msg.sender, zappCode, zappAmount, tokenAmount);
        emit ZappCodeUsed(zappCode, msg.sender);
    }

    /**
     * @dev Verify Zapp redemption signature (simplified for demo)
     * In production, implement proper signature verification
     */
    function verifyZappRedemption(address user, string memory zappCode, uint256 zappAmount, bytes memory signature)
        public
        pure
        returns (bool)
    {
        // For demo purposes, accept any non-empty signature
        // In production, verify against a known signer
        return signature.length > 0;
    }

    /**
     * @dev Mint tokens (only owner)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * @dev Get user's Zapp balance
     */
    function getUserZappBalance(address user) external view returns (uint256) {
        return userZappBalance[user];
    }

    /**
     * @dev Get user's total redeemed Zapps
     */
    function getUserTotalRedeemed(address user) external view returns (uint256) {
        return userTotalRedeemed[user];
    }

    /**
     * @dev Check if Zapp code was used
     */
    function isZappCodeUsed(string memory zappCode) external view returns (bool) {
        return usedZappCodes[zappCode];
    }

    /**
     * @dev Calculate tokens for given Zapp amount
     */
    function calculateTokensForZapps(uint256 zappAmount) external pure returns (uint256) {
        return (zappAmount * 10 ** DECIMALS) / ZAPP_TO_TOKEN_RATE;
    }

    /**
     * @dev Get exchange rate
     */
    function getExchangeRate() external pure returns (uint256) {
        return ZAPP_TO_TOKEN_RATE;
    }
}
