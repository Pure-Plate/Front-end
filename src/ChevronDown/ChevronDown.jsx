import styles from "./ChevronDown.module.css";

export const ChevronDown = ({ className, ...props }) => {
  return (
    <img
      className={styles.chevronDown + " " + className}
      src="chevron-down.svg"
    />
  );
};
