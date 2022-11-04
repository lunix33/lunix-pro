import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useQuery, gql } from "@apollo/client";

import Table from "@c/table";

import { UsersData } from "./types";

export function Users(): ReactElement {
  const { query } = useRouter();
  const { loading, data, fetchMore } = useQuery<{
    users: { getUsers: UsersData[] };
  }>(
    gql`
      query Users($withDeleted: Boolean!, $offset: Int!, $limit: Int!) {
        users {
          getUsers(
            withDeleted: $withDeleted
            page: { offset: $offset, limit: $limit }
          ) {
            username
            displayName
            createdOn
          }
        }
      }
    `,
    {
      variables: {
        withDeleted: query.deleted === "true",
        offset: 0,
        limit: 5,
      },
    }
  );

  return (
    <Table
      data={[
        {
          username: "john",
          displayName: "John Doe",
          createdOn: "2022-01-10T22:33:00",
        },
        {
          username: "joe",
          displayName: "Joe Doe",
          createdOn: "2022-10-10T13:00:00",
        },
        ,
        {
          username: "Jane",
          displayName: "Jane Doe",
          createdOn: "2022-08-3T08:45:00",
        },
        {
          username: "Gill",
          displayName: "Gill Doe",
          createdOn: "2022-02-24T13:22:00",
        },
        ,
        {
          username: "Handry",
          displayName: "Hanry Doe",
          createdOn: "2022-04-10T16:44:00",
        },
      ]}
      caption="List of users"
      columns={[
        { dataValue: "username", label: "Username" },
        { dataValue: "displayName", label: "Display name" },
        {
          dataValue: "createdOn",
          label: "Created on",
        },
        {
          render: (v, a) => "some",
          fit: true,
        },
      ]}
      emptyTable="Oups no data :("
    />
  );
}
