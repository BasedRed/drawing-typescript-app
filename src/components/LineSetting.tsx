import React from "react";
import useStore from "./Store";

const LineSetting = () => {
  const lineWidth = useStore((state) => state.lineWidth);
  const setLineWidth = useStore((state) => state.setLineWidth);

  const lineThicknessHandler = (e: any) => {
    console.log(e.target.value);
    setLineWidth(e.target.value);
  };

  return (
    <input
      onChange={lineThicknessHandler}
      type="range"
      min="1"
      max="10"
      name=""
      id=""
      value={lineWidth}
    />
  );
};

export default LineSetting;
