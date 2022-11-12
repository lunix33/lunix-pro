import { ReactElement } from "react";

import { useStyles } from "./styles";
import { CheckboxProps } from "./types";

export function Checkbox({
  name,
  label,
  id,
  checked,
  className,
  ...props
}: CheckboxProps): ReactElement {
  const styles = useStyles();
  return (
    <label css={styles.label} className={className}>
      <input
        id={id ?? name}
        name={name}
        checked={checked}
        type="checkbox"
        {...props}
      />
      {label}
    </label>
  );
}
