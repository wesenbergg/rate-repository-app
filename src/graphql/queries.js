import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query repo($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String){
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword){
    edges{
      node{
        id
        name
        ownerName
        createdAt
        fullName
        reviewCount
        ratingAverage
        forksCount
        stargazersCount
        description
        language
        ownerAvatarUrl
      }
    }
  }
}
`;

export const AUTHORIZED_USER = gql`
query{
  authorizedUser {
    id
    username
  }
}
`;

export const GET_SINGLE_REPO = gql`
query single($id: ID!){
  repository(id: $id) {
    id
    name
    ownerName
    createdAt
    fullName
    reviewCount
    ratingAverage
    forksCount
    stargazersCount
    description
    language
    ownerAvatarUrl
    url
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`