const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    topics: [String]!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addTopic(userId: ID!, topic: String!): User
    removeUser: User
    removeTopic(topic: String!): User
  }
`;

module.exports = typeDefs;
