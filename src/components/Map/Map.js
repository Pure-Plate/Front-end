import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { addMarkers } from "./Marker/Marker.jsx"; // markers.js 파일에서 함수 import
// import MarkerCluster from "./Marker/MarkerCluster.jsx";

const MapNaverCur = () => {
  const mapElement = useRef(null);
  const { naver } = window;
  const [myLocation, setMyLocation] = useState({ latitude: 0, longitude: 0 });
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [RestaurantData, setRestaurantData] = useState([]);

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
    axios.get('/api/restaurant/list/')
      .then(response => {
        setRestaurantData(response.data);
        // console.log('Response data:', response.data);
      })
      .catch(error => {
        console.error('Error fetching restraunt data:', error);
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
    ) return;

    const location = new naver.maps.LatLng(
      myLocation.latitude,
      myLocation.longitude
    );

    const mapOptions = {
      center: location,
      zoom: 17,
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

    /* 마커 구현 
       이 데이터를 백에서 받아와야 함 */
    // const totalDataArray = [
    //   { id: "1", title: "Marker 1", lat: 37.6543, lng: 127.0560, VEGAN: true, HALAL: false, GLUTEN_FREE: true, LOCTO_FREE: false },
    //   { id: "2", title: "Marker 2", lat: 37.6550, lng: 127.0570, VEGAN: false, HALAL: true, GLUTEN_FREE: false, LOCTO_FREE: true },
    //   { id: "3", title: "Marker 3", lat: 37.6615, lng: 127.0604, VEGAN: true, HALAL: true, GLUTEN_FREE: false, LOCTO_FREE: false },
    //   { id: "4", title: "Marker 4", lat: 37.6468, lng: 127.0473, VEGAN: false, HALAL: false, GLUTEN_FREE: true, LOCTO_FREE: true },
    //   { id: "5", title: "강아지빵", lat: 37.6501, lng: 127.0647, VEGAN: true, HALAL: false, GLUTEN_FREE: true, LOCTO_FREE: false },
    //   { id: "6", title: "잘빠진 메밀", lat: 37.625876, lng: 127.0787062, VEGAN: true, HALAL: true, GLUTEN_FREE: false, LOCTO_FREE: true }
    // ];


    const zoom = mapOptions.zoom;
    const windowWidth = window.innerWidth;
    const MarkerData = RestaurantData.data;

    // 서버에서 받아온 데이터로 마커 추가
    addMarkers(naver, map, MarkerData, windowWidth, zoom);
  }, [myLocation, naver, RestaurantData]);

    // 마커 추가
  //   addMarkers(naver, map, totalDataArray, windowWidth, zoom);
  // }, [myLocation, naver]);

  return <div ref={mapElement} style={{ minHeight: "100vh" }} />;
};

export default MapNaverCur;
