import styles from "./SignInInputField.module.css";

function SignInInputField({
  label,
  value,
  onChange,
  type = "text",
  errorMessage,
}) {
  return (
    <div className={styles.inputFrame}>
      <div className={styles.nameLabel}>{label}</div>
      <div className={styles.input}>
        <input
          className={`${styles.placeholder} ${
            errorMessage ? styles.errorInput : ""
          }`}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={errorMessage ? `⚠ ${errorMessage}` : label} // placeholder도 prop으로부터 받은 label을 사용합니다.
        />
      </div>
    </div>
  );
}
export default SignInInputField;
