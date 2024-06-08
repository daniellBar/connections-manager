import { Fade, LinearProgress, TablePagination } from "@mui/material";
import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";
import { useMeasure } from "react-use";

import { tableLoaderStyle } from "./styles";
import { ColumnDefinition, ColumnState } from "../../RecordsTable.types";
import { TableSkeleton } from "../TableSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../TableElements";
import { DefaultEmptyView } from "../DefaultEmptyView";
import { rowsPerPageOptions } from "../../useTablePagination";

const MIN_COLUMN_WIDTH = 100;

interface TableViewProps<T> {
  data: T[];
  columns: ColumnDefinition<T>[];
  height?: number;
  onRowClick?: (row: T, e: React.MouseEvent) => void;
  rowsPerPageOptions?: number[];
  noShadow?: boolean;
  className?: string;
  paddingTableView?: boolean;
  hidePagination?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
  onColumnChange: (newState: ColumnState) => void;
  state?: ColumnState;
  tableId?: string;
  handleChangePage: (_: any, page: number) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
  currentPage: number;
  rowsPerPage: number;
  totalResults: number;
}
export const TableView = <T,>({
  height,
  noShadow,
  columns,
  data,
  onRowClick,
  className,
  paddingTableView,
  onColumnChange,
  state = {},
  tableId,
  isLoading,
  isFetching = false,
  handleChangePage,
  handleChangeRowsPerPage,
  currentPage,
  rowsPerPage,
  hidePagination = false,
  totalResults,
}: TableViewProps<T>) => {
  const [isResizing, setIsResizing] = useState(false);
  const [tableContainerRef, { width: tableContainer }] =
    useMeasure<HTMLDivElement>();

  const [x, setX] = useState(0);
  const [startPosition, setStartPosition] = useState<{
    width: number;
    column: string;
    start: number;
  }>();
  const [endPosition, setEndPosition] = useState<number>();

  const tableClassName = `table-container-${tableId}`;

  useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      setEndPosition(e.clientX);
    };

    const handleStopResize = () => {
      setIsResizing(false);
      setEndPosition(undefined);
      setStartPosition(undefined);
    };
    if (isResizing) {
      document.addEventListener("mousemove", handleResize);
      document.addEventListener("mouseup", handleStopResize);
    }

    return () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", handleStopResize);
    };
  }, [isResizing]);

  useEffect(() => {
    if (endPosition !== startPosition?.width && startPosition && endPosition) {
      onColumnChange({
        ...state,
        [startPosition.column]: {
          ...state[startPosition.column],
          width: Math.max(
            startPosition.width + (endPosition - startPosition.start),
            MIN_COLUMN_WIDTH
          ),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    endPosition,
    startPosition,
    startPosition?.column,
    startPosition?.start,
    startPosition?.width,
  ]);

  if (isLoading) {
    return <TableSkeleton />;
  }

  const defaultColumnWidth = tableContainer
    ? tableContainer / columns.length
    : MIN_COLUMN_WIDTH;

  const tableWidth = columns.reduce((acc, column) => {
    return (
      acc + (state[column.key]?.width ?? column.width ?? defaultColumnWidth)
    );
  }, 0);

  const tableGap = tableContainer ? tableContainer - tableWidth : 0;

  return (
    <div
      style={{
        height,
        boxShadow: noShadow
          ? ""
          : "0px 4.9px 12.25px 0px rgba(34, 33, 33, 0.06)",
      }}
      className={clsx(
        "relative rounded-lg border-neutrals-100 bg-white",
        { "px-2 pb-0 pl-6": paddingTableView },
        className
      )}
    >
      <Fade in={isFetching}>
        <LinearProgress sx={tableLoaderStyle} />
      </Fade>
      <div
        onScroll={(e) => {
          setX(e.currentTarget.scrollLeft);
        }}
        ref={tableContainerRef}
        className={clsx(
          `${tableClassName} overflow-y-auto`,
          tableGap > 0 ? "overflow-x-hidden" : undefined
        )}
      >
        <Table style={{ width: tableWidth }}>
          <TableHeader>
            <TableRow className="hover:bg-white">
              {columns.map((column, i) => {
                const isLastColumn = i === columns.length - 1;

                const defaultWidth = tableContainer / columns.length;

                const width =
                  state[column.key]?.width ??
                  column.width ??
                  defaultWidth ??
                  MIN_COLUMN_WIDTH;

                return (
                  <TableHead
                    title={column.title}
                    style={{
                      width:
                        isLastColumn && tableGap > 0 ? width + tableGap : width,
                    }}
                    key={column.key}
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex items-center truncate">
                        {column.title}
                      </span>

                      <span
                        style={{
                          display: i === columns.length - 1 ? "none" : "block",
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setIsResizing(true);
                          setStartPosition({
                            start: e.clientX,
                            column: column.key,
                            width,
                          });
                        }}
                        className="h-5 w-[10px] min-w-fit cursor-ew-resize"
                      >
                        <span className="block h-5 w-[2px] rounded-lg bg-neutrals-300"></span>
                      </span>
                    </span>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          <TableBody className="overflow-y-auto">
            {data?.length === 0 ? (
              <DefaultEmptyView length={columns.length} />
            ) : (
              data.map((row, index) => (
                <TableRow
                  onClick={(e) => onRowClick?.(row, e)}
                  className={clsx({ "cursor-pointer": !!onRowClick })}
                  key={index}
                >
                  {columns.map((column) => {
                    return (
                      <TableCell
                        className={clsx(
                          "group-hover:bg-neutrals-150 truncate transition-none",
                          column.className
                        )}
                        key={column.key}
                      >
                        <span
                          className={clsx({
                            "flex justify-center pr-[22px]": column.alignCenter,
                          })}
                        >
                          {column.render && column.render(row)}
                        </span>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {!hidePagination && totalResults > 0 && (
        <TablePagination
          sx={{ borderTop: "none" }}
          data-testid="table-pagination"
          style={{ margin: "0 12px" }}
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={totalResults}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};
