require("dotenv").config({ path: ".env" });

const fastify = require("fastify")({
  logger: true
});
const development = require("../knexfile").development;

const fastifyGql = require("fastify-gql");

const resolvers = require("./graphql/resolvers");
const schema = require("./graphql/schema");

(async () => {
  try {
    const knex = require("knex")(development);

    //REST

    fastify.get("/", async (req, res) => {
      return { hello: "world" };
    });

    fastify.get("/add-person", async (req, res) => {
      try {
        const result = await knex("people").insert([
          { name: "John", phone: 913, email: "albert@email.com" },
          { name: "Albert" }
        ]);
      } catch (err) {
        fastify.log.error(err);
      }
      return { result: "success" };
    });
    fastify.post("/add-custom-person", async (req, res) => {
      try {
        const { name, email, phone } = req.body;
        const result = await knex("people").insert({ name, phone, email });
      } catch (err) {
        fastify.log.error(err);
      }
      return { result: "success" };
    });

    fastify.get("/person/:id", async (req, res) => {
      let result = null;
      try {
        result = await knex
          .from("people")
          .select("name")
          .where("id", req.params.id);
      } catch (err) {
        fastify.log.error(err);
      }
      return { result };
    });
    fastify.get("/people", async (req, res) => {
      let result = null;
      try {
        result = await knex
          .from("people")
          .select("id", "name", "email", "phone");
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
          fastify: fastify
        };
      }
    });

    await fastify.listen(3000, "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
