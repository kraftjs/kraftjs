const { db } = require('./dbConnection');
const { removeFromInventory } = require('./inventoryController');
const logger = require('./logger');

const addItemToCart = async (username, itemName) => {
    await removeFromInventory(itemName);

    const user = await db.select().from('users').where({ username }).first();

    if (!user) {
        const userNotFound = new Error('user not found');
        userNotFound.code = 404;
        throw userNotFound;
    }

    const itemEntry = await db.select().from('carts').where({ userId: user.id, itemName }).first();

    if (itemEntry && itemEntry.quantity + 1 > 3) {
        const limitError = new Error("You can't have more than three units of an item in your cart");
        limitError.code = 400;
        throw limitError;
    } else if (itemEntry) {
        await db('carts')
            .increment('quantity')
            .update({ updatedAt: new Date().toISOString() })
            .where({ userId: itemEntry.userId, itemName });
    } else {
        await db('carts').insert({
            userId: user.id,
            itemName,
            quantity: 1,
            updatedAt: new Date().toISOString(),
        });
    }

    logger.log(`${itemName} added to ${username}'s cart`);
    return db.select('itemName', 'quantity').from('carts').where({ userId: user.id });
};

const hoursInMilliseconds = (n) => 1000 * 60 * 60 * n;

const removeStaleItems = async () => {
    const fourHoursAgo = new Date(Date.now() - hoursInMilliseconds(4)).toISOString();

    const staleItems = await db.select().from('carts').where('updatedAt', '<', fourHoursAgo);

    if (staleItems.length === 0) return;

    const inventoryUpdates = staleItems.map((staleItem) =>
        db('inventory').increment('quantity', staleItem.quantity).where({ itemName: staleItem.itemName }),
    );
    await Promise.all(inventoryUpdates);

    const staleItemTuples = staleItems.map((i) => [i.itemName, i.userId]);
    await db('carts').del().whereIn(['itemName', 'userId'], staleItemTuples);
};

const monitorStaleItems = () => setInterval(removeStaleItems, hoursInMilliseconds(2));

module.exports = { addItemToCart, monitorStaleItems };
