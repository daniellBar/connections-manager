import * as Yup from "yup";
import { ConnectionFormValues } from "./ConnectionForm.types";

export const initialFormValues: ConnectionFormValues = {
  name: "",
  url: "",
  username: "",
  password: "",
  type: "",
};

export const schema = Yup.object({
  name: Yup.string().required("This field is required"),
  url: Yup.string().required("This field is required"),
  username: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required"),
  type: Yup.string().required("This field is required"),
});
