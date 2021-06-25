/*
 * Even though this test is similar to the hashPassword function’s implementation,
 * it guarantees that you will be alerted if it ever changes. Whoever alters
 * hashPassword will also have to update its tests, so the test delivers value by
 * ensuring that this person is aware of the consequences of their change.
 * */

const crypto = require('crypto');
const { hashPassword, credentialsAreValid, authenticationMiddleware } = require('./authenticationController');
const { user: globalUser } = require('./userTestUtils');

describe('hashPassword', () => {
    test('hashing passwords', () => {
        const plainTextPassword = 'password';
        const hash = crypto.createHash('sha256');
        hash.update(plainTextPassword);

        const expectedHash = hash.digest('hex');
        const actualHash = hashPassword(plainTextPassword);
        expect(actualHash).toBe(expectedHash);
    });
});

describe('credentialsAreValid', () => {
    test('validating credentials', async () => {
        const hasValidCredentials = await credentialsAreValid(globalUser.username, 'a_password');
        expect(hasValidCredentials).toBe(true);
    });
});

describe('authenticationMiddleware', () => {
    const reqMock = (authHeader) => ({
        headers: { authorization: authHeader },
    });

    const resMock = () => ({
        status: jest.fn(() => ({ send: jest.fn() })),
    });

    test('returning an error if the credentials are not valid', async () => {
        const fakeAuth = Buffer.from('invalid:credentials').toString('base64');
        const req = reqMock('Basic ' + fakeAuth);
        const res = resMock();
        const next = jest.fn();

        await authenticationMiddleware(req, res, next);

        expect(next.mock.calls).toHaveLength(0);
        expect(res.status.mock.calls).toHaveLength(1);
    });

    test('authenticating properly', async () => {
        const req = reqMock(globalUser.authHeader);
        const res = resMock();
        const next = jest.fn();

        await authenticationMiddleware(req, res, next);

        expect(next.mock.calls).toHaveLength(1);
        expect(res.status.mock.calls).toHaveLength(0);
    });
});
