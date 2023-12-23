export const validate = (values) => {
  const errors = {};
 
  if (!values.email) {
    errors.email = "This field is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "This field is required";
    } 
    return errors; 
};
