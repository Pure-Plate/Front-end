import React from "react";
import styles from "./Dropdown.module.css";
import historySearchIcon from "../assets/Icons/historySearchIcon.svg";

function Dropdown({ dropDownList, dropDownItemIndex, clickDropDownItem, setDropDownItemIndex, dropdownWidth }) {
  return (
    <ul className={styles.dropDownBox} style={{ width: dropdownWidth }}>
      {dropDownList.length === 0 && (
        <li className={styles.dropDownItem}>No matching words found</li>
      )}
      {dropDownList.map((dropDownItem, dropDownIndex) => (
        <li
          key={dropDownIndex}
          onClick={() => clickDropDownItem(dropDownItem)}
          onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
          className={`${styles.dropDownItem} ${
            dropDownItemIndex === dropDownIndex ? styles.selected : ""
          }`}
        >
          <img className={styles.union} src={historySearchIcon} alt="search" />
          <div className={styles.searchHistory}>
            <span className={styles.recentSearch12}>{dropDownItem}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Dropdown;
