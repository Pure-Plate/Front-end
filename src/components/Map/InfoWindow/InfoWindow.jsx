import CustomWindow from "./CustomInfoWindow.jsx";

export const createInfoWindow = (naver, map, marker, name) => { 
  const InfoWindowContent = CustomWindow({
    title: name,
  })
  const infowindow = new naver.maps.InfoWindow({
    content: InfoWindowContent,
    maxWidth: 140,
    borderWidth: 0,
    // position : new naver.maps.Point(100, 20),
    disableAnchor: true, // infowindow tail remove
    disableAutoPan : true,
    pixelOffset: new naver.maps.Point(80, -5)
  }); 

  // 마커에 mouseover 이벤트 리스너 추가
  naver.maps.Event.addListener(marker, "mouseover", function(e) {
    infowindow.open(map, marker);
  });

  // 마커에 mouseout 이벤트 리스너 추가
  naver.maps.Event.addListener(marker, "mouseout", function(e) {
    infowindow.close();
  });

  return infowindow;
};