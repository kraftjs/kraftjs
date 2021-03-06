const crypto = require('crypto');

const users = new Map();

const hashPassword = (password) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
};

const credentialsAreValid = (username, password) => {
    const userExists = users.has(username);
    if (!userExists) return false;

    const currentPasswordhash = users.get(username).passwordHash;
    return hashPassword(password) === currentPasswordhash;
};

const authenticationMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const credentials = Buffer.from(authHeader.slice('basic'.length + 1), 'base64').toString();
        const [username, password] = credentials.split(':');

        if (!credentialsAreValid(username, password)) {
            throw new Error('invalid credentials');
        }
    } catch (e) {
        return res.status(401).send({ message: 'please provide valid credentials' });
    }

    next();
};

module.exports = {
    users,
    hashPassword,
    credentialsAreValid,
    authenticationMiddleware,
};
