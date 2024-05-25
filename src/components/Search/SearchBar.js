import styles from "./Search.module.css";
import searchIcon from '../../assets/Icons/search.png';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit 콜백 함수 호출 (검색어를 전달할 수 있음)
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        <img src={searchIcon} alt="Search" className={styles.searchIcon} />
      </button>
    </form>
  );
};

export default SearchBar;
