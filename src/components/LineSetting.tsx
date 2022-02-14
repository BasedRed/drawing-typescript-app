import React from "react";
import useStore from "./Store";

const LineSetting = () => {
  const lineWidth = useStore((state) => state.lineWidth);
  const setLineWidth = useStore((state) => state.setLineWidth);
  const setSquareDrawingMode = useStore((state) => state.setSqaureDrawingMode);
  const squareDrawingMode = useStore((state) => state.squareDrawingMode);

  const lineThicknessHandler = (e: any) => {
    console.log(e.target.value);
    setLineWidth(e.target.value);
    
  };

  const squareModeHandler = () => {
    setSquareDrawingMode();
    console.log(squareDrawingMode);
  }



  return (
    <div className="line-settings">
      <button onClick={squareModeHandler}>Draw a Square</button>
      <input
        onChange={lineThicknessHandler}
        type="range"
        min="1"
        max="10"
        name=""
        id=""
        value={lineWidth}
      />
    </div>
  );
};

export default LineSetting;
