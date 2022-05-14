/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable("users", (table) => {
      table.increments("id");
      table.string("name");
      table.string("email");
      table.string("password");
      table.string("workerId");
      table.boolean("isActive");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users")
};
