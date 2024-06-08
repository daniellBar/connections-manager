import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  SelectProps,
  SxProps,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { Field, FieldProps } from "formik";
import { ReactNode, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { menuItemStyle, menuStyle, selectStyle } from "./styles";
import { ERROR_SHADES } from "../../globalStyles";

export type SelectItem = {
  value: string;
  name: string;
  meta?: any;
  label?: ReactNode;
};

export type ISelectProps = SelectProps & {
  placeholder?: string;
  options: SelectItem[];
  customStyle?: SxProps;
  customMenuStyle?: SxProps;
  innerLabel?: string;
  enableFormik?: boolean;
  showError?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  handleOnChange?: (e: SelectChangeEvent<unknown>) => void;
  errorMessageLocation?: "label" | "field";
};

const BaseSelect = ({
  label,
  name,
  options,
  showError,
  errorMessage,
  disabled,
  customStyle,
  customMenuStyle,
  innerLabel,
  required = false,
  fullWidth = false,
  errorMessageLocation = "field",
  ...props
}: ISelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onToggleDropdown = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <FormControl fullWidth={fullWidth}>
        {label && (
          <div className="flex items-center gap-x-1.5 pb-[8px]">
            <FormLabel
              required={required}
              sx={{
                "&.Mui-focused": {
                  color: "rgba(0, 0, 0, 0.6)",
                },
              }}
            >
              {label}
            </FormLabel>
            {errorMessageLocation === "label" && showError && errorMessage && (
              <div className="flex items-center gap-x-1.5">
                <ErrorIcon
                  className="text-error-300"
                  sx={{ fontSize: "20px" }}
                />
                <div className="text-error-300 text-xs">{errorMessage}</div>
              </div>
            )}
          </div>
        )}
        <div>
          <MuiSelect
            open={isOpen}
            onClick={onToggleDropdown}
            labelId="single-select-label"
            data-testid="select"
            error={showError}
            displayEmpty
            id={name}
            name={name}
            disabled={disabled}
            sx={selectStyle}
            fullWidth
            {...props}
            inputProps={{ props }}
            MenuProps={{
              PaperProps: { sx: menuStyle },
              sx: [{ zIndex: 30000 }],
            }}
            IconComponent={() =>
              isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
            {...props}
          >
            {innerLabel && (
              <MenuItem sx={menuItemStyle} value="">
                <em>{innerLabel}</em>
              </MenuItem>
            )}
            {!disabled &&
              options.map((item: SelectItem) => {
                return (
                  <MenuItem
                    data-testid="option"
                    sx={menuItemStyle}
                    key={item.value}
                    value={item.value}
                  >
                    {item.label ?? item.name}
                  </MenuItem>
                );
              })}
          </MuiSelect>
          {errorMessageLocation !== "label" && showError && errorMessage && (
            <FormHelperText
              className="text-xs"
              sx={{ color: ERROR_SHADES[300] }}
            >
              {errorMessage}
            </FormHelperText>
          )}
        </div>
      </FormControl>
    </>
  );
};

export const Select: React.FC<ISelectProps> = ({
  enableFormik,
  handleOnChange,
  ...props
}: ISelectProps) => {
  if (!enableFormik) {
    return <BaseSelect {...props} />;
  }
  return (
    <Field name={props.name}>
      {({ field, meta }: FieldProps) => (
        <BaseSelect
          showError={meta.touched && !!meta.error}
          errorMessage={meta.error}
          {...props}
          {...field}
          onChange={(e) => {
            field.onChange(e);
            if (handleOnChange) {
              handleOnChange(e);
            }
          }}
        />
      )}
    </Field>
  );
};
