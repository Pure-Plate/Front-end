import React, { useState } from "react";
import styles from "./Star.module.css";

function Star() {
  const [isClicked, setIsClicked] = useState(false);

  const changeColor = () => {
    setIsClicked(!isClicked);
  };

  return (
    <button 
      className={`${styles.starFrame} ${isClicked ? styles.clicked : ""}`} 
      onClick={changeColor}
    >
      <div className={styles.starInCircle}>
        <div className={styles.star}></div>
      </div>
      <div className={styles.StarName}>SAVE</div>
    </button>
  );
}

export default Star;
