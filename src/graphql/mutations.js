import { gql } from 'apollo-boost';

export const SIGN_IN = gql`
mutation login($username: String!, $password: String!){
  authorize(credentials: { username: $username, password: $password }) {
    accessToken
  }
}
`;

export const NEW_REVIEW = gql`
mutation createReview($owner: String!, $name: String!, $rating: Int!, $review: String){
  createReview(review: { ownerName: $owner, repositoryName: $name, rating: $rating, text: $review }) {
    repositoryId
  }
}
`;