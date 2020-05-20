import React from "react";
import "./index.css";

const SidePanel = (props) => {
  return (
    <div className="SidePanel">
      <h1>
        <span className="SidePanel__title">DAD JOKES</span>
      </h1>
      <div className="SidePanel__emoji-container">
        <span
          aria-label="SidePanel__emoji"
          role="img"
          className="SidePanel__emoji"
          onClick={props.sortJokes}
        >
          😂
        </span>
      </div>
      <button className="SidePanel__addJokes-btn" onClick={props.addJokes}>
        ADD JOKES
      </button>
    </div>
  );
};

export default SidePanel;
