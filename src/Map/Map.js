import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  // BrowserRouter as Router,
  // Route,
  // Switch,
  useNavigate,
} from "react-router-dom";
import { addMarkers } from "./Marker/Marker.jsx"; // markers.js 파일에서 함수 import
import { useAuth } from "../AuthContext.jsx";
// import MarkerCluster from "./Marker/MarkerCluster.jsx";

const MapNaverCur = () => {
  const mapElement = useRef(null);
  const { naver } = window;
  const [myLocation, setMyLocation] = useState({ latitude: 0, longitude: 0 });
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [RestaurantData, setRestaurantData] = useState([]);
  const { URL, bookmarks, bookmarksToggle } = useAuth();
  const navigate = useNavigate();

  // Update viewport size
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Get User's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  // Get data from server
  useEffect(() => {
    axios
      .get(`${URL}/api/restaurant/list`)
      .then((response) => {
        setRestaurantData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restraunt data:", error);
      });
  }, []);

  function success(position) {
    setMyLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  function error() {
    setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
  }

  // Initialize Map
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
      zoom: 12,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.RIGHT_CENTER,
      },
      logoControlOptions: {
        position: naver.maps.Position.LEFT_BOTTOM,
      },
      scaleControl: false,
      mapDataControl: false,
    };

    // Map implementation
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    const zoom = mapOptions.zoom;
    const windowWidth = window.innerWidth;
    const MarkerData = RestaurantData.data;

    // 서버에서 받아온 데이터로 마커 추가
    addMarkers(
      naver,
      map,
      MarkerData,
      windowWidth,
      zoom,
      navigate,
      bookmarksToggle,
      bookmarks
    );
  }, [myLocation, naver, RestaurantData, bookmarksToggle]);

  // 마커 추가
  //   addMarkers(naver, map, totalDataArray, windowWidth, zoom);
  // }, [myLocation, naver]);

  return <div ref={mapElement} style={{ minHeight: "100vh" }} />;
};

export default MapNaverCur;
