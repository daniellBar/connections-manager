import { useMemo } from "react";
import { ColumnDefinition } from "../../../components/RecordsTable/RecordsTable.types";
import { getConnectionTypeLogo, getUserIcon } from "../utils";
import { ConnectionRawData, ConnectionRecordDetails } from "../types";

export const useColumns = () => {
  const columns: ColumnDefinition<ConnectionRecordDetails>[] = useMemo(() => {
    return [
      {
        key: "name",
        title: "Name",
        render: (record) => <div>{record.name}</div>,
      },
      {
        key: "username",
        title: "User name",
        render: (record) => (
          <div className="flex items-center gap-2">
            <img
              src={getUserIcon()}
              alt="connection_logo"
              className="w-[30px]"
            />
            {record.username}
          </div>
        ),
      },
      {
        key: "type",
        title: "Connection type",
        render: (record) => (
          <div className="flex items-center gap-2">
            <img
              src={getConnectionTypeLogo(record.type)}
              alt="connection_logo"
              className="w-[40px]"
            />
            {record.type}
          </div>
        ),
      },
    ];
  }, []);

  return columns;
};

export const parseConnectionRawDataToRecordDetails = (
  data: ConnectionRawData[] | undefined
): ConnectionRecordDetails[] => {
  if (!data?.length) return [];
  return data.map(({ id, type, name, username }) => ({
    id,
    type,
    name,
    username,
  }));
};
