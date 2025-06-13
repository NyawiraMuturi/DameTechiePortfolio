import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import alt1 from "./assets/images/alt1.png";
import alt2 from "./assets/images/alt2.png";
import alt3 from "./assets/images/alt3.png";
import alt4 from "./assets/images/alt4.png";
import alt5 from "./assets/images/loading.png";
import alt6 from "./assets/images/thumbnail.png";
import {
  Github,
  MicVocal,
  PencilLine,
  Linkedin,
  Mail,
  Twitch,
} from "lucide-react";
import VideoCard from "./components/ui/videoCard";
import { Card, CardHeader } from "./components/ui/card";
import { useRepositories } from "./hooks";

function App() {
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });
  const [currentImage, setCurrentImage] = useState(alt1);

  const {
    // data: repositories,
    isLoading: reposLoading,
    error: reposError,
  } = useRepositories("NyawiraMuturi");
  // const { data: blogs, isLoading: blogsLoading, error: blogsError } = useHashnodeBlogs('DameTechie');

  useEffect(() => {
    const images = [alt1, alt2, alt3, alt4];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setCurrentImage(images[index]);
    }, 350);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setCurrentImage(alt1);
    }, 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

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

  if (reposLoading) {
    return (
      <div className="bg-[#efe5e0] h-screen flex flex-row items-center justify-center">
        <img src={alt5} />
        <p className="lg:text-4xl md:text-3xl">Loading...</p>
      </div>
    );
  }

  if (reposError) {
    return <p>Error</p>;
  }

  return (
    <>
      <div className="relative flex flex-col items-center justify-center lg:min-h-screen md:min-h-screen w-screen bg-[#efe5e0]">
        <div>
          <p className="lg:text-4xl md:text-3xl text-center relative z-10 font-black">
            Hi, I'm Albina &#128075; <br />
            Nice to virtual meet you!
          </p>
        </div>
        <div
          className="absolute inset-0 grid pointer-events-none z-0"
          style={{
            gridTemplateColumns: `repeat(${gridSize.cols}, 40px)`,
            gridTemplateRows: `repeat(${gridSize.rows}, 40px)`,
          }}
          aria-hidden="true"
        >
          {Array.from({ length: gridSize.rows * gridSize.cols }).map(
            (_, index) => (
              <div
                key={index}
                className="border border-[#b4aea8]"
                style={{ width: "40px", height: "40px" }}
              ></div>
            )
          )}
        </div>

        <div className="relative z-10 flex flex-col items-center md:justify-center md:flex-row lg:flex-row p-[2%] md:space-x-10 w-full">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div
              className="bg-[#edbcc0] rounded-full md:p-4 lg:p-5 cursor-pointer"
              onClick={() =>
                window.open("https://github.com/NyawiraMuturi", "_blank")
              }
            >
              <Github
                className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10"
                strokeWidth={1}
              />
            </div>

            <div
              className="bg-[#70cdc5] rounded-full md:p-4 lg:p-5 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/nyawira-muturi/",
                  "_blank"
                )
              }
            >
              <Linkedin
                className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10"
                strokeWidth={1}
              />
            </div>

            <div
              className="bg-[#a6dd73] rounded-full md:p-4 lg:p-5 cursor-pointer"
              onClick={() =>
                (window.location.href = "mailto:albinamuturi@gmail.com")
              }
            >
              <Mail
                className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10"
                strokeWidth={1}
              />
            </div>

            <div
              className="bg-[#fec268] rounded-full md:p-4 lg:p-5 cursor-pointer"
              onClick={() =>
                window.open("https://dame-techie.hashnode.dev/", "_blank")
              }
            >
              <PencilLine
                className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10"
                strokeWidth={1}
              />
            </div>
            <div
              className="bg-[#8184d2] rounded-full md:p-4 lg:p-5 cursor-pointer"
              onClick={() =>
                window.open("https://twitch.tv/dametechie", "_blank")
              }
            >
              <Twitch
                className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10"
                strokeWidth={1}
              />
            </div>
          </div>
          <div className="w-2/3 ">
            <div className="bg-white/2 backdrop-blur-[4.0px] shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] rounded-[10px] flex justify-center items-center">
              <img
                src={currentImage}
                className="md:w-5/6 lg:w-5/6"
                alt="Profile Animation"
              />
            </div>
          </div>
          <div className="w-full px-[2%]">
            <div className="flex flex-col space-y-4 md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-2 lg:gap-4 ">
              <Card className="w-full h-[40vh] col-span-3">
                <VideoCard
                  type="external"
                  externalUrl="https://www.tiktok.com/@its_hanti/video/7471143024106507526"
                  thumbnailSrc={alt6}
                  title="Now we are not strangers..."
                />
              </Card>

              <Card className="bg-[#70cdc5]">
                <a href="https://github.com/NyawiraMuturi" target="_blank">
                  <div className="border-dashed border-2 border-[#346664] rounded-md h-full">
                    <CardHeader>
                      <div className="flex justify-between text-black items-center">
                        <p className="font-black">My Projects</p>
                        <Github />
                      </div>
                    </CardHeader>
                  </div>
                </a>
              </Card>

              <Card className="bg-[#edbcc0]">
                <a
                  href="https://www.linkedin.com/in/nyawira-muturi/recent-activity/all/"
                  target="_blank"
                >
                  <div className="border-dashed border-2 border-[#ec4469] rounded-md h-full">
                    <CardHeader>
                      <div className="flex justify-between text-black items-center font-black">
                        <p>Technical Talks</p>
                        <MicVocal />
                      </div>
                    </CardHeader>
                  </div>
                </a>
              </Card>

              <Card className="bg-[#a6dd73]">
                <a href="https://dame-techie.hashnode.dev/" target="_blank">
                  <div className="border-dashed border-2 border-[#4c7438] rounded-md h-full">
                    <CardHeader>
                      <div className="flex justify-between font-black text-black items-center">
                        <p>Technical Articles</p>
                        <PencilLine />
                      </div>
                    </CardHeader>
                  </div>
                </a>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Analytics />
    </>
  );
}

export default App;
