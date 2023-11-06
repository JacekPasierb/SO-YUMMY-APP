export const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 3 || values.name.length > 12) {
    errors.name = "Name must be min 3 to 12 characters";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length > 12 || values.password.length < 6) {
      errors.password = "Password must be 6-12 characters";
    }
};
