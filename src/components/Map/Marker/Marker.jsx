import CustomMapMarker from "./CustomMapMarker";

// 마커 담을 배열 생성
const markers: naver.maps.Marker[] = [];

export const addMarker = (naver, map, id, name, lat, lng, windowWidth) => {
  try {
    const markerContent = CustomMapMarker({
      title: name,
      windowWidth: windowWidth,
      VEGAN: true, // 현재는 모든 플래그를 true로 설정
      HALAL: true,
      GLUTEN_FREE: false,
      LOCTO_FREE: true,
    });

    let newMarker = new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lng),
      map,
      icon: {
        content: markerContent,
        anchor: new naver.maps.Point(16, 16), // 앵커 포인트는 필요에 따라 조정
      },
      title: name,
      clickable: true,
    });

    newMarker.setTitle(name);
    // 마커 리스트에 추가

    markers.push(newMarker);
    //마커에 이벤트 핸들러 등록
    naver.maps.Event.addListener(newMarker, "click", () =>
      markerClickHandler(id)
    );

    const markerClickHandler = (id) => {
      // if (infowindow.getMap()) {
      //   infowindow.close();b
      // } else {
      //   infowindow.open(map, marker);
      // }
    };
  } catch (e) {
    console.error(e);
  }
};

export const addMarkers = (naver, map, totalDataArray, windowWidth) => {
  for (let i = 0; i < totalDataArray.length; i++) {
    let markerObj = totalDataArray[i];
    const { dom_id, title, lat, lng } = markerObj;
    addMarker(naver, map, dom_id, title, lat, lng, windowWidth);
  }
};
