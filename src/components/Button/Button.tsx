import { CircularProgress } from "@mui/material";
import clsx from "clsx";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";

export type buttonTypes = "primary" | "secondary" | "tertiary" | "link";
export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: buttonTypes;
  disabled?: boolean;
  loading?: boolean;
  iconComponent?: ReactNode;
  size?: "sm" | "md" | "lg" | "icon";
}

const defaultClassName =
  "inline-flex items-center box-border justify-center whitespace-nowrap rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

const getSize = (size: "sm" | "md" | "lg" | "icon") => {
  switch (size) {
    case "sm":
      return "h-8 px-3 text-sm";
    case "lg":
      return "h-10 px-5 text-sm";
    case "icon":
      return "h-9 w-9";
    default:
      return "h-9 px-4 text-sm";
  }
};

const getTypeStyles = (buttonType: buttonTypes) => {
  switch (buttonType) {
    case "primary":
      return "bg-oasis border border-oasis text-white shadow hover:border-transparent hover:bg-oasis/80  disabled:bg-neutrals-500 disabled:border-transparent";
    case "secondary":
      return "border border-oasis text-oasis hover:bg-oasis hover:text-white disabled:text-neutrals-500 disabled:border-neutrals-500";
    case "tertiary":
      return "bg-transparent text-oasis hover:bg-neutrals-200";
    case "link":
      return "bg-transparent text-oasis hover:underline";
    default:
      return "bg-oasis text-white hover:bg-oasis-600";
  }
};

const Button: FC<IButtonProps> = ({
  size = "md",
  disabled = false,
  loading = false,
  buttonType = "primary",
  children,
  className,
  iconComponent,
  ...props
}) => {
  return (
    <button
      className={clsx(
        defaultClassName,
        getSize(size),
        getTypeStyles(buttonType),
        className
      )}
      data-testid="button"
      disabled={disabled || loading}
      {...props}
    >
      <div className="flex items-center gap-x-1.5">
        {iconComponent && !loading ? (
          <span className={clsx({ "opacity-50": disabled })}>
            {iconComponent}
          </span>
        ) : null}
        {loading ? (
          <span className="">
            <CircularProgress size={10} />
          </span>
        ) : null}
        {children}
      </div>
    </button>
  );
};

export default Button;
