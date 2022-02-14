import React, { useState, useRef, useEffect, useCallback } from "react";

import useStore from "./Store";
// interface CanvasProps {
//     width: number;
//     height: number;
// }

// type Coordinate = {
//     x: number;
//     y: number;
// }

const Canvas = () => {
  //Store variables import
  const drawingColor = useStore((state) => state.color);
  const lineWidth = useStore((state) => state.lineWidth );
  const squareDrawingMode = useStore((state) => state.squareDrawingMode);

  //This components variables
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<Boolean>(false);
  const [startingPoint, setStartingPoint] = useState({x: 0, y:0})

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = drawingColor;
    context.lineWidth = lineWidth;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    console.log(drawingColor);
    if (!contextRef.current) {
      return;
    }
    contextRef.current.strokeStyle = drawingColor;
    contextRef.current.lineWidth = lineWidth;
  }, [drawingColor, lineWidth]);

  const startDrawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;

    //If we are drawing a path
    if (!squareDrawingMode) {

      contextRef.current?.beginPath();
      contextRef.current?.moveTo(offsetX, offsetY);
      setIsDrawing(true);

      //If we are drawing a square
    } else {

     if (!contextRef.current) {
    return;
      }
       contextRef.current.fillStyle = drawingColor;

      setStartingPoint((prevState) => ({...prevState, x: offsetX, y: offsetY}))
      console.log(startingPoint);

    }
  };

 

  const finishDrawing = ({nativeEvent}: any) => {
    if (!squareDrawingMode) {
      contextRef.current?.closePath();
      setIsDrawing(false);
    } else {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current?.fillRect(offsetX, offsetY, startingPoint.x - offsetX, startingPoint.y - offsetY);
    }
  };

  const draw = ({ nativeEvent }: any) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
    ></canvas>
  );
};

export default Canvas;
