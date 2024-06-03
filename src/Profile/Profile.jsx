import { ChevronDown } from "../ChevronDown/ChevronDown.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import Sign from "./Signin/Sign.jsx";
import LogoutConfirmModal from "./Logout/LogoutConfirmModal.jsx";
import styles from "./Profile.module.css";
import profileIcon from "../assets/Icons/profile.svg";
import Swal from "sweetalert2";

function Profile() {
  const { isLoggedIn, login, logout, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false); // Logout confirmation modal state
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      closeModal();
    }
  }, [isLoggedIn]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    if (isLoggedIn) {
      setDropdownOpen(!dropdownOpen);
    }
  };

  const openLogoutConfirm = () => {
    setIsLogoutConfirmOpen(true);
    setDropdownOpen(false);
  };

  const closeLogoutConfirm = () => {
    setIsLogoutConfirmOpen(false);
  };

  const showAlert = () => {
    Swal.fire({
      title: "You have successfully logged out!", // Alert title
      text: `Goodbye!!`, // Alert contents
      icon: "success", // Alert type (success, error, warning, info, question)
    });
  };
  const handleLogout = () => {
    logout();
    showAlert();
    setIsLogoutConfirmOpen(false);
    navigate("/");
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.dropdownContainer}>
        <img
          className={styles.profileIcon}
          src={profileIcon}
          alt="profile"
          onClick={isLoggedIn ? toggleDropdown : openModal}
        />
        <button
          className={styles.profile}
          onClick={isLoggedIn ? toggleDropdown : openModal}
        >
          {!isLoggedIn ? (
            <span style={{ width: "100%" }}>Sign In</span>
          ) : (
            <>
              <div className={styles.jiwoo}>{user}</div>
              <ChevronDown
                className={styles.chevronDownInstance2}
              ></ChevronDown>
            </>
          )}
        </button>
        {dropdownOpen && (
          <div
            className={`${styles.dropdownMenu} ${
              dropdownOpen
                ? styles["slide-fade-in-dropdown"]
                : styles["slide-fade-out-dropdown"]
            }`}
          >
            <ul>
              <li className={styles.dropProfile}>LCH</li>
              <Link to="/Feedback" style={{ color: "black" }}>
                <li
                  onClick={() => {
                    console.log(user);
                    setDropdownOpen(false);
                  }}
                  style={{ color: "black" }}
                >
                  Feedback
                </li>
              </Link>
              <li onClick={openLogoutConfirm}>Logout</li>
            </ul>
          </div>
        )}
        <Sign isOpen={isModalOpen} close={closeModal} />
        <LogoutConfirmModal
          isOpen={isLogoutConfirmOpen}
          onClose={closeLogoutConfirm}
          onConfirm={handleLogout}
        />
      </div>
    </div>
  );
}

export default Profile;
