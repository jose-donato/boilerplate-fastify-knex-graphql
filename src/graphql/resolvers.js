const resolvers = {
  Query: {
    getPerson: async (_, obj, context) => {
      try {
        const result = await context.knex
          .from('people')
          .select('id', 'name', 'email', 'phone')
          .where({ id: obj.id });
        return result[0];
      } catch (err) {
        context.fastify.log.error(err);
        throw Error('Error in getPerson gql');
      }
    },
    getPeople: async (_, obj, context) => {
      try {
        const result = await context.knex
          .from('people')
          .select('id', 'name', 'email', 'phone');
        return result;
      } catch (err) {
        context.fastify.log.error(err);
        throw Error('Error in getPeople');
      }
    },
  },
  Mutation: {
    addPerson: async (_, obj, context) => {
      try {
        const result = await context.knex.from('people').insert({
          name: obj.name,
          email: obj.email,
          phone: obj.phone,
        });
        return result ? true : false;
      } catch (err) {
        context.fastify.log.error(err);
        throw Error('Error in addPerson gql');
      }
    },
  },
};

module.exports = resolvers;
