import { useRouter } from "next/router";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useTranslation } from "next-i18next";

import Table, { PageOptions } from "@c/table";
import { PagedData } from "@c/types";

import { GroupsData } from "./types";
import { groupsQuery } from "./queries";

export function GroupsList(): ReactElement {
  const { t } = useTranslation("admin");
  const { query, push } = useRouter();

  const [pageOptions, setPageOptions] = useState<
    Omit<PageOptions, "onPageChange">
  >({
    count: 0,
    offset: 0,
    limit: 10,
  });
  const { loading, data, fetchMore } = useQuery<{
    groups: { getGroups: PagedData<GroupsData> };
  }>(groupsQuery, {
    variables: {
      withDeleted: query.deletedGroups === "true",
      offset: pageOptions.offset,
      limit: pageOptions.limit,
    },
  });

  useEffect(() => {
    setPageOptions((o) => ({
      ...o,
      count: data?.groups.getGroups.count ?? 0,
    }));
  }, [data]);

  return (
    <div>
      <p>
        <Link href="/admin">{"< Admin home"}</Link>
      </p>

      <Table
        data={data?.groups.getGroups.data}
        caption="List of groups"
        columns={[
          { dataValue: "name", label: "Group name" },
          {
            dataValue: "createdOn",
            label: "Created on",
          },
          {
            render: (v, a) => "some",
            fit: true,
          },
        ]}
        emptyTable={loading ? "Loading table content..." : "Oups no data :("}
        emptyCell="<No data>"
        page={{
          ...pageOptions,
          onPageChange: (newOffset) => {
            fetchMore({
              variables: {
                offset: newOffset,
              },
            });
            setPageOptions((o) => ({ ...o, offset: newOffset }));
          },
        }}
      />
    </div>
  );
}
