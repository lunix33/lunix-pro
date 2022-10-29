import { styles } from "./styles";
import type { ReactElement } from "react";
import type { MainProps } from "./types";

export function Main({ children }: MainProps): ReactElement {
  return <main css={styles.content}>{children}</main>;
}
