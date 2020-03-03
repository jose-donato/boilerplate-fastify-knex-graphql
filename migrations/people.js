exports.up = (knex, Promise) => {
  return knex.schema.createTable("people", table => {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.integer("phone");
    table.string("email", 100);
    table
      .timestamp("date")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  knex.raw('drop extension if exists "uuid-ossp"');
  return knex.schema.dropTableIfExists("people");
};
