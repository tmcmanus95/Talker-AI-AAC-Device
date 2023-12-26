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
    me: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    
    addTopic(userId: ID!, topic: String!): User
    addResponse(topicId: ID!, response: String!): Topic
    removeUser: User
    removeTopic(topic: String!): User
    removeResponse(response: String!): Topic
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
