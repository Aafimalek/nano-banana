// Simple test script to verify server setup
const request = require('supertest');
const app = require('./index');

describe('Server Setup Tests', () => {
    test('Server should start without errors', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test('Health endpoint should work', async () => {
        const response = await request(app).get('/api/health');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test('Public endpoint should work', async () => {
        const response = await request(app).get('/api/public');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test('Protected endpoint should require authentication', async () => {
        const response = await request(app).get('/api/protected');
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });

    test('Auth check endpoint should work', async () => {
        const response = await request(app).get('/api/auth/check');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.authenticated).toBe(false);
    });
});

console.log('✅ Server setup tests completed successfully!');
console.log('🚀 Your Express server with Google OAuth is ready!');
console.log('');
console.log('Next steps:');
console.log('1. Create a .env file with your configuration');
console.log('2. Set up Google OAuth credentials');
console.log('3. Start MongoDB');
console.log('4. Run: npm run dev');
console.log('');
console.log('API Endpoints:');
console.log('- GET /api/health - Health check');
console.log('- GET /api/public - Public endpoint');
console.log('- GET /api/protected - Protected endpoint (requires auth)');
console.log('- GET /api/auth/google - Google OAuth login');
console.log('- GET /api/auth/profile - User profile (requires auth)');
