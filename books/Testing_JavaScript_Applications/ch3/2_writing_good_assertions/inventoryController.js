const inventory = new Map();

const addToInventory = (item, n) => {
    if (typeof n !== 'number') throw new Error('quantity must be a number');
    const currentQuantity = inventory.get(item) || 0;
    const newQuantity = currentQuantity + n;
    inventory.set(item, newQuantity);
    return newQuantity;
};

const getInventory = () => {
    const contentArray = Array.from(inventory.entries());

    // Creates an object whose keys are the inventory item’s names and whose values are each
    // item’s respective quantities
    const contents = contentArray.reduce((contents, [name, quantity]) => {
        return { ...contents, [name]: quantity };
    }, {});

    return { ...contents, generatedAt: new Date() };
};

module.exports = { inventory, addToInventory, getInventory };
