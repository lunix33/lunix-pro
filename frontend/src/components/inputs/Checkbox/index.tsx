"use client";

import { ReactElement } from "react";
import cls from "classnames";

import { CheckboxProps } from "./types";
import classes from "./styles.module.scss";

export default function Checkbox({
  name,
  label,
  id,
  checked,
  className,
  ...props
}: CheckboxProps): ReactElement {
  return (
    <label className={cls(classes.label, className)}>
      <input
        id={id ?? name}
        name={name}
        checked={checked}
        type="checkbox"
        {...props}
      />
      {label}
    </label>
  );
}

export type { CheckboxProps };
