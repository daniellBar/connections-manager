import { FunctionComponent } from "react";
import { TableCell, TableRow } from "./TableElements";

interface DefaultEmptyViewProps {
  length: number;
}

export const DefaultEmptyView: FunctionComponent<DefaultEmptyViewProps> = ({
  length,
}) => {
  return (
    <TableRow>
      <TableCell colSpan={length} className="text-center">
        No records found
      </TableCell>
    </TableRow>
  );
};
