import { gql } from "@apollo/client";

export const usersQuery = gql`
  query Users($withDeleted: Boolean!, $offset: Int!, $limit: Int!) {
    users {
      getUsers(
        withDeleted: $withDeleted
        page: { offset: $offset, limit: $limit }
      ) {
        count
        data {
          username
          displayName
          createdOn
          deletedOn @include(if: $withDeleted)
        }
      }
    }
  }
`;
