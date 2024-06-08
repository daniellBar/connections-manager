import { ChangeEvent, useState } from "react";

export const rowsPerPageOptions = [5, 10, 25];

export const useTablePagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[0]);

  const handleChangePage = (_: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return { currentPage, rowsPerPage ,handleChangeRowsPerPage,handleChangePage};
};
