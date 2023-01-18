"use client";

import { ReactElement } from "react";
import cls from "classnames";

import { EmptyTable } from "./EmptyTable";
import { Column } from "./Column";
import { TableRow } from "./TableRow";

import { TableProps } from "./types";
import { Pager } from "./Pager";
import classes from "./styles.module.scss";

export function Table<D>({
  // children,
  data = [],
  caption,
  headerContent,
  columns = [],
  emptyCell,
  emptyTable,
  className,
  page,
}: TableProps<D>): ReactElement {
  return (
    <div className={cls(classes.table, className)}>
      <table>
        <>
          <caption>{caption}</caption>
          <thead>
            {headerContent && (
              <tr>
                <td className={classes.header_content} colSpan={columns.length}>
                  {headerContent}
                </td>
              </tr>
            )}
            <tr className={classes.headers}>
              {columns.map((c, idx) => (
                <Column key={idx} {...c} />
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <EmptyTable span={columns.length}>{emptyTable}</EmptyTable>
            ) : (
              data.map((row, idx) => (
                <TableRow
                  key={idx}
                  data={row}
                  emptyCell={emptyCell}
                  headers={columns}
                />
              ))
            )}
          </tbody>
          {page && <Pager span={columns.length} {...page} />}
        </>
      </table>
    </div>
  );
}
