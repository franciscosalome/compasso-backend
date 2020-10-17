
exports.up = function(knex) {
    return knex.schema.createTable('customers', function(table) {
        table.increments();
        table.string('name').notNullable();
        table.string('gender').notNullable();
        table.timestamp('date_of_birth').notNullable();
        table.integer('city_id').unsigned()
        table.foreign('city_id').references('cities.id')
        table.timestamp('create_date').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('customers');
};
