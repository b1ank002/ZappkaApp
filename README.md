# 🛒 → 🪙 Zappka-ZAPPKA Token Converter

A beautiful, professional system that allows users to convert their Zappka Zapps loyalty points into ZAPPKA crypto tokens. Built with modern architecture and stunning UI.

## ✨ Features

- **🎨 Beautiful UI** - Modern, responsive design with smooth animations
- **🔒 Secure** - Smart contract with reentrancy protection and signature verification
- **📱 Mobile-First** - Optimized for mobile Zappka app users
- **⚡ Fast** - Efficient backend with rate limiting and error handling
- **🔧 Professional** - Clean architecture with proper separation of concerns
- **📊 Analytics** - Track conversions and user statistics

## 🏗️ Architecture

```
ZappkaApp/
├── contracts/    # Foundry smart contract project
│   ├── src/           # Smart contracts
│   │   └── ZappkaToken.sol  # Main ERC20 token contract
│   ├── script/        # Deployment scripts
│   │   └── Deploy.s.sol   # Foundry deployment script
│   ├── test/          # Contract tests
│   ├── lib/           # Dependencies (forge-std, openzeppelin)
│   └── foundry.toml   # Foundry configuration
├── backend/            # Node.js API server
│   ├── src/
│   │   ├── config/     # Configuration management
│   │   ├── controllers/ # API controllers
│   │   ├── services/   # Business logic
│   │   ├── routes/     # API routes
│   │   └── middleware/ # Custom middleware
│   └── server.js       # Server entry point
├── frontend/           # Web application
│   └── index.html      # Beautiful, responsive UI
├── package.json        # Node.js dependencies
├── vercel.json         # Vercel deployment config
├── netlify.toml        # Netlify deployment config
└── deploy.md           # Deployment guide
```

## 🚀 Quick Start

### For Web Deployment
1. **Deploy Smart Contract** - Deploy to your preferred network
2. **Deploy Backend** - Deploy API to Vercel/Railway/Netlify
3. **Deploy Frontend** - Deploy to Vercel/Netlify
4. **Configure** - Update environment variables
5. **Go Live** - Share your website URL!

### For Local Development
```bash
# Install dependencies
npm install

# Deploy contract
npm run deploy-sepolia

# Start backend
npm start

# Open frontend
open frontend/index.html
```

See [deploy.md](deploy.md) for detailed web deployment instructions.

## 🔧 Configuration

### Environment Variables
```env
# Server
PORT=3000
NODE_ENV=development

# Blockchain
RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_private_key
CONTRACT_ADDRESS=0x...

# Zappka
ZAPPKA_RECEIVER_ACCOUNT=your_account
```

## 📱 User Flow

### For Users:
1. **Connect Wallet** - Connect MetaMask wallet
2. **Generate Code** - Get unique Zapp code
3. **Send Zapps** - Use Zappka app to send Zapps with code
4. **Verify Payment** - Confirm payment amount
5. **Get Tokens** - Receive ZAPPKA tokens automatically

### For You (Token Issuer):
1. **Deploy Contract** - Deploy to your preferred network
2. **Setup Backend** - Configure API server
3. **Monitor Payments** - Track incoming Zapps
4. **Verify Redemptions** - Approve token minting
5. **Analytics** - Monitor conversion statistics

## 🛠️ Technical Details

### Smart Contract Features:
- **ERC20 Compliant** - Standard token implementation
- **Exchange Rate** - 1 Zapp = 0.01 ZAPPKA tokens (adjustable)
- **Security** - Reentrancy protection, signature verification
- **Events** - Comprehensive event logging
- **Owner Controls** - Administrative functions

### Backend API:
- **RESTful Design** - Clean, intuitive API endpoints
- **Rate Limiting** - Prevent abuse and spam
- **Error Handling** - Comprehensive error management
- **Security** - Helmet.js, CORS, input validation
- **Logging** - Morgan for request logging

### Frontend Features:
- **Responsive Design** - Works on all devices
- **Modern UI** - Beautiful gradients and animations
- **Progress Tracking** - Visual progress indicator
- **Real-time Updates** - Live status updates
- **Error Handling** - User-friendly error messages

## 🔒 Security Features

1. **Smart Contract Security**:
   - Reentrancy protection
   - Signature verification
   - Input validation
   - Owner-only functions

2. **Backend Security**:
   - Rate limiting
   - Input sanitization
   - CORS protection
   - Helmet.js security headers

3. **Frontend Security**:
   - MetaMask integration
   - Input validation
   - Secure API calls

## 📊 API Endpoints

### Zapp Management
- `POST /api/generate-zapp-code` - Generate unique Zapp code
- `POST /api/verify-zapp` - Verify Zapp redemption
- `POST /api/redeem-tokens` - Mint tokens to user
- `GET /api/user-history/:address` - Get user's history

### System Information
- `GET /api/contract-info` - Contract details
- `GET /api/stats` - System statistics
- `GET /health` - Health check

### Admin Functions
- `POST /api/manual-verify` - Manual verification

## 🎨 UI Components

### Design System
- **Colors**: Professional gradient palette
- **Typography**: Inter font family
- **Spacing**: Consistent 8px grid
- **Animations**: Smooth transitions
- **Icons**: Font Awesome integration

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Smart Contract
```bash
# Testnet
npm run deploy-sepolia

# Mainnet (be careful!)
npm run deploy
```

### Backend
```bash
# Development
npm run dev

# Production
npm start
```

### Frontend
```bash
# Development
npm run frontend

# Production
# Deploy to your preferred hosting service
```

## 📈 Monitoring

### Health Checks
- Backend health endpoint
- Contract connectivity
- Database status
- Rate limiting status

### Analytics
- User conversion rates
- Token minting volume
- Error rates
- Performance metrics

## 🔄 Development

### Running Tests
```bash
# Smart contract tests
forge test

# Backend tests (when implemented)
npm test
```

### Code Quality
- ESLint for JavaScript
- Solidity linting
- Prettier formatting
- Git hooks (when implemented)

## 📞 Support

### Common Issues
1. **MetaMask not connecting** - Check browser permissions
2. **Contract not found** - Verify contract address
3. **API errors** - Check backend logs
4. **Zapp verification fails** - Try manual verification

### Getting Help
- Check the logs for error details
- Verify your configuration
- Test with small amounts first
- Contact support if needed

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic Zapp conversion
- ✅ Smart contract deployment
- ✅ API backend
- ✅ Web frontend

### Phase 2 (Future)
- [ ] Database integration
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Admin dashboard

### Phase 3 (Advanced)
- [ ] Automated verification
- [ ] Multi-chain support
- [ ] Advanced security
- [ ] Enterprise features

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## ⚠️ Disclaimer

This is a proof-of-concept system. Ensure compliance with local regulations before production use. The system relies on manual verification of Zappka payments since there's no official API.

---

**Built with ❤️ for the Zappka community in Poland**