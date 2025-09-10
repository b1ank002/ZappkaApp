# 🌐 Web Deployment Guide

Deploy your Zappka-ZAPPKA Converter to the web!

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)
1. **Connect GitHub** - Push your code to GitHub
2. **Import to Vercel** - Connect your GitHub repo to Vercel
3. **Configure Environment** - Add your environment variables in Vercel dashboard
4. **Deploy** - Vercel automatically builds and deploys

### Option 2: Netlify
1. **Connect GitHub** - Push your code to GitHub
2. **Import to Netlify** - Connect your GitHub repo to Netlify
3. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `frontend`
4. **Environment Variables** - Add your .env variables in Netlify dashboard

### Option 3: Railway
1. **Connect GitHub** - Push your code to GitHub
2. **Deploy on Railway** - Connect your GitHub repo
3. **Configure** - Add environment variables
4. **Deploy** - Railway handles the rest

## 🔧 Environment Variables for Web

```env
# Backend API URL (update this to your deployed backend)
API_BASE_URL=https://your-backend.vercel.app/api

# Blockchain Configuration
RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
CONTRACT_ADDRESS=0x...

# Zappka Configuration
ZAPPKA_RECEIVER_ACCOUNT=your_zappka_account
```

## 📱 Frontend Configuration

Update the API URL in `frontend/index.html`:
```javascript
const API_BASE_URL = 'https://your-backend.vercel.app/api';
```

## 🎯 Production Checklist

- [ ] Deploy smart contract to mainnet
- [ ] Update contract address in environment
- [ ] Deploy backend API
- [ ] Update frontend API URL
- [ ] Deploy frontend
- [ ] Test complete flow
- [ ] Configure domain (optional)

## 🌍 Live Demo

Once deployed, users can:
1. Visit your website
2. Connect MetaMask
3. Convert Zapps to ZAPPKA tokens
4. View their balances

---

**Ready to go live! 🚀**
