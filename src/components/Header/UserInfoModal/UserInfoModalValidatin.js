export const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "This field is required";
  } else if (values.name.length < 3 || values.name.length > 12) {
    errors.name = "Name must be min 3 to 12 characters";
  }
  
  return errors;
};
