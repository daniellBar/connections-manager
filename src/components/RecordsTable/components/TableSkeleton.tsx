import Skeleton from "@mui/material/Skeleton";

export const TableSkeleton = () => {
  return (
    <div className="p-5">
      <div className="flex h-16 gap-x-3">
        <Skeleton width="20%" />
        <Skeleton width="20%" />
        <Skeleton width="20%" />
        <Skeleton width="20%" />
        <Skeleton width="20%" />
      </div>
      <div className="flex flex-col gap-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} height="20px" />
        ))}
      </div>
    </div>
  );
};
