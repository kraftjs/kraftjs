const { app, resetState } = require('./server');
const fetch = require('isomorphic-fetch');

const apiRoot = 'http://localhost:3000';

const addItem = (username, item) => {
    return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
        method: 'POST',
    });
};

const removeItem = (username, item) => {
    return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
        method: 'DELETE',
    });
};

const getItems = (username) => {
    return fetch(`${apiRoot}/carts/${username}/items`, {
        method: 'GET',
    });
};

test('adding items to a cart', async () => {
    const initialItemsResponse = await getItems('kraftjs');
    expect(initialItemsResponse.status).toBe(404);

    const addItemResponse = await addItem('kraftjs', 'cheesecake');
    expect(await addItemResponse.json()).toEqual(['cheesecake']);

    const finalItemsResponse = await getItems('kraftjs');
    expect(await finalItemsResponse.json()).toEqual(['cheesecake']);
});

test('removing items from a cart', async () => {
    const initialItemsResponse = await getItems('kraftjs');
    expect(initialItemsResponse.status).toBe(404);

    await addItem('kraftjs', 'cheesecake');

    const removeItemsResponse = await removeItem('kraftjs', 'cheesecake');
    expect(await removeItemsResponse.json()).toEqual([]);

    const finalItemsResponse = await getItems('kraftjs');
    expect(await finalItemsResponse.json()).toEqual([]);
});

// We must clean-up our server's state before each test.
// If you kept state in a database, you'd need to ensure
// your database is reset to its initial state.
beforeEach(() => resetState());
afterAll(() => app.close());
