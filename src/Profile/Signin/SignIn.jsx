import React, { useState } from "react";
import SignInInputField from "./SignInInputField.jsx";
import SignInButton from "./SignInButton.jsx";
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
        // 성공적으로 로그인이 되면, 필요하다면 여기서 추가적인 작업을 수행합니다.
      } catch (error) {
        // 로그인 실패 시, 오류 메시지를 처리합니다.
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
    <div className={styles.signInArea}>
      <SignInForm
        email={email}
        password={password}
        errors={errors}
        onIdChange={handleIdChange}
        onPasswordChange={handlePasswordChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}

const SignInForm = ({ email, password, errors, onIdChange, onPasswordChange, onSubmit }) => (
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
    <SignInButton onSubmit={onSubmit} label="Sign In" />
  </form>
);

export default SignIn;
