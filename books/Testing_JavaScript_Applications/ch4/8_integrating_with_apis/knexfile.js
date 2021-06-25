require('dotenv').config();

module.exports = {
    test: {
        client: 'pg',
        connection: process.env.TEST_DB_URL,
        useNullAsDefault: true,
    },
    development: {
        client: 'pg',
        connection: process.env.DEV_DB_URL,
        useNullAsDefault: true,
    },
};
