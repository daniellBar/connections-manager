import { FormControl, FormLabel, TextField } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { Field, FieldProps } from "formik";
import { sxStyles } from "./styles";

export interface InputProps extends OutlinedInputProps {
  errorMessage?: string;
  enableFormik?: boolean;
  innerHeight?: number;
  isErrorIcon?: boolean;
  errorMessageLocation?: "label" | "field";
  containerClassName?: string;
}

const InputField = ({
  label,
  className,
  errorMessage,
  sx,
  multiline = false,
  innerHeight,
  isErrorIcon = false,
  required = false,
  rows,
  maxRows,
  minRows,
  errorMessageLocation = "field",
  containerClassName,
  ...props
}: InputProps) => {
  const inputHeight =
    multiline && (rows || maxRows || minRows)
      ? undefined
      : innerHeight ?? undefined;

  return (
    <FormControl className={containerClassName}>
      <div className="flex items-center gap-1 pb-[8px]">
        <FormLabel required={required}>{label}</FormLabel>
        {errorMessageLocation === "label" && errorMessage && (
          <div className="flex items-center gap-x-1.5">
            <ErrorIcon className="text-error-300" sx={{ fontSize: "20px" }} />
            <div className="text-error-300 text-xs">{errorMessage}</div>
          </div>
        )}
      </div>

      <TextField
        data-testid="input"
        multiline={multiline}
        classes={{ root: className }}
        error={!!errorMessage}
        sx={sxStyles()}
        inputProps={{ type: props.type }}
        rows={rows}
        minRows={minRows}
        size="small"
        maxRows={maxRows}
        InputProps={{
          sx: {
            height: inputHeight,
          },
          ...props,
        }}
        helperText={errorMessageLocation !== "label" ? errorMessage : undefined}
        FormHelperTextProps={{
          sx: {
            "&.MuiFormHelperText-root.Mui-error": {
              marginLeft: "8px",
            },
          },
        }}
      />
    </FormControl>
  );
};

const Input: React.FC<InputProps> = ({ enableFormik, ...props }) => {
  if (!enableFormik) {
    return <InputField {...props} />;
  }

  return (
    <Field name={props.name}>
      {({ field, meta }: FieldProps) => {
        return (
          <InputField
            errorMessage={meta.touched ? meta.error : undefined}
            {...props}
            {...field}
          />
        );
      }}
    </Field>
  );
};

export default Input;
