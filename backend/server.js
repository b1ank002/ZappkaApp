const app = require('./src/app');
const config = require('./src/config/config');

const PORT = config.port;

const server = app.listen(PORT, () => {
    console.log('🚀 Zappka-ZAPPKA API Server Started');
    console.log(`📡 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${config.nodeEnv}`);
    console.log(`🔗 Contract: ${config.contractAddress || 'Not configured'}`);
    console.log(`💰 Zappka Account: ${config.zappkaAccount || 'Not configured'}`);
    console.log(`⛓️  RPC URL: ${config.rpcUrl}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Process terminated');
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('Process terminated');
    });
});

module.exports = server;
