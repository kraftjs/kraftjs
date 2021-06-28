exports.up = function (knex) {
    return knex.schema.alterTable('carts', (table) => {
        table.timestamp('updatedAt');
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('carts', (table) => {
        table.dropColumn('updatedAt');
    });
};
