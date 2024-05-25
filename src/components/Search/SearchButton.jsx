import styles from "./Search.module.css";

function SearchButton({ onSubmit }) {
  return (
    <button className={styles.button} onClick={onSubmit}>
      <img
        className={styles.searchIcon}
        src="/assets/search.svg"
        alt="Search"
      />
    </button>
  );
}

export default SearchButton;
