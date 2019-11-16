import React from "react";
import PropTypes from "prop-types";
import "loaders.css";

const types = {
  "ball-pulse": 3,
  "ball-grid-pulse": 9,
  "ball-clip-rotate": 1,
  "ball-clip-rotate-pulse": 2,
  "square-spin": 1,
  "ball-clip-rotate-multiple": 2,
  "ball-pulse-rise": 5,
  "ball-rotate": 1,
  "cube-transition": 2,
  "ball-zig-zag": 2,
  "ball-zig-zag-deflect": 2,
  "ball-triangle-path": 3,
  "ball-scale": 1,
  "line-scale": 5,
  "line-scale-party": 4,
  "ball-scale-multiple": 3,
  "ball-pulse-sync": 3,
  "ball-beat": 3,
  "line-scale-pulse-out": 5,
  "line-scale-pulse-out-rapid": 5,
  "ball-scale-ripple": 1,
  "ball-scale-ripple-multiple": 3,
  "ball-spin-fade-loader": 8,
  "line-spin-fade-loader": 8,
  "triangle-skew-spin": 1,
  pacman: 5,
  "ball-grid-beat": 9,
  "semi-circle-spin": 1,
};
const getDivNumber = type => {
  return types[type] ? types[type] : 0;
};
const Loading = ({ type, color }) => {
  const length = [...Array(getDivNumber(type))];
  return (
    <div className={`loader-inner ${type}`}>
      {length.map((_, index) => (
        <div key={index} style={color ? { backgroundColor: color } : null} />
      ))}
    </div>
  );
};

Loading.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
};

Loading.defaultProps = {
  type: "ball-pulse",
  color: null,
};

export default Loading;
