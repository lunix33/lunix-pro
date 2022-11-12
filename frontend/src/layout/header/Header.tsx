import { ReactElement } from "react";

import { useStyles } from "./styles";

export function Header(): ReactElement {
  const styles = useStyles();
  return <header css={styles.content}>Header content</header>;
}
