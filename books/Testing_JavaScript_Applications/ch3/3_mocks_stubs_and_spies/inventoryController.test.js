const logger = require('./logger');
const { inventory, addToInventory, getInventory } = require('./inventoryController');

// when you have direct references to an import, i.e.:
// const {logInfo, logError} = require('./logger');
// the jest.mock() allows you to determine what should be given back when modules are imported.
jest.mock('./logger', () => {
    const originalImport = jest.requireActual('./logger');
    const partiallyMockedImport = { logInfo: jest.fn(), logError: jest.fn() };
    return { ...originalImport, ...partiallyMockedImport };
});

beforeEach(() => inventory.clear());

// wrap the logger's logInfo method into a spy and use mockImplementation() to avoid polluting
// your test’s output. Replace the logger.logInfo function’s implementation with a dummy function.
// This is done by passing a dummy function created by jest.fn() to the mockImplementation method.
beforeAll(() => jest.spyOn(logger, 'logInfo').mockImplementation(jest.fn()));
beforeAll(() => jest.spyOn(logger, 'logError').mockImplementation(jest.fn()));

afterEach(() => jest.clearAllMocks());
// or instead of jest.clearAllMocks(), create hooks for each logger property
// afterEach(() => logger.logInfo.mockClear());
// afterEach(() => logger.logError.mockClear());

describe('addToInventory', () => {
    beforeEach(() => {
        // replaces the process’s memoryUsage function with a test double that returns an object
        // containing static values
        jest.spyOn(process, 'memoryUsage').mockReturnValue({ rss: 123456, heapTotal: 1, heapUsed: 2, external: 3 });
    });

    test('logging new items', () => {
        // addToInventory calls logger.logInfo which has been wrapped in a spy
        addToInventory('cheesecake', 3);

        // Each new call to logger.logInfo adds a new record to logger.logInfo.mock.calls
        // if you want to ensure that logger.logInfo is called only once, you can assert
        // on the length of logger.logInfo.mock.calls
        expect(logger.logInfo.mock.calls).toHaveLength(1);

        // the property that contains the records with each call’s information is mock
        const firstCallArgs = logger.logInfo.mock.calls[0];
        const [firstArg, secondArg] = firstCallArgs;

        // Expects the information registered by the logger’s logInfo function to include the
        // memory in the object returned by the test double specified in the mockReturnValue()
        expect(firstArg).toEqual({ item: 'cheesecake', quantity: 3, memoryUsage: 123456 });
        expect(secondArg).toEqual('item added to the inventory');
    });

    test('logging errors', () => {
        expect(() => addToInventory('cheesecake', 'not a number')).toThrow();
        expect(logger.logError.mock.calls).toHaveLength(1);

        const firstCallArgs = logger.logError.mock.calls[0];
        const [firstArg, secondArg] = firstCallArgs;

        expect(firstArg).toEqual({ quantity: 'not a number' });
        expect(secondArg).toEqual('could not add item to inventory because quantity was not a number');
    });
});

describe('getInventory', () => {
    test('logging fetches', () => {
        inventory.set('cheesecake', 2);
        getInventory();

        expect(logger.logInfo.mock.calls).toHaveLength(1);

        const firstCallArgs = logger.logInfo.mock.calls[0];
        const [firstArg, secondArg] = firstCallArgs;

        expect(firstArg).toEqual({ contents: { cheesecake: 2 } });
        expect(secondArg).toEqual('inventory items fetched');
    });
});
