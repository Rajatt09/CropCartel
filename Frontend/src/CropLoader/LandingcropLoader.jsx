import React from "react";
import "./LandingcropLoader.css";

const LandingcropLoader = () => {
  return (
    <div
      className="crop-container"
      style={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        zIndex: "100",
        height: "100vh",
        // top: "0",
        backgroundColor: "white",
      }}
    >
      <div
        className="crop-container"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="crop-loading-wave">
          <div className="crop-loading-bar"></div>
          <div className="crop-loading-bar"></div>
          <div className="crop-loading-bar"></div>
          <div className="crop-loading-bar"></div>
        </div>
        <div
          style={{
            color: "rgb(70, 135, 70)",
            fontWeight: "600",
            fontSize: "1.3rem",
          }}
        >
          Crop Cartel
        </div>
      </div>
    </div>
  );
};

export default LandingcropLoader;
