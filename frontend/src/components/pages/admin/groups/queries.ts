import { gql } from "@apollo/client";

export const groupsQuery = gql`
  query Groups($withDeleted: Boolean!, $offset: Int!, $limit: Int!) {
    groups {
      getGroups(
        withDeleted: $withDeleted
        page: { offset: $offset, limit: $limit }
      ) {
        count
        data {
          name
          createdOn
          permissions
        }
      }
    }
  }
`;
