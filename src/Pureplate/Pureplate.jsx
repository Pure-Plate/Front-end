import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import styles from "./Pureplate.module.css";
import MapNaverCur from "../Map/Map.js";
import RestaurantModal from "./RestaurantModal.jsx";
import Header from "./Header/Header.jsx";
import { useAuth } from "../AuthContext.jsx";

function Pureplate() {
  const { id } = useParams(); // Extract restaurant ID from URL
  const [isRestModalOpen, setIsRestModalOpen] = useState(false);
  const navigate = useNavigate();
  const { bookmarksToggle, SetBookmarksToggle } = useAuth();

  const bookmarkToggle = () => {
    SetBookmarksToggle(!bookmarksToggle);
  };

  useEffect(() => {
    if (id) {
      setIsRestModalOpen(true);
    }
  }, [id]);

  const closeRestModal = () => {
    setIsRestModalOpen(false);
    navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.homeLogedIn}>
        <div className={styles.mapContainer}>
          <MapNaverCur />
        </div>
      </div>
      <Outlet />
      {isRestModalOpen && (
        <RestaurantModal id={id} closeModal={closeRestModal} />
      )}
      <Header isRestModalOpen={isRestModalOpen} bookmarkToggle={bookmarkToggle} />
    </div>
  );
}

export default Pureplate;
