"use client";

import { ReactElement } from "react";
import cls from "classnames";

import { ColumnProps } from "./types";
import classes from "./styles.module.scss";

export function Column<D>({
  label,
  fit = false,
}: ColumnProps<D>): ReactElement {
  return (
    <th className={cls(classes.col, fit && classes.fit)} scope="col">
      {label}
    </th>
  );
}
