const app = require('./server');
const fetch = require('isomorphic-fetch');
const { inventory } = require('./inventoryController');

const apiRoot = 'http://localhost:3000';

const sendGetInventoryRequest = () => {
    return fetch(`${apiRoot}/inventory`, { method: 'GET' });
};

test('fetching inventory', async () => {
    inventory.set('cheesecake', 1).set('macarroon', 2);
    const getInventoryResponse = await sendGetInventoryRequest('kraftjs');
    const expected = {
        cheesecake: 1,
        macarroon: 2,
        generatedAt: expect.anything(),
    };

    expect(await getInventoryResponse.json()).toEqual(expected);
});

afterAll(() => app.close());
