import React, { useState } from "react";
import SignInInputField from "../SignIn/SignInInputField.jsx";
import SignInButton from "../SignIn/SignInButton.jsx";
import { useAuth } from "../../AuthContext.jsx";
import styles from "./SignUp.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateField, validateAllFields } from "./validation";
import { showSuccessAlert, showErrorAlert } from "./alert";

function SignUp({ switchToSignIn, close }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { URL } = useAuth();

  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validateField("name", event.target.value),
    }));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validateField("email", event.target.value),
    }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validateField("password", event.target.value),
    }));
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validateField("confirmPassword", event.target.value, password),
    }));
  };

  const validate = () => {
    const tempErrors = validateAllFields(name, email, password, confirmPassword);
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const data = {
        nickname: name,
        username: email,
        password: password,
      };

      const SIGNUP_URL = `${URL}/api/account/register/`;
      try {
        const response = await axios.post(SIGNUP_URL, data);
        close();
        navigate("/");
        showSuccessAlert(response.data.nickname);
      } catch (error) {
        if (error.response && error.response.data.username) {
          showErrorAlert();
        }
        console.error("Error during sign up:", error.response ? error.response.data : error);
      }
    } else {
      console.error("Validation failed.");
    }
  };

  return (
    <form className={styles.SignUP} onSubmit={onSubmit}>
      <SignInInputField
        label="Name"
        value={name}
        onChange={handleNameChange}
        errorMessage={errors.name}
      />
      <SignInInputField
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        errorMessage={errors.email}
      />
      <SignInInputField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        errorMessage={errors.password}
      />
      <SignInInputField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        errorMessage={errors.confirmPassword}
      />
      <SignInButton onSubmit={onSubmit} label="Submit" />
    </form>
  );
}

export default SignUp;
