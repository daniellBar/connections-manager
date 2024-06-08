import { SxProps, Theme } from "@mui/material/styles";
import { ERROR_SHADES, NEUTRAL_SHADES } from "../../globalStyles";

export const sxStyles = (): SxProps<Theme> => {
  const defaultStyles = {
    fontSize: 14,
    input: {
      "&::placeholder": {
        opacity: 1,
        fontSize: "12px",
        color: NEUTRAL_SHADES[800],
      },
    },
    "& .MuiInputLabel-root:not(.Mui-error)": {
      color: NEUTRAL_SHADES[900],
    },
    "& label": {
      "&.Mui-focused:not(.Mui-error)": {
        marginLeft: 0,
        color: NEUTRAL_SHADES[800],
      },
      "&.Mui-focused.Mui-error": {
        marginLeft: 0,
        color: `${ERROR_SHADES[300]} !important`,
      },
    },
    "& textarea, input": {
      "&::placeholder": {
        color: NEUTRAL_SHADES[400],
        opacity: 1,
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: `1px solid ${NEUTRAL_SHADES[400]}`,
        borderRadius: `8px`,
      },
      "&:hover:not(.Mui-disabled):not(.Mui-error) fieldset": {
        borderColor: NEUTRAL_SHADES[900],
        color: NEUTRAL_SHADES[900],
      },
      "&.Mui-focused:not(.Mui-disabled):not(.Mui-error) fieldset": {
        border: `1px solid ${NEUTRAL_SHADES[700]}`,
        background: "none",
        opacity: 1,
      },
      "input:-webkit-autofill": {
        boxShadow: `0 0 0 30px white inset !important`,
        fontSize: "14px !important",
        "&:hover": {
          boxShadow: `0 0 0 30px white inset !important`,
          fontSize: "14px !important",
        },
        "&:focus": {
          boxShadow: `0 0 0 30px white inset !important`,
          fontSize: "14px !important",
        },
      },
    },
  };

  const errorStyles = {
    "& .MuiInputLabel-root": {
      color: `${NEUTRAL_SHADES[400]} !important`,
      marginBlock: "-3px",
    },
    "& .MuiInputLabel-shrink": {
      marginBlock: 0,
    },
    "& label": {
      "&.Mui-focused": {
        color: ERROR_SHADES[300],
      },
    },
    ".MuiOutlinedInput-root.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline":
      {
        border: `1px solid ${ERROR_SHADES[300]}`,
      },
  };

  return [defaultStyles, errorStyles];
};
