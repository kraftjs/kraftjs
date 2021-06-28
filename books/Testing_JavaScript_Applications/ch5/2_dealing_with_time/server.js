const fetch = require('isomorphic-fetch');
const express = require('express');
const router = require('express').Router();

const { db } = require('./dbConnection');
const { addItemToCart } = require('./cartController');
const { hashPassword, authenticationMiddleware } = require('./authenticationController');

const app = express();

app.use(express.json());

app.use(async (req, res, next) => {
    if (req.url.startsWith('/carts')) {
        return await authenticationMiddleware(req, res, next);
    }
    next();
});

router.get('/carts/:username/items', async (req, res) => {
    const { username } = req.params;
    const cart = await db
        .select('carts.itemName', 'carts.quantity')
        .from('carts')
        .join('users', 'users.id', 'carts.userId')
        .where('users.username', `${username}`);
    cart ? res.send(cart) : res.status(404);
});

router.get('/inventory/:itemName', async (req, res) => {
    const { itemName } = req.params;

    const response = await fetch(`http://recipepuppy.com/api?i=${itemName}`);
    const { title, href, results: recipes } = await response.json();
    const inventoryItem = await db.select().from('inventory').where({ itemName }).first();

    res.send({
        ...inventoryItem,
        info: `Data obtained from ${title} - ${href}`,
        recipes,
    });
});

router.put('/users/:username', async (req, res) => {
    const { username } = req.params;
    const { email, password } = req.body;

    const userAlreadyExists = await db.select().from('users').where({ username }).first();

    if (userAlreadyExists) {
        return res.status(409).send({ message: `${username} already exists` });
    }

    await db('users').insert({
        username,
        email,
        passwordHash: hashPassword(password),
    });

    return res.send({ message: `${username} created successfully` });
});

router.post('/carts/:username/items', async (req, res) => {
    const { username } = req.params;
    const { item, quantity } = req.body;

    let newItems = [];
    for (let i = 0; i < quantity; i++) {
        try {
            newItems = await addItemToCart(username, item);
        } catch (e) {
            return res.status(e.code).send({ message: e.message });
        }
    }
    res.send(newItems);
});

router.delete('/carts/:username/items/:item', async (req, res) => {
    const { username, item } = req.params;

    const user = await db.select().from('users').where({ username }).first();
    if (!user) {
        return res.status(404).send({ message: 'user not found' });
    }

    const itemEntry = await db.select().from('carts').where({ userId: user.id, itemName: item }).first();

    if (!itemEntry || itemEntry.quantity === 0) {
        return res.status(400).send({ message: `${item} is not in the cart` });
    }

    await db('carts').decrement('quantity').where({ userId: user.id, itemName: item });

    const inventoryEntry = await db.select().from('inventory').where({ itemName: item }).first();

    if (inventoryEntry) {
        await db('inventory').increment('quantity').where({ id: inventoryEntry.id, itemName: item });
    } else {
        await db('inventory').insert({ itemName: item, quantity: 1 });
    }

    const newCart = await db.select('itemName', 'quantity').from('carts').where({ userId: user.id });
    res.send(newCart);
});

app.use(router);

module.exports = { app: app.listen(3000) };
