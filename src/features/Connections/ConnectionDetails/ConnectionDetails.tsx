import { useParams } from "react-router-dom";
import { useGetConnection } from "../api";
import { parseConnectionToKeyValPairs } from "./utils";
import { PageLayout } from "../../../Layout/PageLayout";

export const ConnectionDetails = () => {
  const { id: connectionId = "" } = useParams();

  const { data: connectionData, isLoading } = useGetConnection(connectionId, {
    enabled: true,
  });

  return (
    <PageLayout>
      <div className="font-bold text-2xl">Connection Details</div>
      {!isLoading ? (
        <div className="flex flex-col gap-3 border border-neutrals-150 p-5">
          {parseConnectionToKeyValPairs(connectionData?.data).map(
            ({ k: title, v: value }) => (
              <div key={`${title}`} className="flex gap-x-3 items-center">
                <div className="text-neutrals-500 text-lg">{`${title}: `}</div>
                {value}
              </div>
            )
          )}
        </div>
      ) : (
        <div>loading</div>
      )}
    </PageLayout>
  );
};
