# 🚀 Boilerplate for backend with performance in mind (fastify, knex and GraphQL) 

## Technologies used:
1. [Fastify](https://www.fastify.io/): Fast and low overhead web framework, for Node.js
2. [Knex](http://knexjs.org/): A query builder for PostgreSQL, MySQL and SQLite3, designed to be flexible, portable, and fun to use.
3. [Fastify-gql](https://github.com/mcollina/fastify-gql): Fastify barebone GraphQL adapter

## Features
This boilerplate includes:
* Schema (in migrations folder) for creating one table of people with columns: name, email and phone
* Endpoint for graphiql in [http://localhost:3000/graphiql](http://localhost:3000/graphiql)
* GraphQL resolvers to get one person or people from database and adding new people
* Normal rest endpoints for the same purpose (code in src/index.js)

Note that if you don't want to use GraphQL I have created a branch named `no-graphql` with the version without it.


## Usage
1. Clone repo
```bash
git clone https://github.com/jose-donato/boilerplate-fastify-knex-graphql.git && cd boilerplate-fastify-knex-graphql
```
2. Install dependencies
```bash
$ npm install
```
3. Run latest knex migrations (create tables)
```bash
$ npm run knex:migrate
```
4. Seed database (insert data in tables)
```bash
npm run knex:seed
```
5. Run server
```bash
$ npm run start
```

## Directory structure
```txt
|   knexfile.js       knex.js: config file
|   migrations/       GraphQL: schemas for knex.js (where you create tables)
|   |   +---people.js
|   package.json
|   +---seeds/        knex.js: seeding tables
|   |   +---people.js
|   src/
|   +---graphql/      GraphQL: resolvers and schema
|   |   +---resolvers.js
|   |   +---schema.js
|   +---index.js      root file
```

## License
boilerplate-fastify-knex-graphql is available under the [MIT license](https://tldrlegal.com/license/mit-license).

## Contact
[![@icebob](https://img.shields.io/badge/github-icebob-green.svg)](https://github.com/jose-donato) [![@icebob](https://img.shields.io/badge/twitter-Icebobcsi-blue.svg)](https://twitter.com/whynot1__)
