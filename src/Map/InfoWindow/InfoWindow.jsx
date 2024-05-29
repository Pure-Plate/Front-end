import CustomWindow from "./CustomInfoWindow.jsx";

export const createInfoWindow = (naver, map, marker, name, Id, navigate) => {
  const InfoWindowContent = CustomWindow({
    title: name,
  });
  const infowindow = new naver.maps.InfoWindow({
    content: InfoWindowContent,
    backgroundColor: "transparent",
    maxWidth: 140,
    borderWidth: 0,
    // position : new naver.maps.Point(100, 20),
    disableAnchor: true, // infowindow tail remove
    disableAutoPan: true,
    pixelOffset: new naver.maps.Point(80, -5),
  });

  // 마커에 mouseover 이벤트 리스너 추가
  naver.maps.Event.addListener(marker, "mouseover", function (e) {
    infowindow.open(map, marker);
  });

  // 마커에 mouseout 이벤트 리스너 추가
  naver.maps.Event.addListener(marker, "mouseout", function (e) {
    infowindow.close();
  });

  // document.addEventListener("keydown", function(e) {
  //   // e.code 또는 e.key를 사용하여 스페이스 키를 확인합니다.
  //   if (e.code === "Space" || e.key === " ") {
  //       // 마커에 mouseout 이벤트를 강제로 트리거합니다.
  //       naver.maps.Event.trigger(marker, "mouseout");
  //   }

  naver.maps.Event.addListener(marker, "click", function (e) {
    // infowindow.open(map, marker);
    // console.log(Id);
    navigate(`/${Id}`);
  });

  return infowindow;
};
