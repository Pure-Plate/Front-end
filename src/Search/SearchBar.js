import React, { useRef, useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import findIcon from "../assets/Icons/searchIcon.svg";
import Dropdown from "./Dropdown";
import useSearchRestaurants from "./useSearchRestaurants";

function SearchBar() {
  const {
    query,
    onChange,
    onSubmit,
    isHaveQuery,
    dropDownList,
    dropDownItemIndex,
    handleDropDownKey,
    clickDropDownItem,
  } = useSearchRestaurants();

  const searchFormRef = useRef(null);
  const [dropdownWidth, setDropdownWidth] = useState("100%");

  //Dynamically allocate width to Dropbox 
  useEffect(() => {
    if (searchFormRef.current) {
      setDropdownWidth(`${searchFormRef.current.offsetWidth}px`);
    }
  }, [query]);

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchLayer}>
        <form
          className={styles.searchForm}
          onSubmit={onSubmit}
          ref={searchFormRef}
        >
          <input
            className={`${styles.searchInput} ${query ? styles.hasValue : ""}`}
            type="text"
            name="search"
            id="searchInput"
            placeholder="Search"
            onChange={onChange}
            onKeyUp={handleDropDownKey}
            value={query}
            autoComplete="off"
          />
        </form>
        {isHaveQuery && (
          <Dropdown
            dropDownList={dropDownList}
            dropDownItemIndex={dropDownItemIndex}
            clickDropDownItem={clickDropDownItem}
            setDropDownItemIndex={() => {}}
            dropdownWidth={dropdownWidth}
          />
        )}
      </div>
      <button className={styles.searchButton} onClick={onSubmit}>
        <img className={styles.searchIcon} src={findIcon} alt="Search" />
      </button>
    </div>
  );
}

export default SearchBar;
