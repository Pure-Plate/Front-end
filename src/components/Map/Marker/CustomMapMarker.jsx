/*
  CustomMapMaker은 htmlElement의 요소로, html리터럴로 작성되어야 한다. 이를 수정하려고 할 경우, 에러가 날 수 있다.
*/

const CustomMapMarker = ({
  title,
  windowWidth,
  VEGAN,
  HALAL,
  GLUTEN_FREE,
  LOCTO_FREE,
}) => {
  const renderImageContainer = (condition, imageUrl) => {
    if (condition) {
      return `<div style="display: flex; align-items: center; justify-content: center; width: 2.8rem; height: 2.8rem; margin-right: 0px;">
        <div style="width: 92%; display: flex; flex-direction: row; height: 92%; background-image: url(${imageUrl}); background-size: contain; background-position: center; background-repeat: no-repeat;"></div>
      </div>`;
    }
    return "";
  };

  VEGAN = true;
  HALAL = true;
  GLUTEN_FREE = true;
  LOCTO_FREE = true;
  const mobileContentArray = [
    '<div style="margin: 0; display: flex; align-items: center; padding: 0.5rem; border-radius: 2.3rem; border: 0.2rem solid var(--color--darkgreen); background: #D9F2EF; cursor: pointer; position: relative; z-index: 2">',
    '<div style="width: 2.5rem; height: 2.5rem; background-image: url(Images/markerIcon.svg); background-size: cover; background-position: center; background-repeat: no-repeat; margin-right: 0.5rem;"></div>',
    '<div style="flex-grow: 1; display: flex; align-items: center; overflow: hidden;">',

    // 텍스트 컨테이너
    `<div style="flex-grow: 1; max-width: calc(100% - 2.5rem); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 1.05rem; letter-spacing: -0.028rem; font-weight: 600; line-height: 2.5rem;">${title}</div>`,
    
    // 이미지 컨테이너 조건부 렌더링
    renderImageContainer(VEGAN, "./assets/flag_vegan.svg"),
    renderImageContainer(HALAL, "./assets/flag_halal.svg"),
    renderImageContainer(GLUTEN_FREE, "./assets/flag_glutenfree.svg"),
    renderImageContainer(LOCTO_FREE, "./assets/flag_loctosfree.svg"),
    '</div>',
    "</div>",
  ];

  const PCContentArray = [
    // 외부 컨테이너. 내부 요소를 table-cell로 정렬할 수 있게 한다.
    '<div style="margin: 0; display: table; padding: 0.35rem; table-layout: auto; border-radius: 18.468px; border: 0.14rem solid var(--color--darkgreen); background: #D9F2EF; cursor: pointer; position: relative; z-index: 2; box-shadow:0px 24px 48px 0 rgba(0,0,0,0.16);">',
    // 텍스트 컨테이너와 아이콘 컨테이너를 flex 컨테이너로 정렬
    '<div style="display: flex; align-items: center;">',
    // 텍스트 컨테이너
    '<div style="max-width: 16.1rem; height: 2.8rem; padding: 0 0.56rem 0 0.56rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: table-cell; vertical-align: middle; cursor: pointer; font-size: 1.05rem; letter-spacing: -0.028rem; font-weight: 600; line-height: 2.8rem;">',
    title,
    "</div>",
    // 이미지 컨테이너 조건부 렌더링
    renderImageContainer(VEGAN, "./assets/flag_vegan.svg"),
    renderImageContainer(HALAL, "./assets/flag_halal.svg"),
    renderImageContainer(GLUTEN_FREE, "./assets/flag_glutenfree.svg"),
    renderImageContainer(LOCTO_FREE, "./assets/flag_loctosfree.svg"),
    "</div>", // flex 컨테이너 닫기
    // border 스타일 조정해서 역삼각형 만들기
    '<span style="position: absolute; border-style: solid; border-width: 1.08rem 0.9rem 0 0.9rem; border-color: #D9F2EF transparent; display: block; width: 0; z-index: 0; top: 3.35rem; left: 1.8rem; box-shadow:0px 24px 48px 0 rgba(0,0,0,0.16);"></span>',
    "</div>",
  ];

  if (windowWidth < 768) return mobileContentArray.join("");

  return PCContentArray.join("");
};

export default CustomMapMarker;
