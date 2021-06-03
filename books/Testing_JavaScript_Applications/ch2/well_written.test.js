const {app, resetState} = require('./server')
const fetch = require('isomorphic-fetch')

const apiRoot = "http://localhost:3000";

const addItem = (username, item) => {
    return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
        method: 'POST'
    })
}

const getItems = (username) => {
    return fetch(`${apiRoot}/carts/${username}/items`, {
        method: 'GET'
    })
}

beforeEach(() => resetState());
afterAll(() => app.close())

test("adding items to a cart", async () => {
    const initialItemResponse = await getItems('kraftjs');
    expect(initialItemResponse.status).toBe(404);

    const addItemResponse = await addItem("kraftjs", "cheesecake");
    expect(await addItemResponse.json()).toEqual(["cheesecake"])

    const finalItemResponse = await getItems('kraftjs');
    expect(await finalItemResponse.json()).toEqual(["cheesecake"])
})
