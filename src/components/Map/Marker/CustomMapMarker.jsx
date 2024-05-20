const CustomMapMarker = ({
  title,
  windowWidth,
  VEGAN,
  HALAL,
  GLUTEN_FREE,
  LOCTO_FREE,
}: {
  title: string,
  windowWidth: number,
  VEGAN: boolean,
  HALAL: boolean,
  GLUTEN_FREE: boolean,
  LOCTO_FREE: boolean,
}) => {
  const renderImageContainer = (condition, imageUrl) => {
    if (condition) {
      return `<div style="display: flex; align-items: center; justify-content: center; width: 2.8rem; height: 2.8rem; margin-right: 4px;">
        <div style="width: 92%; height: 92%; background-image: url(${imageUrl}); background-size: contain; background-position: center; background-repeat: no-repeat;"></div>
      </div>`;
    }
    return "";
  };

  const mobileContentArray = [
    '<div style="margin: 0; display: table; padding: 0.5rem; table-layout: auto; border-radius: 2.3rem; border: 0.2rem solid var(--color--darkgreen); background: white; cursor: pointer; position: relative; z-index: 2">',
    '<div style="display: table-cell; display: inline-block; width: 2.5rem; height: 2.5rem; background-image: url(Images/markerIcon.svg); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>',
    '<span style="position: absolute; border-style: solid; border-width: 1rem 1rem 0 1rem; border-color: #ffffff transparent; display: block; width: 0; z-index: 1; top: 3.1rem; left: 0.75rem;"></span>',
    '<span style="position: absolute; border-style: solid; border-width: 1rem 1rem 0 1rem; border-color: var(--color--darkgreen) transparent; display: block; width: 0; z-index: 0; top: 3.35rem; left: 0.75rem;"></span>',
    "</div>",
  ];

  VEGAN = true;

  const PCContentArray = [
    // 외부 컨테이너. 내부 요소를 table-cell로 정렬할 수 있게 한다.
    '<div style="margin: 0; display: table; padding: 0.35rem; table-layout: auto; border-radius: 18.468px; border: 0.14rem solid var(--color--darkgreen); background: #D9F2EF; cursor: pointer; position: relative; z-index: 2; box-shadow:0px 24px 48px 0 rgba(0,0,0,0.16);">',
    // 텍스트 컨테이너
    '<div style="max-width: 16.1rem; height: 2.8rem; padding: 0 0.56rem 0 0.56rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: table-cell; vertical-align: middle; cursor: pointer; font-size: 1.05rem; letter-spacing: -0.028rem; font-weight: 600; line-height: 2.8rem;">',
    title,
    "</div>",
    // 이미지 컨테이너 조건부 렌더링
    renderImageContainer(VEGAN, "./assets/flag_vegan.svg"),
    renderImageContainer(HALAL, "Images/halalIcon.svg"),
    renderImageContainer(GLUTEN_FREE, "Images/glutenFreeIcon.svg"),
    renderImageContainer(LOCTO_FREE, "Images/loctoFreeIcon.svg"),
    // border 스타일 조정해서 역삼각형 만들기
    '<span style="position: absolute; border-style: solid; border-width: 1.08rem 0.9rem 0 0.9rem; border-color: #D9F2EF transparent; display: block; width: 0; z-index: 0; top: 3.35rem; left: 1.8rem; box-shadow:0px 24px 48px 0 rgba(0,0,0,0.16);"></span>',
    "</div>",
  ];

  if (windowWidth < 768) return mobileContentArray.join("");

  return PCContentArray.join("");
};

export default CustomMapMarker;
