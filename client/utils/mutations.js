import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
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
  mutation addTopic($userId: ID!, $skill: String!) {
    addTopic(profileId: $userId, skill: $skill) {
      _id
      username
      topic
    }
  }
`;

export const ADD_RESPONSE = gql`
  mutation addResponse($topicId: ID!, $response: String!) {
    addResponse(topicId: $topicId, response: $response) {
      _id
      topic
      response
    }
  }
`;

export const REMOVE_TOPIC = gql`
  mutation removeTopic($topic: String!) {
    removeTopic(topic: $topic) {
      _id
      name
      topics
    }
  }
`;

export const REMOVE_RESPONSE = gql`
  mutation removeResponse($response: String!) {
    removeResponse(response: $response) {
      _id
      topic
      responses
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
