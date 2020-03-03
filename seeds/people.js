module.exports.seed = (knex, Promise) => {
  return knex('people').insert({
    name: 'Andrea',
    email: 'andrea@gmail.com',
    phone: 123,
  });
};
