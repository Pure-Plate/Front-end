import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router Dom for navigation
import CustomMapMarker from "./Marker/CustomMapMarker.jsx";
import { addMarkers } from "./Marker/Marker.jsx"; // markers.js 파일에서 함수 import

const MapNaverCur = () => {
  const mapElement = useRef(null);
  const { naver } = window;
  const [myLocation, setMyLocation] = useState({ latitude: 0, longitude: 0 });
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
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

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    /* 마커 구현 
       이 데이터를 백에서 받아와야 함 */
    const totalDataArray = [
      { dom_id: "1", title: "Marker 1", lat: 37.6543, lng: 127.0560 },
      { dom_id: "2", title: "Marker 2", lat: 37.6550, lng: 127.0570 },
      { dom_id: "3", title: "Marker 3", lat: 37.6615, lng: 127.0604 },
      { dom_id: "4", title: "Marker 4", lat: 37.6468, lng: 127.0473 },
      { dom_id: "5", title: "Marker 5", lat: 37.6501, lng: 127.0647 },
      { dom_id: "6", title: "Marker 6", lat: 37.6579, lng: 127.0495 }
    ];
    
    // 임시로 만든 마커
    const name = "잘빠진 메밀";
    const marker = new naver.maps.Marker({
      position: location,
      map: map,
      title: name,
      icon: {
        content: CustomMapMarker({ title: name, windowWidth: viewportWidth }),
        size: new naver.maps.Size(38, 58),
        anchor: new naver.maps.Point(19, 58),
      },
    });

    const zoom = mapOptions.zoom;
    const windowWidth = window.innerWidth;
    var anchor = new naver.maps.Point(16, 16);

    addMarkers(naver, map, totalDataArray, windowWidth, anchor, zoom);
  }, [myLocation, naver]);

  return <div ref={mapElement} style={{ minHeight: "100vh" }} />;
};

export default MapNaverCur;
