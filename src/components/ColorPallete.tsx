import React from "react";
import ColorSquare from "./ColorSquare";
import LineSetting from "./LineSetting";

const ColorPallete = () => {
  return (
    <div className="color-palette">
      <LineSetting />
      <ColorSquare color="white"  />
      <ColorSquare color="#AE1F1B"  />
      <ColorSquare color="#002D5A"  />
      <ColorSquare color="#acacac"  />
      <ColorSquare color="black"  />
    </div>
  );
};

export default ColorPallete;