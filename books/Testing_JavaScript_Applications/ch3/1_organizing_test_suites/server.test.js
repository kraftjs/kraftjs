const { app, inventory, carts } = require('./server');
const fetch = require('isomorphic-fetch');

const apiRoot = 'http://localhost:3000';

const addItem = (username, item) => {
    return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
        method: 'POST',
    });
};

describe('addItem', () => {
    beforeEach(() => carts.clear());
    beforeEach(() => inventory.set('cheesecake', 1));

    test('correct response', async () => {
        const addItemResponse = await addItem('kraftjs', 'cheesecake');
        expect(addItemResponse.status).toBe(200);
        expect(await addItemResponse.json()).toEqual(['cheesecake']);
    });

    test('inventory update', async () => {
        await addItem('kraftjs', 'cheesecake');
        expect(inventory.get('cheesecake')).toBe(0);
    });

    test('cart update', async () => {
        await addItem('kraftjs', 'cheesecake');
        expect(carts.get('kraftjs')).toEqual(['cheesecake']);
    });

    test('soldout items', async () => {
        inventory.set('cheesecake', 0);
        const failedAddItem = await addItem('kraftjs', 'cheesecake');
        expect(failedAddItem.status).toBe(404);
    });
});

afterAll(() => app.close());

// If the application doesn’t fulfill any of these expectations, the test will fail. When this test
// fails, because you rely on four different assertions, you won’t immediately be able to tell what
// the problem is. Because tests halt when an assertion fails, once you fix the test, you will also
// need to keep rerunning it to see if any assertions after the broken one will also fail.

// describe('addItem', () => {
//     test('adding items to a cart', async () => {
//         inventory.set('cheesecake', 1);
//         const addItemResponse = await addItem('kraftjs', 'cheesecake');
//         expect(await addItemResponse.json()).toEqual(['cheesecake']);
//         expect(inventory.get('cheesecake')).toBe(0);
//
//         expect(carts.get('kraftjs')).toEqual(['cheesecake']);
//
//         const failedAddItem = await addItem('kraftjs', 'cheesecake');
//         expect(failedAddItem.status).toBe(404);
//     });
// });
