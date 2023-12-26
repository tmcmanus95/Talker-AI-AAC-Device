const { User, Topic } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // user: async (parent, { userId }) => {
    //   return User.findOne({ _id: userId });
    // }, // I don't think we will need this.
    me: async (parent, args, context) => {
      consolg.log("context, ", context);

      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    // Add a third argument to the resolver to access data in our `context`
    addTopic: async (parent, { userId, topic }, context) => {
      consolg.log("context, ", context);
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { topics: topic },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw AuthenticationError;
    },
    // Make it so a logged in user can only remove a skill from their own profile
    removeTopic: async (parent, { topic }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { topics: topic } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    addResponse: async (parent, { topicId, response }, context) => {
      return Topic.findOneAndUpdate(
        { _id: topicId },
        {
          $addToSet: { responses: response },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeResponse: async (parent, { response }, context) => {
      return Topic.findOneAndUpdate(
        { _id: topic.id },
        { $pull: { responses: response } },
        { new: true }
      );
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
