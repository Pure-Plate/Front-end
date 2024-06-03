export const validateField = (key, value, password) => {
    let errors = {};
    if (key === "name") {
      errors.name = value ? "" : "Enter name.";
    } else if (key === "email") {
      errors.email = value ? "" : "Enter email.";
    } else if (key === "password") {
      errors.password = value.length >= 6 ? "" : "Password must be 6+ chars.";
    } else if (key === "confirmPassword") {
      errors.confirmPassword = password === value ? "" : "Passwords do not match.";
    }
    return errors;
  };
  
  export const validateAllFields = (name, email, password, confirmPassword) => {
    let errors = {};
    errors.name = name ? "" : "Enter name.";
    errors.email = email ? "" : "Enter email.";
    errors.password = password.length >= 6 ? "" : "Password must be 6+ chars.";
    errors.confirmPassword = password === confirmPassword ? "" : "Passwords do not match.";
    return errors;
  };
  