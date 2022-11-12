import { ReactElement } from "react";

import { EmptyTable } from "./EmptyTable";
import { Column } from "./Column";
import { TableRow } from "./TableRow";

import { useTableStyles } from "./style";
import { TableProps } from "./types";
import { Pager } from "./Pager";

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
  const styles = useTableStyles();
  return (
    <div css={styles.scroll}>
      <table className={className} css={styles.table}>
        <>
          <caption css={styles.caption}>{caption}</caption>
          <thead css={styles.thead}>
            {headerContent && (
              <tr>
                <td colSpan={columns.length} css={styles.headContent}>
                  {headerContent}
                </td>
              </tr>
            )}
            <tr css={styles.headers}>
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
