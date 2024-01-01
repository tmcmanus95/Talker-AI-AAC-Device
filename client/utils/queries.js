import { gql } from "@apollo/client";

export const QUERY_SINGLE_PROFILE = gql`
  query Query($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      savedTopics {
        topic {
          _id
          createdAt
          promptText
          responses {
            _id
            responseText
          }
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  query Query {
    me {
      _id
      username
      email
      password
      savedTopics {
        topic {
          _id
          createdAt
          promptText
          responses {
            _id
            responseText
            imageURL
          }
        }
      }
    }
  }
`;
