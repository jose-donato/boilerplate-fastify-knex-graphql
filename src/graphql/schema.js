const schema = `
  type Person {
    id: String!
    name: String!
    email: String!
    phone: Int!
  }

  type Query {
    getPerson(id: String): Person! 
	getPeople: [Person!]!
  }

  type Mutation {
    addPerson(name: String, email: String, phone: Int): Boolean!
  }
`;
module.exports = schema;
