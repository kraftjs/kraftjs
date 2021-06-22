const {inventory, removeFromInventory} = require('./inventoryController')

afterEach(() => inventory.clear());

describe('removeFromInventory', () => {
    test('removing available item from inventory', () => {
        inventory.set('cheesecake', 1);
        removeFromInventory('cheesecake');

        expect(inventory.get('cheesecake')).toBe(0);
    })

    test('removing unavailable item from inventory', () => {
        inventory.set('cheesecake', 0);

        try {
            removeFromInventory('cheesecake');
        } catch (e) {
            const expectedError = new Error('cheesecake is unavailable')
            expectedError.code = 400;

            expect(e).toEqual(expectedError);
        }

        expect(inventory.get('cheesecake')).toBe(0);
        expect.assertions(2);
    })
})