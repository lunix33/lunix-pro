"use client";

import { ReactElement, isValidElement, ReactNode, useMemo } from "react";
import cls from "classnames";

import { CellProps } from "./types";
import classes from "./styles.module.scss";

export function Cell<D>({
  data,
  header,
  empty = null,
}: CellProps<D>): ReactElement {
  // const { transform } = header.props;
  const {
    render,
    dataValue,
    fit = false,
    textAlign = "left",
    mobileTextAlign = textAlign,
    label,
  } = header;
  const raw = dataValue != null ? data[dataValue] : undefined;

  const display = useMemo(() => {
    if (render != null) return render(raw, data);
    if (raw == null || isValidElement(raw)) return raw as ReactNode;
    return String(raw);
  }, [render, data, raw]);

  return (
    <td
      className={cls(
        classes.cell,
        fit && classes.fit,
        label == null && classes.no_label,
        empty == null && display == null && classes.hide
      )}
      data-label={header.label}
      data-align={textAlign}
      data-mobile-align={mobileTextAlign}
    >
      {display == null ? empty : display}
    </td>
  );
}
