import { ReactNode } from "react";

export type TransformFn<V, D> = (_value: V, _data: D) => ReactNode;

export interface TableProps<D> {
  data?: D[];
  caption: string;
  columns: ColumnProps<D>[];
  emptyCell?: ReactNode;
  emptyTable?: ReactNode;
}

export type ColumnProps<D> = {
  label?: ReactNode;
  dataValue?: keyof D;
  render?: TransformFn<any, D>;
  fit?: boolean;
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
