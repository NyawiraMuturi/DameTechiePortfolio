import { useState, useEffect } from "react";
import bubble from './assets/icons/bubble.png'

function App() {
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });

  useEffect(() => {
    const updateGridSize = () => {
      const cellSize = 40.5;
      const cols = Math.ceil(window.innerWidth / cellSize);
      const rows = Math.ceil(window.innerHeight / cellSize);
      setGridSize({ rows, cols });
    };

    updateGridSize();


    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-[#f5f5f5]">
      <div
        className="absolute inset-0 grid pointer-events-none z-0"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, 40px)`,
          gridTemplateRows: `repeat(${gridSize.rows}, 40px)`,
        }}
        aria-hidden="true"
      >
        {Array.from({ length: gridSize.rows * gridSize.cols }).map((_, index) => (
          <div
            key={index}
            className="border border-gray-300"
            style={{ width: "40px", height: "40px" }}
          ></div>
        ))}
      </div>


      <div className="relative z-10 flex p-6">
        <div className="w-1/6">
          <img src={bubble} />
        </div>
      </div>
    </div>
  );
}

export default App;
