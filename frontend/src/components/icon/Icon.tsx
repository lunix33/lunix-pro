import type { IconProps } from "./types";

export function Icon({ icon, variant = "regular", className }: IconProps) {
  return <i className={`fa-${variant} fa-${icon} ${className}`} />;
}
