const crypto = require('crypto');

class ZappService {
    constructor() {
        this.sessions = new Map();
        this.redemptions = new Map();
    }

    generateZappCode() {
        return 'ZAPP-' + crypto.randomBytes(8).toString('hex').toUpperCase();
    }

    generateSessionId() {
        return crypto.randomUUID();
    }

    generateSignature(userAddress, zappCode, zappAmount) {
        const message = `${userAddress}-${zappCode}-${zappAmount}`;
        return crypto.createHash('sha256').update(message).digest('hex');
    }

    createSession(userAddress) {
        const sessionId = this.generateSessionId();
        const zappCode = this.generateZappCode();
        
        const session = {
            id: sessionId,
            userAddress,
            zappCode,
            status: 'pending',
            createdAt: Date.now(),
            verifiedAt: null,
            completedAt: null,
            zappAmount: null,
            txHash: null
        };

        this.sessions.set(sessionId, session);
        return session;
    }

    getSession(sessionId) {
        return this.sessions.get(sessionId);
    }

    updateSession(sessionId, updates) {
        const session = this.sessions.get(sessionId);
        if (session) {
            Object.assign(session, updates);
            this.sessions.set(sessionId, session);
        }
        return session;
    }

    verifyZapp(sessionId, zappAmount) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            throw new Error('Session not found');
        }

        if (session.status !== 'pending') {
            throw new Error('Session already processed');
        }

        // In production, you'd verify with Zappka's system
        // For now, we'll simulate verification with 90% success rate
        const isVerified = Math.random() > 0.1;

        if (isVerified) {
            const updates = {
                status: 'verified',
                zappAmount: parseInt(zappAmount),
                verifiedAt: Date.now()
            };
            
            this.updateSession(sessionId, updates);
            return {
                success: true,
                signature: this.generateSignature(session.userAddress, session.zappCode, zappAmount),
                zappCode: session.zappCode,
                zappAmount: parseInt(zappAmount)
            };
        } else {
            return {
                success: false,
                error: 'Zapp verification failed. Please try again.'
            };
        }
    }

    completeRedemption(sessionId, txHash) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            throw new Error('Session not found');
        }

        const updates = {
            status: 'completed',
            txHash,
            completedAt: Date.now()
        };

        this.updateSession(sessionId, updates);
        return session;
    }

    getUserSessions(userAddress) {
        return Array.from(this.sessions.values())
            .filter(session => session.userAddress === userAddress)
            .map(session => ({
                id: session.id,
                zappCode: session.zappCode,
                zappAmount: session.zappAmount,
                status: session.status,
                createdAt: session.createdAt,
                verifiedAt: session.verifiedAt,
                completedAt: session.completedAt,
                txHash: session.txHash
            }));
    }

    getSessionStats() {
        const sessions = Array.from(this.sessions.values());
        return {
            total: sessions.length,
            pending: sessions.filter(s => s.status === 'pending').length,
            verified: sessions.filter(s => s.status === 'verified').length,
            completed: sessions.filter(s => s.status === 'completed').length
        };
    }

    // Manual verification for testing
    manualVerify(sessionId, zappAmount) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            throw new Error('Session not found');
        }

        const updates = {
            status: 'verified',
            zappAmount: parseInt(zappAmount),
            verifiedAt: Date.now()
        };

        this.updateSession(sessionId, updates);
        
        return {
            success: true,
            message: 'Manually verified',
            signature: this.generateSignature(session.userAddress, session.zappCode, zappAmount),
            zappCode: session.zappCode,
            zappAmount: parseInt(zappAmount)
        };
    }
}

module.exports = new ZappService();
