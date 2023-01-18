import { ReactElement } from "react";

import classes from "./styles.module.scss";

export default function Header(): ReactElement {
  return <header className={classes.header}>Header content</header>;
}
