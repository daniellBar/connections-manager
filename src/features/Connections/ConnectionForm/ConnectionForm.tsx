import { Form, Formik, FormikHelpers } from "formik";
import Button from "../../../components/Button/Button";
import { ConnectionFormValues } from "./ConnectionForm.types";
import { initialFormValues, schema } from "./ConnectionsForm.consts";
import { ConnectionFormFields } from "./ConnectionFormFields";
import { generateMockId } from "../../../utils";
import { createConnection } from "../api";

interface ConnectionFormProps {
  onCreateConnectionSuccess: () => void;
}

export const ConnectionForm = ({
  onCreateConnectionSuccess,
}: ConnectionFormProps) => {
  const onSubmit = async (
    values: ConnectionFormValues,
    actions: FormikHelpers<ConnectionFormValues>
  ) => {
    const { name, url, username, password, type } = values;
    const connection = {
      id: generateMockId(),
      name,
      url,
      username,
      password,
      type,
    };
    try {
      await createConnection(connection);
      onCreateConnectionSuccess();
    } catch (err) {
      console.log(err);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <Form className="flex flex-col gap-6">
          <ConnectionFormFields />
          <div className="w-[35px]">
            <Button
              size="sm"
              buttonType="primary"
              type="submit"
              loading={isSubmitting}
              disabled={!(isValid && dirty)}
            >
              Save
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
