import { ReactNode } from "react";

export type TransformFn<V, D> = (_value: V, _data: D) => ReactNode;
export type PageOptions = Omit<PagerProps, "span">;

export interface TableProps<D> {
  data?: D[];
  caption: string;
  columns: ColumnProps<D>[];
  emptyCell?: ReactNode;
  emptyTable?: ReactNode;
  className?: string;
  page?: PageOptions;
}

export type ColumnProps<D> = {
  label?: string;
  dataValue?: keyof D;
  render?: TransformFn<any, D>;
  fit?: boolean;
  textAlign?: "left" | "right" | "center";
  mobileTextAlign?: "left" | "right" | "center";
};

export interface CellProps<D> {
  data: D;
  header: ColumnProps<D>;
  empty?: ReactNode;
}

export interface TableRowProps<D> {
  emptyCell: ReactNode;
  data: D;
  headers: ColumnProps<D>[];
}

export interface EmptyTableProps {
  children: ReactNode;
  span?: number;
}

export interface EmptyCellProps {
  children: ReactNode;
}

export interface PagerProps {
  span: number;
  count: number;
  offset: number;
  limit: number;
  onPageChange: (_newOffset: number) => void;
}
