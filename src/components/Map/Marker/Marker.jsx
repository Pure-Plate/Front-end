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
export const addMarker = (naver, map, id, name, position, windowWidth, zoom, VEGAN, HALAL, GLUTEN_FREE, LOCTO_FREE) => {
  try {
    const markerContent = CustomMapMarker({
      title: name,
      windowWidth: windowWidth,
      restID : id,
      VEGAN,
      HALAL,
      GLUTEN_FREE,
      LOCTO_FREE,
    });

    let newMarker = new naver.maps.Marker({
      position,
      map,
      icon: {
        content: markerContent,
      },
      title: name,
      clickable: true,
    });

    newMarker.setTitle(name);
    
    // Add marker to the marker list
    markers.push(newMarker);

    // marker update considering current map bounds
    naver.maps.Event.addListener(map, 'zoom_changed', function() {
      updateMarkers(map, markers);
    });

    naver.maps.Event.addListener(map, 'dragend', function() {
      updateMarkers(map, markers);
    });

    // InfoWindow Add
    createInfoWindow(naver, map, newMarker, name);
    
  } catch (e) {
    console.error(e);
  }
};

export const addMarkers = (naver, map, totalDataArray, windowWidth, zoom) => {
  for (let i = 0; i < totalDataArray.length; i++) {
    let markerObj = totalDataArray[i];
    const { dom_id, title, lat, lng, VEGAN, HALAL, GLUTEN_FREE, LOCTO_FREE } = markerObj;

    const position = new naver.maps.LatLng(lat, lng);
    addMarker(naver, map, dom_id, title, position, windowWidth, zoom, VEGAN, HALAL, GLUTEN_FREE, LOCTO_FREE);
  }
};
