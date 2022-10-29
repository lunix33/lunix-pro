import { styles } from "./styles";
import type { ReactElement } from "react";

export function Header(): ReactElement {
  return <header css={styles.content}>Header content</header>;
}
