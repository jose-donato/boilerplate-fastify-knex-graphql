require('dotenv').config({ path: '.env' });
console.log(process.env.DBUSERNAME);

const fastify = require('fastify')({
  logger: true,
});
const development = require('./knexfile').development;

const fastifyGql = require('fastify-gql');

const resolvers = require('./graphql/resolvers');
const schema = require('./graphql/schema');

(async () => {
  try {
    const knex = require('knex')(development);

    //REST

    fastify.get('/', async (req, res) => {
      return { hello: 'world' };
    });

    fastify.get('/add-person', async (req, res) => {
      try {
        const result = await knex('people').insert([
          { name: 'John', phone: 913, email: 'albert@email.com' },
          { name: 'Albert' },
        ]);
        console.log(result);
      } catch (err) {
        fastify.log.error(err);
      }
      return { result: 'success' };
    });

    fastify.get('/person/:id', async (req, res) => {
      let result = null;
      try {
        result = await knex
          .from('people')
          .select('name')
          .where('id', req.params.id);
      } catch (err) {
        fastify.log.error(err);
      }
      return { result };
    });

    //GRAPHQL

    fastify.register(fastifyGql, {
      schema,
      resolvers,
      graphiql: true,
      jit: 1,
      context: (req, res) => {
        return {
          knex: knex,
          fastify: fastify,
        };
      },
    });

    fastify.get('/gql-query-addPerson', async function(req, reply) {
      const query =
        '{ addPerson(name: "Jose", email: "jose@email.com", phone: 20) }';
      return reply.graphql(query);
    });

    await fastify.listen(3000, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
