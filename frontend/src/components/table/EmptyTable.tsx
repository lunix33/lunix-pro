import { ReactElement } from "react";

import { emptyTableStyles } from "./style";
import { EmptyTableProps } from "./types";

export function EmptyTable({ children, span }: EmptyTableProps): ReactElement {
  return (
    <tr>
      <td css={emptyTableStyles.td} colSpan={span}>
        {children}
      </td>
    </tr>
  );
}
