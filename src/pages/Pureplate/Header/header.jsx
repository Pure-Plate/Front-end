import React from "react";
import styles from "./header.module.css";
import SearchBar from "../../../components/Search/SearchBar.js";
import Attributes from "../../../components/DietAttributes/DietAttributes.js";
import Profile from "../../../components/Profile/Profile.jsx";
import Bookmark from "../../../components/Bookmark/Star.jsx";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.purePlateIcon} />
        <SearchBar />
      </div>
      <div className={styles.right}>
        <Attributes />
        <Profile />
      </div>
      <Bookmark />
    </header>
  );
};

export default Header;
