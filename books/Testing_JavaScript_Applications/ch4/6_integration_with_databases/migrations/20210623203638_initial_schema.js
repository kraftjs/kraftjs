exports.up = async function (knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id', { primaryKey: true });
        table.string('username');
        table.unique('username');
        table.string('email');
        table.string('passwordHash');
    });

    await knex.schema.createTable('carts', (table) => {
        table.integer('userId').references('users.id').onDelete('CASCADE');
        table.string('itemName');
        table.unique('itemName');
        table.integer('quantity');
    });

    await knex.schema.createTable('inventory', (table) => {
        table.increments('id');
        table.string('itemName');
        table.unique('itemName');
        table.integer('quantity');
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable('inventory');
    await knex.schema.dropTable('carts');
    await knex.schema.dropTable('users');
};
