import { useState, useEffect } from "react";
import bubble from './assets/icons/bubble.png'
import profile from './assets/images/placeholderimg.png'
import { Github, MicVocal } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./components/ui/card";

function App() {
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });

  useEffect(() => {
    const updateGridSize = () => {
      const cellSize = 40;
      const cols = Math.floor(window.innerWidth / cellSize);
      const rows = Math.floor(window.innerHeight / cellSize);
      setGridSize({ rows, cols });
    };

    updateGridSize();

    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-[#efe5e0]">
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
            className="border border-[#b4aea8]"
            style={{ width: "40px", height: "40px" }}
          ></div>
        ))}
      </div>
      <div className="relative z-10 flex flex-row p-[4%] space-x-10 w-full">
        <div className="w-2/5">
          <img src={bubble} className="w-5/6" />
          <div className="absolute left-[9.5%] top-[20%] ">
            <header className="text-2xl">Hi, I am Albina Muturi, <br /> but feel free to call me <br /> Dame-Techie.</header>
          </div>
          <div className="absolute left-[8%] top-[40%]">
            <img src={profile} className="w-4/5" />
          </div>
        </div>
        <div className="w-full px-[2%]">
          <div>
            <p className="text-4xl text-center my-5 font-black">What does this Software engineer do? You wonder... <br /> Well, here is My Digital Footprint </p>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <Card className="bg-[#70cdc5]">
              <div className="border-dashed border-2 border-[#f57f04] rounded-md">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <p className="">Github</p>
                    <Github />
                  </div>

                </CardHeader>
                <CardContent>
                  <p>card name</p>
                  <p>card name</p>
                  <p>card name</p>
                  <p>card name</p>
                  <p>card name</p>

                </CardContent>
                <CardFooter className="flex justify-end">
                  <p>More of those</p>
                </CardFooter>
              </div>

            </Card>

            <Card className="bg-[#edbcc0]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <p>Technical Talks</p>
                  <MicVocal />
                </div>
              </CardHeader>
              <CardContent>
                <p>card name</p>
                <p>card name</p>
                <p>card name</p>
                <p>card name</p>
                <p>card name</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <p>More of those</p>
              </CardFooter>
            </Card>

            <Card className="bg-[#a6dd73]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <p>Sometimes I write</p>
                  <img src={bubble} alt="Icon" style={{ width: '32px', height: '32px' }} />
                </div>
              </CardHeader>
              <CardContent>
                <p>card name</p>
                <p>card name</p>
                <p>card name</p>
                <p>card name</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <p>More of those</p>
              </CardFooter>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
