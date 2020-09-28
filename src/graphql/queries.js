import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query repo($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String){
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after){
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
    pageInfo {
      endCursor
      startCursor
      totalCount
      hasNextPage
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

export const AUTHORIZED_USER_REVIEWS = gql`
query{
  authorizedUser {
    id
    username
    reviews {
      edges {
        node {
          id
          rating
          createdAt
          text
          repositoryId
          repository{
            url
          }
        }
      }
    }
  }
}
`;

export const GET_SINGLE_REPO = gql`
query single($id: ID!, $first: Int, $after: String){
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
    reviews(first: $first, after: $after) {
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
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
}
`