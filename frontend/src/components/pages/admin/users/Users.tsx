import { useRouter } from "next/router";
import Link from "next/link";
import { ChangeEvent, ReactElement, useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { useTranslation } from "next-i18next";

import Table, { ColumnProps, PageOptions } from "@c/table";
import { PagedData } from "@c/types";
import Icon from "@c/icon";
import Checkbox from "@c/inputs/Checkbox";

import { UsersData } from "./types";
import { usersQuery } from "./queries";
import { useStyles } from "./styles";

export function Users(): ReactElement {
  const styles = useStyles();
  const { t } = useTranslation("admin");
  const { query, push } = useRouter();
  const withDeleted = query.withDeleted === "true";

  // Page state.
  const [pageOptions, setPageOptions] = useState<
    Omit<PageOptions, "onPageChange">
  >({
    count: 0,
    offset: 0,
    limit: 10,
  });

  // Data query.
  const { loading, data, fetchMore } = useQuery<{
    users: { getUsers: PagedData<UsersData> };
  }>(usersQuery, {
    variables: {
      withDeleted,
      offset: pageOptions.offset,
      limit: pageOptions.limit,
    },
  });

  useEffect(() => {
    setPageOptions((u) => ({
      ...u,
      count: data?.users.getUsers.count ?? 0,
    }));
  }, [data]);

  // Columns
  const columns = useMemo(() => {
    const cols: ColumnProps<UsersData>[] = [
      {
        dataValue: "username",
        label: t("user.username"),
      },
      {
        dataValue: "displayName",
        label: t("user.displayName"),
      },
      {
        dataValue: "createdOn",
        label: t("commonFields.createdOn"),
      },
    ];

    if (withDeleted) {
      cols.push({
        dataValue: "deletedOn",
        label: t("commonFields.deletedOn"),
      });
    }

    cols.push({
      render: (_v, u) => (
        <div css={styles.actions}>
          <Link title="edit" href={`/admin/users/${u.username}`}>
            <Icon icon="pen" />
          </Link>
          <Icon icon="trash" />
        </div>
      ),
      fit: true,
    });
    return cols;
  }, [t, withDeleted, styles]);

  const handleWithDeletedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    push(encodeURI(`?withDeleted=${checked}`));
  };

  return (
    <div>
      <p>
        <Link href="/admin">{`< ${t("home")}`}</Link>
      </p>
      <Table
        css={(theme) => ({
          margin: `${theme.spacing(1)} auto`,
        })}
        data={data?.users.getUsers.data}
        caption={t("userTableCaption")}
        headerContent={
          <div>
            <Checkbox
              name="with_deleted"
              checked={withDeleted}
              label={t("showDeleted")}
              onChange={handleWithDeletedChange}
            />
          </div>
        }
        columns={columns}
        emptyTable={
          loading
            ? t("loading_table", { ns: "common" })
            : t("empty_table", { ns: "common" })
        }
        emptyCell={t("empty_table_cell", { ns: "common" })}
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
