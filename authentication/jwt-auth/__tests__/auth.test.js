import { authenticate, USERS } from '../src/auth.js';
import jwt from 'jsonwebtoken';

const SECRET = 'TopSecret!'; // must match what's used in auth.js

describe('JWT Authentication', () => {
    test('should return a token for valid credentials', async () => {
        const user = USERS[0];
        const token = await authenticate(user.username, user.password);

        expect(typeof token).toBe('string');

        // Optionally decode and validate token structure
        const decoded = jwt.verify(token, SECRET);
        expect(decoded.sub).toBe(user.id);
    });

    test('should return undefined for invalid password', async () => {
        const token = await authenticate('admin', 'wrongpassword');
        expect(token).toBeUndefined();
    });

    test('should return undefined for non-existing user', async () => {
        const token = await authenticate('nonuser', 'anything');
        expect(token).toBeUndefined();
    });
});


describe('JWT Middleware (verify)', () => {
    let app;
    let validToken;

    beforeAll(async () => {
        // Create a token to use in tests
        validToken = await authenticate('admin', 'secure');

        // Setup test server with middleware
        app = express();
        app.get('/protected', verify, (req, res) => {
            res.json({ userId: req.userId });
        });
    });

    test('should allow access with valid token', async () => {
        const res = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${validToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.userId).toBe(1);
    });

    test('should reject request with invalid token', async () => {
        const res = await request(app)
            .get('/protected')
            .set('Authorization', 'Bearer invalidtoken');

        expect(res.statusCode).toBe(401);
    });

    test('should reject request with missing token', async () => {
        const res = await request(app).get('/protected');
        expect(res.statusCode).toBe(401);
    });

    test('should reject request with wrong authorization scheme', async () => {
        const res = await request(app)
            .get('/protected')
            .set('Authorization', `Token ${validToken}`); // wrong prefix

        expect(res.statusCode).toBe(401);
    });
});

