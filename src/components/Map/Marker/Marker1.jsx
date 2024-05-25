import CustomMapMarker from "./CustomMapMarker";
import InfoWindowComponent from '../InfoWindow/InfoWindow.jsx';
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

//add a single marker
export const addMarker = (naver, map, id, name, position, windowWidth, anchor, zoom) => {
  try {
    const markerContent = CustomMapMarker({
      title: name,
      windowWidth: windowWidth,
      VEGAN: true, // Currently set all flags to true
      HALAL: true,
      GLUTEN_FREE: false,
      LOCTO_FREE: true,
    });

    let newMarker = new naver.maps.Marker({
      position,
      map,
      icon: {
        content: markerContent,
        anchor, // Adjust anchor point as needed
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

    
    /* InfoWindow */
    const InfoContent = [];
    
    // InfoWindow Add */
    <InfoWindowComponent map={map} marker={newMarker} content={InfoContent} />;
  
  } catch (e) {
    console.error(e);
  }
};

export const addMarkers = (naver, map, totalDataArray, windowWidth, anchor, zoom) => {
  for (let i = 0; i < totalDataArray.length; i++) {
    let markerObj = totalDataArray[i];
    const { dom_id, title, lat, lng } = markerObj;

    const position = new naver.maps.LatLng(lat, lng);
    addMarker(naver, map, dom_id, title, position, windowWidth, anchor, zoom);
  }
};
