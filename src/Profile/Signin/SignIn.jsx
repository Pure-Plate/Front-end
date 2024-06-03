import React, { useState } from "react";
import SignInInputField from "./SignInInputField/SignInInputField.jsx";
import { useAuth } from "../../AuthContext.jsx";
import styles from "./Signin.module.css";

function SignIn() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = email ? "" : "Please enter your email address";
    tempErrors.password =
      password.length >= 6 ? "" : "Password must be 6+ characters";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleIdChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        await login(email, password);
      } catch (error) {
        setErrors({
          ...errors,
          form: "Login failed. Please check your email or password.",
        });
      }
    } else {
      console.error("Validation failed.");
    }
  };

  return (
    <SignInForm
      email={email}
      password={password}
      errors={errors}
      onIdChange={handleIdChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={onSubmit}
    />
  );
}

const SignInForm = ({
  email,
  password,
  errors,
  onIdChange,
  onPasswordChange,
  onSubmit,
}) => (
  <form className={styles.SignInInputField} onSubmit={onSubmit}>
    <SignInInputField
      label="Email"
      value={email}
      onChange={onIdChange}
      errorMessage={errors.email}
    />
    <SignInInputField
      label="Password"
      type="password"
      value={password}
      onChange={onPasswordChange}
      errorMessage={errors.password}
    />
    {errors.form && <div className={styles.error}>{errors.form}</div>}
    <button className={styles.signInButton} onClick={onSubmit}>
      Submit
    </button>
  </form>
);

export default SignIn;
