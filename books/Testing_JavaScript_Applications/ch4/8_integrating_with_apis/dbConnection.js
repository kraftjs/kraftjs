const nodeEnv = process.env.NODE_ENV || 'test';
const knexConfig = require('./knexfile')[nodeEnv];
const db = require('knex')(knexConfig);

module.exports = { db };
