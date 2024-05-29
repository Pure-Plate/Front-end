import React, { useEffect, useRef, useState } from "react";
import styles from "./Pureplate.module.css";
import MapNaverCur from "../Map/Map.js";
import Attributes from "../Attributes.js";
import SearchBar from "../SearchBar.js";
import Profile from "../Profile.jsx";
import { Link, useParams, useNavigate, Outlet } from "react-router-dom";
import Restaurant from "../Restaurant/Restaurant.jsx";
import logo_icon from "../assets/Icons/logo_icon.png";
import { useAuth } from "../AuthContext.jsx";

function Pureplate() {
  const { id } = useParams(); // URL에서 레스토랑 ID를 추출
  const [isRestModalOpen, setIsRestModalOpen] = useState(false);
  const navigate = useNavigate();
  const restModalRef = useRef();
  const { isLoggedIn, bookmarksToggle, SetBookmarksToggle } = useAuth();

  const bookmarkToggle = () => {
    SetBookmarksToggle(!bookmarksToggle);
  };

  //
  // URL에 ID가 있을 경우 모달을 엽니다.
  useEffect(() => {
    if (id) {
      setIsRestModalOpen(true);
    }
  }, [id]);

  const closeRestModal = () => {
    setIsRestModalOpen(false);
    navigate("/");
  };

  // 모달 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        restModalRef.current &&
        !restModalRef.current.contains(event.target)
      ) {
        closeRestModal();
      }
    }
    // 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [restModalRef]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.homeLogedIn}>
        <div className={styles.mapContainer}>
          <MapNaverCur />
        </div>
      </div>
      <Outlet />
      {/* {isRestModalOpen && <Restaurant id={id} />} */}
      {isRestModalOpen && (
        <div
          ref={restModalRef}
          className={styles.modalWrapper}
          onClick={(e) => {
            // 모달 백그라운드 클릭 시 모달 닫기
            closeRestModal();
          }}
        >
          {/* 모달 콘텐츠를 감싸는 컨테이너 추가. 여기에는 onClick 이벤트를 추가하지 않습니다. */}
          <div
            // className={styles.modalContent}
            onClick={(e) => {
              // 모달 콘텐츠 클릭 시 이벤트가 상위로 전파되지 않도록 방지
              e.stopPropagation();
            }}
          >
            <Restaurant id={id} closeModal={closeRestModal} />
          </div>
        </div>
      )}
      <header
        className={styles.header}
        style={{
          backgroundColor: "white",
          opacity: 1,
          width: "100%",
          // display: "none",
        }}
      >
        <Link to="/">
          <img className={styles.purePlateIcon} src={logo_icon} />{" "}
        </Link>
        <SearchBar />
        <button
          onClick={bookmarkToggle}
          style={{
            border: "solid 1px",
            width: "50px",
            height: "50px",
            position: "absolute",
            right: "50px",
            top: "100px",
            display: isLoggedIn ? "block" : "none",
          }}
        >
          {bookmarksToggle ? "개짜증나" : "즐겨찾기 진짜"}{" "}
        </button>
        <Attributes />
        <Profile />
      </header>
    </div>
  );
}

export default Pureplate;
