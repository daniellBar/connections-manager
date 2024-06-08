import Input from "../../../components/Input/Input";
import { Select } from "../../../components/Select/Select";
import { getConnectionTypeSelectOptions } from "../utils";

export const ConnectionFormFields = () => {
  return (
    <div className="flex flex-col gap-5">
      <Input
        enableFormik
        id="name"
        name="name"
        label="Name"
        required
        errorMessageLocation="label"
      />
      <Input
        enableFormik
        id="url"
        name="url"
        label="Url"
        required
        errorMessageLocation="label"
      />
      <Input
        enableFormik
        id="username"
        name="username"
        label="User name"
        required
        errorMessageLocation="label"
      />
      <Input
        enableFormik
        id="password"
        name="password"
        label="Password"
        required
        errorMessageLocation="label"
      />
      <Select
        required
        name="type"
        label="Connection type"
        options={getConnectionTypeSelectOptions()}
        enableFormik
        fullWidth
        errorMessageLocation="label"
      />
    </div>
  );
};
