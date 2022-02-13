import React from "react";

import useStore from "./Store";

const ColorSquare = ({color}: any) => {

    const zustandChange = useStore((state) => state.changeColor);

const changeColorHandler = () => {

zustandChange(color);
}




return (
  <div
    onClick={changeColorHandler}
    className="color-square"
    style={{ background: color }}
  ></div>
);

}

export default ColorSquare;