import { ReactElement } from "react";

import { useEmptyTableStyles } from "./style";
import { EmptyTableProps } from "./types";

export function EmptyTable({ children, span }: EmptyTableProps): ReactElement {
  const styles = useEmptyTableStyles();
  return (
    <tr>
      <td css={styles.td} colSpan={span}>
        {children}
      </td>
    </tr>
  );
}
