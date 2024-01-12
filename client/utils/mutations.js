import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TOPIC = gql`
  mutation Mutation($userId: ID!, $topic: String!) {
    addTopic(userId: $userId, topic: $topic) {
      savedTopics {
        topic {
          promptText
          _id
        }
      }
    }
  }
`;

export const ADD_RESPONSE = gql`
  mutation Mutation($topicId: ID!, $responseText: String, $imageURL: String) {
    addResponse(
      topicId: $topicId
      responseText: $responseText
      imageURL: $imageURL
    ) {
      _id
    }
  }
`;

export const REMOVE_TOPIC = gql`
  mutation Mutation($topicId: ID!) {
    removeTopic(topicId: $topicId) {
      _id
      savedTopics {
        topic {
          _id
        }
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
