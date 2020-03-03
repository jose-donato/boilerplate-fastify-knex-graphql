require('dotenv').config({ path: '.env' });

const dbUsername = process.env.DBUSERNAME || 'postgres';
const dbPassword = process.env.DBPASSWORD || 'postgres';
const dbHost = process.env.DBHOST || 'localhost';
const dbPort = process.env.DBPORT || '5432';
const dbName = process.env.DBNAME || 'boilerplate-db';

module.exports = {
  development: {
    client: 'pg',
    connection: `postgres://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
  },

  /*staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },*/
};
