import { InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "name"> {
  label?: ReactNode;
  name: string;
}
