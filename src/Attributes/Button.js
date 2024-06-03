import { useAuth } from "../AuthContext";
import styles from "./Button.module.css";
import { cssList, icons } from "./iconConfig"; // 분리된 설정 파일 임포트
import { useEffect, useState } from "react";

function Button({ attribute }) {
  const [list, setList] = useState(() => {
    const initialList = {};
    Object.keys(icons).forEach((key) => {
      initialList[key] = icons[key].default;
    });
    return initialList;
  });

  const { dietToggle, setDietToggle } = useAuth(); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Add resize event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle button click
  const onClick = () => {
    const updatedDietToggle = { ...dietToggle }; // Copy dietToggle object
    updatedDietToggle[attribute] = !updatedDietToggle[attribute]; // Toggle the attribute value
    setDietToggle(updatedDietToggle);
  };

  // Determine the className based on the attribute's state
  const className = `${
    dietToggle[attribute] ? styles.selectedTrue : styles.selectedFalse
  } ${styles.distance}`;

  // Update icons based on dietToggle state
  useEffect(() => {
    const updatedList = {};
    Object.keys(icons).forEach((key) => {
      updatedList[key] = dietToggle[key]
        ? icons[key].active
        : icons[key].default;
    });
    setList(updatedList);
  }, [dietToggle, icons]);

  return (
    <>
      {windowWidth > 900 ? (
        // Render a div with the attribute name and appropriate style
        <div
          className={className}
          onClick={onClick}
          style={
            dietToggle[attribute]
              ? { backgroundColor: cssList[`${attribute}`] }
              : {}
          }
        >
          {attribute}
        </div>
      ) : (
        // Render an image icon for smaller screens
        <img
          className={styles.toggleIcon}
          onClick={onClick}
          src={list[attribute]}
          alt="search"
        />
      )}
    </>
  );
}

export default Button;
