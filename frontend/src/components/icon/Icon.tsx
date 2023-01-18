"use client";

import { IconProps } from "./types";

export function Icon({ icon, variant = "solid", className }: IconProps) {
  return <i className={`fa-${variant} fa-${icon} ${className}`} />;
}
