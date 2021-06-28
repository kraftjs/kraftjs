const fs = require('fs');

const init = (filepath) => {
    const getState = () => {
        return parseInt(fs.readFileSync(filepath, 'utf-8'), 10);
    };
    const setState = (n) => fs.writeFileSync(filepath, n.toString());
    const increment = () => fs.writeFileSync(filepath, (getState() + 1).toString());
    const decrement = () => fs.writeFileSync(filepath, (getState() - 1).toString());

    return { getState, setState, increment, decrement };
};
module.exports = { init };
