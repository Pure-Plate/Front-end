import CustomMapMarker from "./CustomMapMarker";
import { createInfoWindow } from "../InfoWindow/InfoWindow.jsx";
// import MarkerClustering from "./MarkerClustering.js";

// Create an array to hold markers
export const markers = [];

// update markers
function updateMarkers(map, markers) {
  var mapBounds = map.getBounds();
  var marker, position;

  for (var i = 0; i < markers.length; i++) {
    marker = markers[i];
    position = marker.getPosition();

    if (mapBounds.hasLatLng(position)) {
      showMarker(map, marker);
    } else {
      hideMarker(map, marker);
    }
  }
}

// show marker on map
function showMarker(map, marker) {
  if (marker.getMap()) return;
  marker.setMap(map);
}

// hide marker on map
function hideMarker(map, marker) {
  if (!marker.getMap()) return;
  marker.setMap(null);
}

// add a single marker
// 마커 추가.
export const addMarker = (
  naver,
  map,
  markerObj,
  windowWidth,
  zoom,
  navigate
) => {
  try {
    const {
      Id,
      Name,
      Address,
      Latitude,
      Longitude,
      Time,
      Photo,
      Phone,
      ReviewCount,
      Rating,
      Vegan,
      Halal,
      GlutenFree,
      LactoFree,
    } = markerObj;

    const markerContent = CustomMapMarker({
      title: Name,
      windowWidth: windowWidth,
      restID: Id,
      VEGAN: Vegan,
      HALAL: Halal,
      GLUTEN_FREE: GlutenFree,
      LOCTO_FREE: LactoFree,
    });

    const position = new naver.maps.LatLng(Latitude, Longitude);

    let newMarker = new naver.maps.Marker({
      position,
      map,
      icon: {
        content: markerContent,
      },
      title: Name,
      clickable: true,
    });

    newMarker.setTitle(Name);

    // Add marker to the marker list
    markers.push(newMarker);

    // marker update considering current map bounds
    naver.maps.Event.addListener(map, "zoom_changed", function () {
      updateMarkers(map, markers);
    });

    naver.maps.Event.addListener(map, "dragend", function () {
      updateMarkers(map, markers);
    });

    // InfoWindow Add
    createInfoWindow(
      naver,
      map,
      newMarker,
      Name,
      Id,
      navigate,
      Address,
      Time,
      Photo,
      Phone,
      ReviewCount,
      Rating,
      Id
    );
  } catch (e) {
    console.error(e);
  }
};

export const addMarkers = (
  naver,
  map,
  MarkerData,
  windowWidth,
  zoom,
  navigate,
  bookmarkToggleBool,
  bookmarks
) => {
  if (!Array.isArray(MarkerData)) {
    console.error("MarkerData is not an array:", MarkerData);
    return;
  }

  for (let i = 0; i < MarkerData.length; i++) {
    let markerObj = MarkerData[i];
    if (bookmarkToggleBool === true) {
      if (bookmarks[markerObj.Id]) {
        // bookmark 객체의 키 값으로 존재하면 addMarker 실행
        addMarker(naver, map, markerObj, windowWidth, zoom, navigate);
      }
    } else addMarker(naver, map, markerObj, windowWidth, zoom, navigate);
  }
};
