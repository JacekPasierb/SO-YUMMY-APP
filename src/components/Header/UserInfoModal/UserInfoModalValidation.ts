interface FormValues {
  name: string;
}

export const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};
  if (values.name.length < 3 || values.name.length > 12) {
    errors.name = "Name must be min 3 to 12 characters";
  }

  return errors;
};
