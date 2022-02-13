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
  const drawingColor = useStore((state) => state.color);
  const lineWidth = useStore((state) => state.lineWidth );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

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
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
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
