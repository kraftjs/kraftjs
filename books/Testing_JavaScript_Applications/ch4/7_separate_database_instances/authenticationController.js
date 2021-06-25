const { db } = require('./dbConnection');
const crypto = require('crypto');

const hashPassword = (password) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
};

const credentialsAreValid = async (username, password) => {
    const user = await db('users').select().where({ username }).first();
    if (!user) return false;
    return hashPassword(password) === user.passwordHash;
};

const authenticationMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const credentials = Buffer.from(authHeader.slice('basic'.length + 1), 'base64').toString();
        const [username, password] = credentials.split(':');

        const credentialsAreValidResponse = await credentialsAreValid(username, password);

        if (!credentialsAreValidResponse) throw new Error('invalid credentials');
    } catch (e) {
        return res.status(401).send({ message: 'please provide valid credentials' });
    }

    next();
};

module.exports = {
    hashPassword,
    credentialsAreValid,
    authenticationMiddleware,
};
