const { db } = require('./dbConnection');
const tablesToTruncate = ['users', 'inventory', 'carts'];

beforeEach(() => {
    return Promise.all(
        tablesToTruncate.map((table) => {
            return db(table).del();
        }),
    );
});
