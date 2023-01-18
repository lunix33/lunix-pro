"use client";

import { ReactElement } from "react";

import { EmptyTableProps } from "./types";
import classes from "./styles.module.scss";

export function EmptyTable({ children, span }: EmptyTableProps): ReactElement {
  return (
    <tr>
      <td className={classes.empty_table} colSpan={span}>
        {children}
      </td>
    </tr>
  );
}
