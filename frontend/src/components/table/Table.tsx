import { ReactElement } from "react";

import { EmptyTable } from "./EmptyTable";
import { Column } from "./Column";
import { TableRow } from "./TableRow";

import { tableStyles } from "./style";
import { TableProps } from "./types";

export function Table<D>({
  // children,
  data = [],
  caption,
  columns = [],
  emptyCell,
  emptyTable,
  className,
}: TableProps<D>): ReactElement {
  return (
    <div css={tableStyles.scroll}>
      <table className={className} css={tableStyles.table}>
        <>
          <caption css={tableStyles.caption}>{caption}</caption>
          <thead>
            <tr css={tableStyles.thead}>
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
        </>
      </table>
    </div>
  );
}
