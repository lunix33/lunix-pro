import { ReactElement } from "react";

import { columnsStyles } from "./style";
import { ColumnProps } from "./types";

export function Column<D>({
  label,
  fit = false,
}: ColumnProps<D>): ReactElement {
  return (
    <th
      css={[columnsStyles.th, (fit && columnsStyles.fit) || null]}
      scope="col"
    >
      {label}
    </th>
  );
}
