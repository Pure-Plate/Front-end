import React from "react";
import styles from "./Bookmark.module.css";
import bookmarkUnselected from "../assets/Icons/Bookmark/Star1.svg";
import bookmarkSelected from "../assets/Icons/Bookmark/Star2.svg";
import { useAuth } from "../AuthContext.jsx";

function BookmarkIcon({ isRestModalOpen, bookmarkToggle }) {
  const { isLoggedIn, bookmarksToggle } = useAuth();

  if (isRestModalOpen || !isLoggedIn) {
    return null; // Return null if the modal is open or user is not logged in
  }

  return (
    <img
      className={styles.starIcon}
      onClick={bookmarkToggle}
      alt="search"
      src={bookmarksToggle ? bookmarkSelected : bookmarkUnselected}
    />
  );
}

export default BookmarkIcon;
