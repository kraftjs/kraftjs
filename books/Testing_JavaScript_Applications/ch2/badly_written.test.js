const {app, resetState} = require("./server");
const fetch = require('isomorphic-fetch')

test("adding items to a cart", (done) => {
    resetState();
    return fetch(`http://localhost:3000/carts/kraftjs/items`, {
        method: "GET"
    })
        .then(initialItemsResponse => {
            expect(initialItemsResponse.status).toBe(404);
            return fetch(`http://localhost:3000/carts/kraftjs/items/cheesecake`, {
                method: 'POST',
            }).then(response => response.json())
        })
        .then(addItemResponse => {
            expect(addItemResponse).toEqual(["cheesecake"]);
            return fetch(`http://localhost:3000/carts/kraftjs/items`, {
                method: "GET"
            }).then(response => response.json())
        }).then(finalResponseItem => {
            expect(finalResponseItem).toEqual(["cheesecake"]);
        })
        .then(() => {
            app.close();
            done();
        })
})