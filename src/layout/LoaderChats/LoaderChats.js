import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    height={63}
    width="100%"
    speed={1}
    backgroundColor="#333"
    foregroundColor="#999"
    // viewBox="0 0 640 126"
    // style={{ width: "100%", height: "100%" }}
  >
    {/* Only SVG shapes */}
    <circle cx="36" cy="31" r="19" width="100%" height="63" />
    <rect
      x="67"
      y="13"
      rx="4"
      ry="4"
      width={`${Math.floor(Math.random() * 60) + 20}%`}
      height="13"
    />
    <rect
      x="67"
      y="38"
      rx="3"
      ry="3"
      width={`${Math.floor(Math.random() * 60) + 20}%`}
      height="10"
    />
  </ContentLoader>
);

function LoaderChats() {
  return (
    <>
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
    </>
  );
}

export default LoaderChats;
