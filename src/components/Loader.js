import React from "react";
import "../styles/Loader.css";
function Loader() {
  return (
    <div className="loader">
      <div className="loader__line loader__line_green"></div>
      <div className="loader__line loader__line_magenta"></div>
      <div className="loader__line loader__line_yellow"></div>
      <div className="loader__line loader__line_blue"></div>
    </div>
  );
}

export default Loader;
