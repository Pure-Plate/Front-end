import React from "react";
import styles from "./Pureplate.module.css";
import MapNaverCur from "../../components/Map/Map.js";
import Header from "./Header/header.jsx"; 

function Pureplate() {
  return (
      <div className={styles.homeLogedIn}>
        <div className={styles.mapContainer}>
          <MapNaverCur />
        </div>
        <Header />
      </div>
  );
};

export default Pureplate;
