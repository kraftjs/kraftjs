const { app, carts, inventory } = require('./server');

const fetch = require('isomorphic-fetch');

const apiRoot = 'http://localhost:3000';

afterAll(() => app.close());

afterEach(() => carts.clear());
afterEach(() => inventory.clear());

describe('add items to a cart', () => {
    test('adding available items', async () => {
        inventory.set('cheesecake', 1);
        const response = await fetch(`${apiRoot}/carts/test_user/items/cheesecake`, {
            method: 'POST',
        });

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual(['cheesecake']);
        expect(inventory.get('cheesecake')).toBe(0);
        expect(carts.get('test_user')).toEqual(['cheesecake']);
    });

    test('adding unavailable items', async () => {
        carts.set('test_user', []);
        const response = await fetch(`${apiRoot}/carts/test_user/items/cheesecake`, {
            method: 'POST',
        });

        expect(response.status).toBe(400);
        expect(await response.json()).toEqual({
            message: 'cheesecake is unavailable',
        });
        expect(carts.get('test_user')).toEqual([]);
    });
});

describe('remove items from cart', () => {
    test('removing existing items', async () => {
        carts.set('test_user', ['cheesecake']);
        inventory.set('cheesecake', 0);
        const response = await fetch(`${apiRoot}/carts/test_user/items/cheesecake`, {
            method: 'DELETE',
        });

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual([]);
        expect(carts.get('test_user')).toEqual([]);
        expect(inventory.get('cheesecake')).toBe(1);
    });

    test('removing non-existing item', async () => {
        carts.set('test_user', []);
        inventory.set('cheesecake', 0);
        const response = await fetch(`${apiRoot}/carts/test_user/items/cheesecake`, {
            method: 'DELETE',
        });

        expect(response.status).toBe(400);
        expect(await response.json()).toEqual({
            message: 'cheesecake is not in the cart',
        });
        expect(carts.get('test_user')).toEqual([]);
        expect(inventory.get('cheesecake')).toBe(0);
    });
});
