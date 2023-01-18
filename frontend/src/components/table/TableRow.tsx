"use client";

import { ReactElement } from "react";

import { Cell } from "./Cell";

import { TableRowProps } from "./types";
import classes from "./styles.module.scss";

export function TableRow<D = any>({
  data,
  emptyCell,
  headers,
}: TableRowProps<D>): ReactElement {
  return (
    <tr className={classes.row}>
      {headers.map((h, idx) => (
        <Cell key={idx} data={data} header={h} empty={emptyCell} />
      ))}
    </tr>
  );
}
