import { ReactElement, isValidElement, ReactNode, useMemo } from "react";

import { cellStyles } from "./style";
import { CellProps } from "./types";

export function Cell<D>({
  data,
  header,
  empty = null,
}: CellProps<D>): ReactElement {
  // const { transform } = header.props;
  const { render, dataValue, fit = false } = header;
  const raw = dataValue != null ? data[dataValue] : undefined;

  const display = useMemo(() => {
    if (render != null) return render(raw, data);
    if (raw == null || isValidElement(raw)) return raw as ReactNode;
    return String(raw);
  }, [render, data, raw]);

  return (
    <td css={[cellStyles.td, fit && cellStyles.fit]}>
      {display == null ? empty : display}
    </td>
  );
}
