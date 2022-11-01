import { ReactElement } from "react";

import { MainProps } from "./types";
import { styles } from "./styles";

export function Main({ children }: MainProps): ReactElement {
  return <main css={styles.content}>{children}</main>;
}
