
exports.up = function(knex) {
    return knex.schema.createTable('cities', function(table) {
        table.increments();
        table.string('city_name').notNullable();
        table.string('uf').notNullable();
        table.timestamp('create_date').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('cities');
};
