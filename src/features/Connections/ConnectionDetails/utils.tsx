import { KeyValPair } from "../../../types";
import { convertArrayOfObjectsToKeyValPairs } from "../../../utils";
import { ConnectionRawData } from "../types";
import { getConnectionTypeLogo } from "../utils";

export const parseConnectionToKeyValPairs = (
  connectionDetails: ConnectionRawData | undefined
): KeyValPair[] => {
  if (!connectionDetails) return [];
  const { id, name, url, username, password, type } = connectionDetails;
  const pairs = [
    { ID: id },
    { Name: name },
    { Link: url },
    { User: username },
    { Password: password },
    {
      "Database type": (
        <div className="flex items-center gap-2">
          {type}
          <img
            src={getConnectionTypeLogo(type)}
            alt="connection_logo"
            className="w-[35px]"
          />
        </div>
      ),
    },
  ];
  return convertArrayOfObjectsToKeyValPairs(pairs);
};
