import { ReactElement } from "react";

import { useColumnsStyles } from "./style";
import { ColumnProps } from "./types";

export function Column<D>({
  label,
  fit = false,
}: ColumnProps<D>): ReactElement {
  const styles = useColumnsStyles();
  return (
    <th css={[styles.th, (fit && styles.fit) || null]} scope="col">
      {label}
    </th>
  );
}
