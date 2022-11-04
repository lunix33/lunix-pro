import { ReactElement } from "react";

import { EmptyCellProps } from "./types";

export function EmptyCell({ children }: EmptyCellProps): ReactElement {
  return <>{children}</>;
}
