import { SxProps } from "@mui/material/styles";

import { NEUTRAL_SHADES } from "../../globalStyles";

export const selectStyle: SxProps = {
  width: "100%",
  height: "40px",
  display: "flex",
  alignItems: "center",
  paddingRight: "8px",
  borderRadius: "8px",
  ".MuiSelect-select": {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  "&:hover:not(.Mui-disabled)": {
    backgroundColor: `${NEUTRAL_SHADES[200]}`,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${NEUTRAL_SHADES[500]}`,
  },
  "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    background: `${NEUTRAL_SHADES[100]}`,
    border: `1px solid ${NEUTRAL_SHADES[500]}`,
    opacity: 0.3,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${NEUTRAL_SHADES[1000]}`,
  },
};

export const menuStyle: SxProps = {
  maxHeight: "180px",
  width: "270px",
  borderRadius: "8px",
  boxShadow: "1px 1px 25px 0px rgba(113, 120, 127, 0.10)",
  marginTop: "1px",
  "& .MuiList-root": {
    paddingRight: "15px",
    paddingLeft: "15px",
  },
};

export const menuItemStyle: SxProps = {
  fontSize: "0.9em",
  padding: "10px 8px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: `${NEUTRAL_SHADES[150]}`,
  },
};
