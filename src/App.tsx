import React from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import ColorPallete from "./components/ColorPallete";

function App() {
  return (
    <div className="App">
      <ColorPallete />
      <Canvas />
    </div>
  );
}

export default App;
