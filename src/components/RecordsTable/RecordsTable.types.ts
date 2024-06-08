import { ReactNode } from "react";

export interface ColumnDefinition<T> {
  key: string;
  title?: string;
  render?: (record: T) => ReactNode;
  sortable?: boolean;
  sortKey?: string;
  className?: string;
  width?: number;
  state?: {
    order?: number;
    hidden?: boolean;
    mandatory?: boolean;
    excludeFromSettings?: boolean;
  };
  helpText?: string;
  alignCenter?: boolean;
}

export interface RecordTableProps<T> {
  columns: ColumnDefinition<T>[];
  onRowClick?: (record: T, e: React.MouseEvent) => void;
  data: T[];
  tableId?: string;
  dynamicColumns?: boolean;
  actions?: ReactNode;
  isLoading?: boolean;
  isFetching?: boolean;
}

export interface ColumnState {
  [key: string]: {
    order?: number;
    hidden?: boolean;
    width?: number;
  };
}
