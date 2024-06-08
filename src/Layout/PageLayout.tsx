import { FC, ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout: FC<PageLayoutProps> = ({ children }) => (
  <div className="flex h-[calc(100vh-62px)] flex-col gap-y-[20px] px-[24px] pt-[86px]">
    {children}
  </div>
);
