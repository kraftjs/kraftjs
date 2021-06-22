const express = require('express');
const router = require('express').Router();

const { carts, addItemToCart } = require('./cartController');
const { inventory } = require('./inventoryController');
const { users, hashPassword, authenticationMiddleware } = require('./authenticationController');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    if (req.url.startsWith('/carts')) {
        authenticationMiddleware(req, res, next);
    }
    next();
});

router.get('/carts/:username/items', (req, res) => {
    const cart = carts.get(req.params.username);
    cart ? res.send(cart) : res.status(404);
});

router.put('/users/:username', (req, res) => {
    const { username } = req.params;
    const { email, password } = req.body;
    const userAlreadyExists = users.has(username);
    if (userAlreadyExists) {
        return res.status(409).send({ message: `${username} already exists` });
    }

    users.set(username, {
        email,
        passwordHash: hashPassword(password),
    });
    return res.send({ message: `${username} created successfully` });
});

router.post('/carts/:username/items', (req, res) => {
    const { username } = req.params;
    const { item, quantity } = req.body;

    let newItems = [];
    for (let i = 0; i < quantity; i++) {
        try {
            newItems = addItemToCart(username, item);
        } catch (e) {
            return res.status(e.code).send({ message: e.message });
        }
    }
    res.send(newItems);
});

router.delete('/carts/:username/items/:item', (req, res) => {
    const { username, item } = req.params;
    if (!carts.has(username) || !carts.get(username).includes(item)) {
        return res.status(400).send({ message: `${item} is not in the cart` });
    }

    const newItems = (carts.get(username) || []).filter((i) => i !== item);
    inventory.set(item, (inventory.get(item) || 0) + 1);
    carts.set(username, newItems);
    res.send(newItems);
});

app.use(router);

module.exports = { app: app.listen(3000), carts, inventory };
