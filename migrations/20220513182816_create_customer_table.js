/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable("customers", (table) => {
      table.bigIncrements("id");
      table.string("name");
      table.string("organizationNumber");
      table.string("city");
      table.string("address");
      table.integer("postalCode");
      table.boolean("isActive");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("customers")
};
