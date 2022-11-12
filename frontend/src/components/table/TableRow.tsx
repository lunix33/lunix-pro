import { ReactElement } from "react";

import { Cell } from "./Cell";

import { useRowStyles } from "./style";
import { TableRowProps } from "./types";

export function TableRow<D = any>({
  data,
  emptyCell,
  headers,
}: TableRowProps<D>): ReactElement {
  const styles = useRowStyles();
  return (
    <tr css={styles.tr}>
      {headers.map((h, idx) => (
        <Cell key={idx} data={data} header={h} empty={emptyCell} />
      ))}
    </tr>
  );
}
