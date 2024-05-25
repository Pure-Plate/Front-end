import CustomMapMarker from "./CustomMapMarker";

// Create an array to hold markers
const markers: naver.maps.Marker[] = [];

// update markers
function updateMarkers(map, markers) {
  var mapBounds = map.getBounds();
  var marker, position;

  for (var i = 0; i < markers.length; i++) {

      marker = markers[i]
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
    if (marker.setMap()) return;
    marker.setMap(map);
}

// hide marker on map
function hideMarker(map, marker) {

    if (!marker.setMap()) return;
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

    // Register event handler for the marker
    naver.maps.Event.addListener(newMarker, "click", () =>
      markerClickHandler(id)
    );

    naver.maps.Event.addListener(map, 'zoom_changed', function() {
      updateMarkers(map, markers);
    });

    naver.maps.Event.addListener(map, 'dragend', function() {
      updateMarkers(map, markers);
    });

    const markerClickHandler = (id) => {
      // if (infowindow.getMap()) {
      //   infowindow.close();
      // } else {
      //   infowindow.open(map, marker);
      // }
    };
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
