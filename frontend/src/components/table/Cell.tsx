import { ReactElement, isValidElement, ReactNode, useMemo } from "react";

import { cellStyles, mobileBreakpoint } from "./style";
import { CellProps } from "./types";

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
      data-label={header.label}
      css={[
        (theme) => ({
          textAlign,
          [theme.breakpoints.down(mobileBreakpoint)]: {
            textAlign: mobileTextAlign,
          },
        }),
        cellStyles.td,
        fit && cellStyles.fit,
        label == null && cellStyles.noLabel,
        empty == null && display == null && cellStyles.hide,
      ]}
    >
      {display == null ? empty : display}
    </td>
  );
}
