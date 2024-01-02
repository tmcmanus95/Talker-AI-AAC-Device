const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedTopics: [SavedTopic]
  }

  type SavedTopic {
    topic: Topic
    responses: [Response]!
  }

  type Topic {
    _id: ID
    createdAt: String
    promptText: String
    responses: [Response]
  }

  type Response {
    _id: ID
    responseText: String
    imageURL: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    me: User
    topics: [Topic]
    topic(topicId: ID!): Topic
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addTopic(userId: ID!, topic: String!): User
    removeUser: User
    removeTopic(topicId: ID!): User
    addResponse(topicId: ID!, responseText: String, imageURL: String): Topic
    removeResponse(responseId: ID!): Topic
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
