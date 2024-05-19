import styles from "./Signin.module.css";
import SignInInputField from "./SignInInputField.jsx";

import SignInButton from "./SignInButton.jsx";
import { useState } from "react";

function Signin({ isOpen, close }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // 에러 상태를 추가합니다.

  const validate = () => {
    let tempErrors = {};
    tempErrors.id = id ? "" : "ID를 입력해주세요.";
    tempErrors.password =
      password.length >= 6 ? "" : "비밀번호는 6자 이상이어야 합니다.";
    setErrors(tempErrors);

    // 모든 필드가 유효하면 true를 반환합니다.
    return Object.values(tempErrors).every((x) => x === "");
  };

  // 입력 필드 변경을 처리하는 함수들입니다.
  const handleIdChange = (event) => setId(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  // 폼 제출을 처리하는 함수입니다.
  const onSubmit = (event) => {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.
    if (validate()) {
      console.log("Submitted:", { id, password });
      // 유효성 검사를 통과하면 폼 제출 로직을 진행합니다.
    } else {
      console.error("Validation failed.");
      // 유효성 검사 실패 시, 적절한 사용자 피드백을 제공합니다.
    }
  };
  return isOpen ? (
    <div className={styles.modal}>
      <div className={styles.signIn}>
        <div className={styles.frame37}>
          <div className={styles.signInMain}>Sign-In</div>
          <div className={styles.frame36}>
            {/* SingIn Area */}
            <div className={styles.SignInArea}>
              <form className={styles.frame33} onSubmit={onSubmit}>
                <SignInInputField
                  label="ID"
                  value={id}
                  onChange={handleIdChange}
                />
                <SignInInputField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <SignInButton onSubmit={onSubmit} />
              </form>
            </div>
            {/* SingIn Area */}
            <div className={styles.frame34}>
              <div className={styles.socialLoginText}>Social Login</div>
              <div className={styles.frame32}>
                <div className={styles.signUpText}>
                  Don’t you have any account?
                </div>
                <div className={styles.signUp}>Sign-Up</div>
              </div>
            </div>
          </div>
        </div>
        <img className={styles.x} src="x0.svg" alt="Close" onClick={close} />
      </div>
    </div>
  ) : null;
}

export default Signin;
