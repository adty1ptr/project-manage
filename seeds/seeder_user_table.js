/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, name: 'rato', email: 'rato@some.se', password: '$2b$12$53nBy42vrHGwbAnA26X/Y.A9yGq4P0HE.qTdycVMoJozz46AsJO1e'},
    {id: 2, name: 'budi', email: 'budi@some.se', password: '$2b$12$53nBy42vrHGwbAnA26X/Y.A9yGq4P0HE.qTdycVMoJozz46AsJO1e'},
    {id: 3, name: 'isan', email: 'isan@some.se', password: '$2b$12$53nBy42vrHGwbAnA26X/Y.A9yGq4P0HE.qTdycVMoJozz46AsJO1e'},
  ]);
};
