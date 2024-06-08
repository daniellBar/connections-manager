import { useMemo, useState } from "react";
import { useGetConnections } from "../api";
import { ConnectionDialog } from "./ConnectionDialog";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../../../components/Button/Button";
import {
  parseConnectionRawDataToRecordDetails,
  useColumns,
} from "./utils";
import { useNavigate } from "react-router-dom";
import { ConnectionRecordDetails } from "../types";
import { RecordsTable } from "../../../components/RecordsTable/RecordsTable";
import { PageLayout } from "../../../Layout/PageLayout";

export const ConnectionManagerPage = () => {
  const { data: connectionsData, isLoading, isFetching } = useGetConnections();

  const navigate = useNavigate();

  const onRowClick = (row: ConnectionRecordDetails) => {
    navigate(`connections/${row.id}`);
  };

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const queryClient = useQueryClient();

  const onCreateConnectionSuccess = () => {
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === "connections",
    });
    setIsOpenDialog(false);
  };

  const columns = useColumns();
  const tableData = useMemo(
    () => parseConnectionRawDataToRecordDetails(connectionsData?.data),
    [connectionsData?.data]
  );

  return (
    <PageLayout>
      <div className="font-bold text-2xl">Connections page</div>
      <div className="!h-[calc(100%-20px)]">
        <RecordsTable
          data={tableData}
          columns={columns}
          tableId="connection-table"
          onRowClick={onRowClick}
          isLoading={isLoading}
          isFetching={isFetching}
          actions={
            <Button
              buttonType="primary"
              size="md"
              onClick={() => setIsOpenDialog(true)}
            >
              <span className="text-nowrap">Add Connection</span>
            </Button>
          }
        />
      </div>
      <ConnectionDialog
        isOpen={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
        onCreateConnectionSuccess={onCreateConnectionSuccess}
      />
    </PageLayout>
  );
};
