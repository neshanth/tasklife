import React from "react";
// Parent SVG component
const SvgIcon = ({ w = "32", h = "32", fill = "var(--tl-text-light-2)", viewBox = "0 0 256 256", children, ...rest }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} fill={fill} viewBox={viewBox} {...rest}>
      {children}
    </svg>
  );
};

const Icons = ({ type, w, h, fill }) => {
  switch (type) {
    case "house":
      return (
        <SvgIcon>
          <path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"></path>
        </SvgIcon>
      );
    case "logout":
      return (
        <SvgIcon transform="rotate(180)">
          <path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path>
        </SvgIcon>
      );
    case "plus":
      return (
        <SvgIcon w={w} h={h} fill={`${fill ? fill : "var(--tl-theme-base)"}`}>
          <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
        </SvgIcon>
      );
    case "stats":
      return (
        <SvgIcon viewBox="0 0 576 512">
          <path d="M304 240V16.58C304 7.555 310.1 0 320 0C443.7 0 544 100.3 544 224C544 233 536.4 240 527.4 240H304zM493.1 192C479.1 120.5 423.5 64.04 352 50.9V192H493.1zM256 49.61V288L412.5 444.5C419.2 451.2 418.7 462.2 411 467.7C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272C32 150.7 122.1 50.34 238.1 34.25C248.2 32.99 256 40.36 256 49.61V49.61zM208 307.9V90.91C133.4 117.3 80 188.4 80 272C80 378 165.1 464 272 464C299.2 464 324.1 458.4 348.4 448.2L208 307.9zM558.4 288C567.6 288 575 295.8 573.8 305C566.1 360.9 539.1 410.6 499.9 447.3C493.9 452.1 484.5 452.5 478.7 446.7L320 288H558.4z" />
        </SvgIcon>
      );
    case "hamburger":
      return (
        <svg width="20" xmlns="http://www.w3.org/2000/svg" height="16" fill="none">
          <g data-testid="menu">
            <g className="fills">
              <rect width="20" height="16" class="frame-background" style={{ fill: "rgb(255, 255, 255)", fillOpacity: "1" }} ry="6" rx="6" />
            </g>
            <g data-testid="icon-list" class="frame-children">
              <path
                d="M20 8c0 .491-.373.889-.833.889H.833C.373 8.889 0 8.491 0 8s.373-.889.833-.889h18.334c.46 0 .833.398.833.889ZM.833 1.778h18.334c.46 0 .833-.398.833-.889S19.627 0 19.167 0H.833C.373 0 0 .398 0 .889s.373.889.833.889Zm18.334 12.444H.833c-.46 0-.833.398-.833.889S.373 16 .833 16h18.334c.46 0 .833-.398.833-.889s-.373-.889-.833-.889Z"
                style={{
                  fill: "rgb(55, 65, 81)",
                  fillOpacity: 1,
                }}
                className="fills"
              />
              <g className="strokes">
                <path
                  d="M20 8c0 .491-.373.889-.833.889H.833C.373 8.889 0 8.491 0 8s.373-.889.833-.889h18.334c.46 0 .833.398.833.889ZM.833 1.778h18.334c.46 0 .833-.398.833-.889S19.627 0 19.167 0H.833C.373 0 0 .398 0 .889s.373.889.833.889Zm18.334 12.444H.833c-.46 0-.833.398-.833.889S.373 16 .833 16h18.334c.46 0 .833-.398.833-.889s-.373-.889-.833-.889Z"
                  style={{
                    fill: "none",
                    strokeWidth: "0.5",
                    stroke: "rgb(55, 65, 81)",
                    strokeOpacity: 1,
                  }}
                  className="stroke-shape"
                />
              </g>
            </g>
          </g>
        </svg>
      );
    case "close":
      return (
        <svg width="14" xmlns="http://www.w3.org/2000/svg" height="14" fill="none">
          <g data-testid="close">
            <g className="fills">
              <rect
                width="14"
                height="14"
                className="frame-background"
                style={{
                  fill: "rgb(255, 255, 255)",
                  fillOpacity: 1,
                }}
                ry="6"
                rx="6"
              />
            </g>
            <g data-testid="icon-close" className="frame-children">
              <path d="M14 0 0 14m14 0L0 0" className="fills" />
              <g className="strokes">
                <path
                  d="M14 0 0 14m14 0L0 0"
                  style={{
                    fill: "none",
                    strokeWidth: 2.5,
                    stroke: "rgb(55, 65, 81)",
                    strokeOpacity: 1,
                    strokeLinecap: "round",
                  }}
                  className="stroke-shape"
                />
              </g>
            </g>
          </g>
        </svg>
      );
    case "pencil":
      return (
        <SvgIcon w={w} h={h}>
          <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path>
        </SvgIcon>
      );
    case "trash":
      return (
        <SvgIcon w={w} h={h}>
          <path d="M216,48H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM192,208H64V64H192ZM80,24a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H88A8,8,0,0,1,80,24Z"></path>
        </SvgIcon>
      );
    case "tag":
      return (
        <SvgIcon w={w} h={h}>
          <path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63Zm-96,96L48,132.69V48h84.69L232,147.31ZM96,84A12,12,0,1,1,84,72,12,12,0,0,1,96,84Z"></path>
        </SvgIcon>
      );
    case "circle-filled":
      return (
        <SvgIcon w={w} h={h} viewBox="324 301.01 16 16" fill="none">
          <path
            d="M332 301.01a8 8 0 1 0 8 8 8.01 8.01 0 0 0-8-8Zm3.512 6.589-4.307 4.308a.619.619 0 0 1-.871 0l-1.846-1.846a.615.615 0 1 1 .87-.871l1.411 1.412 3.873-3.874a.616.616 0 0 1 .87.871Z"
            style={{
              fill: "rgb(58, 186, 37)",
              fillOpacity: 1,
            }}
            className="fills"
            data-testid="circle-check-filled"
          />
        </SvgIcon>
      );
    case "circle":
      return (
        <SvgIcon w={w} h={h}>
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"></path>
        </SvgIcon>
      );
    case "calendar":
      return (
        <SvgIcon w={w} h={h} fill={fill}>
          <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"></path>
        </SvgIcon>
      );
    case "search":
      return (
        <SvgIcon w="18" h="18" viewBox="1171 234.01 18 18" fill="none">
          <g data-testid="magnifying-glass">
            <path
              d="m1187.82 249.96-3.848-3.847a6.77 6.77 0 1 0-.869.869l3.847 3.848a.616.616 0 0 0 .87-.87Zm-14.574-8.171a5.533 5.533 0 1 1 5.533 5.532 5.539 5.539 0 0 1-5.533-5.532Z"
              style={{
                fill: "rgb(107, 114, 128)",
                fillOpacity: 1,
              }}
              className="fills"
            />
            <g className="strokes">
              <path
                d="m1187.82 249.96-3.848-3.847a6.77 6.77 0 1 0-.869.869l3.847 3.848a.616.616 0 0 0 .87-.87Zm-14.574-8.171a5.533 5.533 0 1 1 5.533 5.532 5.539 5.539 0 0 1-5.533-5.532Z"
                style={{
                  fill: "none",
                  strokeWidth: 0.5,
                  stroke: "rgb(107, 114, 128)",
                  strokeOpacity: 1,
                }}
                className="stroke-shape"
              />
            </g>
          </g>
        </SvgIcon>
      );

    default:
      return null;
  }
};
export default Icons;
