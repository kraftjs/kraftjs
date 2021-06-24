const { db, closeConnection } = require('./dbConnection');
const { addItemToCart } = require('./cartController');
const { hashPassword } = require('./authenticationController');

const fs = require('fs');

beforeEach(() => db('inventory').del());
beforeEach(() => db('carts').del());
beforeEach(() => db('users').del());

afterAll(() => closeConnection());

describe('addItemToCart', () => {
    beforeEach(() => {
        fs.writeFileSync('/tmp/logs.out', '');
    });

    test('adding unavailable items to cart', async () => {
        await db('users').insert({
            username: 'test_user',
            email: 'test_user@example.org',
            passwordHash: hashPassword('a_password'),
        });

        await db('inventory').insert({
            itemName: 'cheesecake',
            quantity: 0,
        });

        try {
            await addItemToCart('test_user', 'cheesecake');
        } catch (e) {
            const expectedError = new Error('cheesecake is unavailable');
            expectedError.code = 400;

            expect(e).toEqual(expectedError);
        }

        const finalCartContent = await db
            .select('carts.*')
            .from('carts')
            .join('users', 'users.id', 'carts.userId')
            .where('users.username', 'test_user');

        expect(finalCartContent).toEqual([]);
        expect.assertions(2);
    });

    test('adding items above limit to cart', async () => {
        await db('users').insert({
            username: 'test_user',
            email: 'test_user@example.org',
            passwordHash: hashPassword('a_password'),
        });

        const { id: userId } = await db.select().from('users').where({ username: 'test_user' }).first();

        await db('inventory').insert({ itemName: 'cheesecake', quantity: 1 });
        await db('carts').insert({
            userId,
            itemName: 'cheesecake',
            quantity: 3,
        });

        try {
            await addItemToCart('test_user', 'cheesecake');
        } catch (e) {
            const expectedError = new Error("You can't have more than three units of an item in your cart");
            expectedError.code = 400;
            expect(e).toEqual(expectedError);
        }

        const finalCartContent = await db
            .select('carts.itemName', 'carts.quantity')
            .from('carts')
            .join('users', 'users.id', 'carts.userId')
            .where('users.username', 'test_user');
        expect(finalCartContent).toEqual([{ itemName: 'cheesecake', quantity: 3 }]);
        expect.assertions(2);
    });

    test('logging added items', async () => {
        await db('users').insert({
            username: 'test_user',
            email: 'test_user@example.org',
            passwordHash: hashPassword('a_password'),
        });

        const { id: userId } = await db.select().from('users').where({ username: 'test_user' }).first();

        await db('inventory').insert({ itemName: 'cheesecake', quantity: 1 });
        await db('carts').insert({
            userId,
            itemName: 'cheesecake',
            quantity: 1,
        });

        await addItemToCart('test_user', 'cheesecake');

        const logs = fs.readFileSync('/tmp/logs.out', 'utf-8');
        expect(logs).toContain("cheesecake added to test_user's cart\n");
    });
});
