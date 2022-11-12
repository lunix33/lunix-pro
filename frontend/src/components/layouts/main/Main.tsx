import { ReactElement } from "react";

import { MainProps } from "./types";
import { useStyles } from "./styles";

export function Main({ children }: MainProps): ReactElement {
  const styles = useStyles();
  return <main css={styles.content}>{children}</main>;
}
