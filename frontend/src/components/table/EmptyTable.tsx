import { ReactElement } from "react";

import { EmptyTableProps } from "./types";

export function EmptyTable({ children, span }: EmptyTableProps): ReactElement {
  return (
    <tr>
      <td colSpan={span}>{children}</td>
    </tr>
  );
}
