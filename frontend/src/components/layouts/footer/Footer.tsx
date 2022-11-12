import { ReactElement } from "react";

import { useStyles } from "./styles";

export function Footer(): ReactElement {
  const styles = useStyles();
  return <footer css={styles.content}>Page footer</footer>;
}
