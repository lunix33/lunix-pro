import { ReactElement } from "react";

import { Cell } from "./Cell";

import { rowStyles } from "./style";
import { TableRowProps } from "./types";

export function TableRow<D = any>({
  data,
  emptyCell,
  headers,
}: TableRowProps<D>): ReactElement {
  return (
    <tr css={rowStyles.tr}>
      {headers.map((h, idx) => (
        <Cell key={idx} data={data} header={h} empty={emptyCell} />
      ))}
    </tr>
  );
}
