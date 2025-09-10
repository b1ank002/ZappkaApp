const dotenv = require('dotenv');
dotenv.config();

const config = {
    // Server Configuration
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    // Blockchain Configuration
    rpcUrl: process.env.RPC_URL || 'http://localhost:8545',
    privateKey: process.env.PRIVATE_KEY,
    contractAddress: process.env.CONTRACT_ADDRESS,
    
    // Zappka Configuration
    zappkaAccount: process.env.ZAPPKA_RECEIVER_ACCOUNT,
    
    // Database Configuration (for production)
    database: {
        url: process.env.DATABASE_URL || 'sqlite:./database.sqlite',
        dialect: process.env.DB_DIALECT || 'sqlite',
        logging: process.env.NODE_ENV === 'development'
    },
    
    // Security Configuration
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    encryptionKey: process.env.ENCRYPTION_KEY || 'your-encryption-key',
    
    // Rate Limiting
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    },
    
    // CORS Configuration
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true
    }
};

module.exports = config;
