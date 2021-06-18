const { inventory, addToInventory, getInventory } = require('./inventoryController');

beforeEach(() => inventory.set('cheesecake', 0));

// assertion counting is not always practical. A simpler and more readable alternative is to check
// whether a function call throws an error.
test('cancels operation for invalid quantities', () => {
    expect(() => addToInventory('cheesecake', 'not a number')).toThrow();
    expect(inventory.get('cheesecake')).toBe(0);
    expect(Array.from(inventory.entries())).toHaveLength(1);
});

test('returned value', () => {
    inventory.clear();
    const result = addToInventory('cheesecake', 2);
    expect(typeof result).toBe('number');
});

test('inventory contents', () => {
    inventory.clear();
    inventory.set('cheesecake', 1).set('macarroon', 3).set('croissant', 3).set('eclaire', 7);
    const result = getInventory();

    expect(result).toEqual({
        cheesecake: 1,
        macarroon: 3,
        croissant: 3,
        eclaire: 7,
        generatedAt: expect.any(Date),
    });
});

// use the toBeBefore assertion, from the jest-extended module, which checks
// whether a Date is before another
test('generatedAt in the past', () => {
    const result = getInventory();
    const currentTime = new Date(Date.now() + 1);

    expect(result.generatedAt).toBeBefore(currentTime);
});

// This test will pass, but you won’t know whether it passed because the addToInventory function
// didn’t add an item to the inventory or because it didn’t throw any errors.
//
// test('cancels operation for invalid quantities', () => {
//     try {
//         addToInventory('cheesecake', 'not a number');
//     } catch (e) {
//         expect(inventory.get('cheesecake')).toBe(0);
//     }
// });

// To guarantee that your test will run assertions, you can use expect.hasAssertions, which will
// cause your test to fail if the test doesn’t run at least one assertion. Using expect.assertions
// will cause your tests to fail whenever the number of assertions executed doesn’t match what you
// determined.

// test('cancels operation for invalid quantities', () => {
//     expect.assertions(2);
//
//     try {
//         addToInventory('cheesecake', 'not a number');
//     } catch (e) {
//         expect(inventory.get('cheesecake')).toBe(0);
//     }
//
//     expect(Array.from(inventory.entries())).toHaveLength(1)
// });
