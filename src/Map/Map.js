import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router Dom for navigation
import styles from "./Map.module.css";
import profile from "../Profile/Profile.jsx";
import CustomMapMarker from "./Marker/CustomMapMarker.jsx";

const MapNaverCur = () => {
  const mapElement = useRef(null);
  const { naver } = window;
  const [myLocation, setMyLocation] = useState({ latitude: 0, longitude: 0 });
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const navigate = useNavigate(); // Hook for navigation

  // 윈도우 사이즈에 따라 viewportWidth 설정
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  useEffect(() => {
    if (
      !mapElement.current ||
      !naver ||
      !myLocation.latitude ||
      !myLocation.longitude
    )
      return;

    const location = new naver.maps.LatLng(
      myLocation.latitude,
      myLocation.longitude
    );

    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      // 슬라이더 있으려면 스타일을 LARGE로. 없으면 SMALL
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.RIGHT_CENTER,
      },
      // 네이버 로고 위치 변경. 없애는 것은 네이버 정책상 불가.
      logoControlOptions: {
        position: naver.maps.Position.LEFT_BOTTOM,
      },
      scaleControl: false,
      mapDataControl: false,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    const name = "잘빠진 메밀";

    // 기본 마커 추가
    const marker = new naver.maps.Marker({
      position: location,
      map: map,
      title: name,
      icon: {
        content: CustomMapMarker({ title: name, windowWidth: viewportWidth }),
        // 마커의 크기 지정
        size: new naver.maps.Size(38, 58),
        // 마커의 기준위치 지정
        anchor: new naver.maps.Point(19, 58),
      },
    });

    // 마커를 담을 배열
    const createMarkerList = [];

    // 데이터 배열 순회하면서 마커 생성 진행
    /**** 여기서 백엔드 연결해서 데이터 받아와야함! ****/
    const totalDataArray = [
      // Add your data here
      { dom_id: "1", title: "Marker 1", lat: 37.4979517, lng: 127.0276188, Vegan: true, Halal: true, GlutenFree: true, LoctoFree: true},
      { dom_id: "2", title: "Marker 2", lat: 37.4979517, lng: 127.0276188, Vegan: true, Halal: true, GlutenFree: true, LoctoFree: true},
      // More data...
    ];

    // 마커 추가 함수
    const addMarkers = () => {
      for (let i = 0; i < totalDataArray.length; i++) {
        let markerObj = totalDataArray[i];
        const { dom_id, title, lat, lng } = markerObj;
        addMarker(dom_id, title, lat, lng);
      }
    };

    // 마커 생성하고 createMarkerList에 추가
    const addMarker = (id, name, lat, lng) => {
      try {
        let newMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(lat, lng),
          map,
          title: name,
          clickable: true,
        });
        newMarker.setTitle(name);
        // 마커 리스트에 추가
        createMarkerList.push(newMarker);
        // 마커에 이벤트 핸들러 등록
        naver.maps.Event.addListener(newMarker, "click", () =>
          markerClickHandler(id)
        );
      } catch (e) {
        console.error(e);
      }
    };

    // 마커를 클릭했을 때 실행할 이벤트 핸들러
    const markerClickHandler = (id) => {
      navigate(`/ground/${id}`);
    };

    addMarkers(); // 마커 추가 함수 호출

  }, [myLocation, naver]);

  return <div ref={mapElement} style={{ minHeight: "100vh" }} />;

  function success(position) {
    setMyLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  function error() {
    setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
  }
};

export default MapNaverCur;
