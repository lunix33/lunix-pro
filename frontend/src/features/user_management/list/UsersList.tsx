"use client";

import { useRouter } from "next/router";
import Link from "next/link";
import { ChangeEvent, ReactElement, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { useTranslation } from "next-i18next";

import Table, { ColumnProps, PageOptions } from "@c/table";
import Checkbox from "@c/inputs/Checkbox";
import Icon from "@c/icon";
import { PagedData } from "@c/types";

import { UsersData } from "./types";
import { usersQuery } from "./queries";
import classes from "./styles.module.scss";

export function UsersList(): ReactElement {
  const { t } = useTranslation("admin");
  const router = useRouter();
  const withDeleted = router.query.withDeleted === "true";

  // Page state.
  const [pageOptions, setPageOptions] = useState<PageOptions>({
    count: 0,
    offset: 0,
    limit: 10,
    onPageChange: (newOffset) => {
      fetchMore({
        variables: {
          offset: newOffset,
        },
      });
      setPageOptions((o) => ({ ...o, offset: newOffset }));
    },
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
    onCompleted: (data) => {
      setPageOptions((u) => ({
        ...u,
        count: data?.users.getUsers.count ?? 0,
      }));
    },
  });

  // Columns
  const columns = useMemo(() => {
    const cols: ColumnProps<UsersData>[] = [
      {
        dataValue: "username",
        label: t("models.user.username"),
      },
      {
        dataValue: "displayName",
        label: t("models.user.displayName"),
      },
      {
        dataValue: "createdOn",
        label: t("models.createdOn"),
      },
    ];

    if (withDeleted) {
      cols.push({
        dataValue: "deletedOn",
        label: t("models.deletedOn"),
      });
    }

    cols.push({
      render: (_v, u) => (
        <div className={classes.actions}>
          <Link title="edit" href={`/admin/users/${u.username}`}>
            <Icon icon="pen" />
          </Link>
          <Icon icon="trash" />
        </div>
      ),
      fit: true,
    });
    return cols;
  }, [t, withDeleted]);

  const handleWithDeletedChange = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    router.query.withDeleted = String(checked);
    router.push(router);
  };

  return (
    <div>
      <p>
        <Link href="/admin">{`< ${t("pages.home.title")}`}</Link>
      </p>
      <h1>{t("pages.usersList.title")}</h1>
      <Table
        data={data?.users.getUsers.data}
        caption={t("pages.usersList.tableCaption")}
        headerContent={
          <div>
            <Checkbox
              name="with_deleted"
              checked={withDeleted}
              label={t("pages.showDeleted")}
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
        page={pageOptions}
      />
    </div>
  );
}
