const { User, Topic, Response } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    topics: async () => {
      return Topic.find();
    },

    topic: async (parent, { topicId }) => {
      return Topic.findOne({ _id: topicId });
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
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      // if (context.user) {
      try {
        // Create a new Topic document
        const newTopic = await Topic.create({ promptText: topic });

        // Update the user with the new topic
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            $addToSet: { topics: newTopic._id },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        return updatedUser;
      } catch (error) {
        console.error(error);
        // Handle any errors, e.g., validation errors
        throw new Error("Failed to add topic to user");
      }
    },
    // If user attempts to execute this mutation and isn't logged in, throw an error
    // throw AuthenticationError;
    // },
    // Make it so a logged in user can only remove a skill from their own profile
    removeTopic: async (parent, { topicId }, context) => {
      // if (context.user) {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { topic: topicId } },
        { new: true }
      );
      // }
      // throw AuthenticationError;
    },
    addResponse: async (parent, { topicId, response }, context) => {
      try {
        // Create a new Response document
        const newResponse = await Response.create({ responseText: response });

        // Update the topic with the new response
        const updatedTopic = await Topic.findByIdAndUpdate(
          topicId,
          {
            $addToSet: { responses: newResponse }, // Use the newResponse directly
          },
          {
            new: true,
            runValidators: true,
          }
        );

        return updatedTopic;
      } catch (error) {
        console.error(error);
        // Handle any errors, e.g., validation errors
        throw new Error("Failed to add response to Topic");
      }
    },
    removeResponse: async (parent, { response }, context) => {
      return Topic.findOneAndUpdate(
        { _id: topicId },
        { $pull: { responses: response } },
        { new: true }
      );
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
