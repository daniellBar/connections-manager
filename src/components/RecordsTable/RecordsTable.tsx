import { useLocalStorage } from "react-use";
import { useMemo } from "react";

import {
  ColumnState,
  RecordTableProps,
} from "../RecordsTable/RecordsTable.types";
import { useTablePagination } from "./useTablePagination";
import { TableView } from "./components/TableView/TableView";

export const RecordsTable = <T,>({
  columns,
  data,
  onRowClick,
  tableId,
  actions,
  isLoading,
  isFetching,
}: RecordTableProps<T>) => {
  const [state, setState] = useLocalStorage<{ [tableId: string]: ColumnState }>(
    "table",
    {}
  );
  const handleColumnChange = (newState: ColumnState) => {
    if (!tableId) {
      return;
    }
    setState({
      ...state,
      [tableId]: newState,
    });
  };

  const {
    currentPage,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTablePagination();

  const pageData = useMemo(
    () =>
      data.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage
      ),
    [rowsPerPage, data, currentPage]
  );

  return (
    <div className="flex flex-col gap-y-2">
      {actions ? <div className="flex justify-end">{actions}</div> : null}
      <TableView
        data={pageData}
        tableId={tableId}
        columns={columns}
        onColumnChange={handleColumnChange}
        state={tableId ? state?.[tableId] : {}}
        onRowClick={onRowClick}
        isLoading={isLoading}
        isFetching={isFetching}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        totalResults={data.length}
      />
    </div>
  );
};
