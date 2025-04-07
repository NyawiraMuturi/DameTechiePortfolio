import { useState, useEffect } from "react";
import bubble from "./assets/icons/bubble.png";
import alt1 from "./assets/images/alt1.png";
import alt2 from "./assets/images/alt2.png";
import alt3 from "./assets/images/alt3.png";
import alt4 from "./assets/images/alt4.png";
import {
  Github,
  MicVocal,
  PencilLine,
  Linkedin,
  Mail,
  Twitch,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { articles, talks } from "./lib/data";
import { useRepositories } from "./hooks";

function App() {
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });
  const [currentImage, setCurrentImage] = useState(alt1);

  const {
    data: repositories,
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
    return <p>Loading...</p>;
  }

  if (reposError) {
    return <p>Error</p>;
  }

  return (
    <div className="relative lg:h-screen md:h-screen w-screen bg-[#efe5e0]">
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
      <div className="relative z-10 flex flex-col md:flex-row lg:flex-row p-[4%] space-x-10 w-full">
        <div className="w-2/5">
          <img src={bubble} className="w-5/6" />
          <div className="absolute md:top-[17%] md:left-[9.5%] lg:left-[9%] lg:top-[20%]">
            <header className="text-2xl md:text-xl lg:text-2xl font-black">
              Hi, I am Albina Muturi, <br /> but feel free to call me <br />{" "}
              Dame-Techie.
            </header>
          </div>
          <div className="absolute md:top-[26%] md:left-[6%] lg:left-[7%] lg:top-[30%]">
            <img src={currentImage} className="md:w-5/6 lg:w-full" alt="Profile Animation" />
          </div>
        </div>
        <div className="w-full px-[2%]">
          <div>
            <p className="lg:text-4xl md:text-3xl  text-center my-5 font-black">
              What does this Software engineer do? You wonder... <br /> Well,
              here is My Digital Footprint{" "}
            </p>
          </div>
          <div className="flex flex-col space-y-4 md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-2 lg:gap-4 ">
            <Card className="bg-[#70cdc5]">
              <div className="border-dashed border-2 border-[#346664] rounded-md h-full">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <p className="font-black">Github</p>
                    <Github />
                  </div>
                </CardHeader>
                <CardContent>
                  <ul>
                    {repositories?.map((repo: any) => (
                      <li
                        key={repo.id}
                        className="flex items-center space-x-4 lg:my-3 md:my-1 hover:border-[#346664] hover:border-r hover:border-l rounded-tr-lg rounded-bl-lg"
                      >
                        <div>
                          <Github strokeWidth={1} color="#346664" />
                        </div>

                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black font-medium hover:text-black"
                        >
                          <div>
                            <span className="lg:text-base md:text-[0.9rem]"> {repo.name}</span>
                            <p className="lg:text-base md:text-[0.8rem]">
                              {repo?.description?.length > 50
                                ? `${repo.description.slice(0, 50)}...`
                                : repo.description}
                            </p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="flex justify-end items-center border">
                  <a href="https://github.com/NyawiraMuturi" target="_blank">
                    <Button className="bg-[#346664] hover:bg-[#346664] lg:text-base md:text-xs border-none text-white hover:text-white focus:ring-inset-0 font-bold">
                      More of These
                    </Button>
                  </a>
                </div>
              </div>
            </Card>

            <Card className="bg-[#edbcc0]">
              <div className="border-dashed border-2 border-[#ec4469] rounded-md h-full">
                <CardHeader>
                  <div className="flex justify-between items-center font-black">
                    <p>Technical Talks</p>
                    <MicVocal />
                  </div>
                </CardHeader>
                <CardContent>
                  <ul>
                    {talks?.map((talk: any) => (
                      <li
                        key={talk.id}
                        className="flex items-center space-x-4 lg:my-3 md:my-1 hover:border-[#ec4469] hover:border-r hover:border-l rounded-tr-lg rounded-bl-lg"
                      >
                        <div>
                          <MicVocal strokeWidth={1} color="#ec4469" />
                        </div>
                        <a
                          href={talk.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block cursor-pointer no-underline text-black hover:text-black"
                        >
                          <div>
                            <span className="lg:text-base md:text-[0.9rem]">
                              {talk.title}
                            </span>
                            <p className="lg:text-base md:text-[0.8rem]">
                              {talk?.description?.length > 50
                                ? `${talk.description.slice(0, 50)}...`
                                : talk.description}
                            </p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="flex justify-end items-center">
                  <a
                    href="https://www.linkedin.com/in/nyawira-muturi/recent-activity/all/"
                    target="_blank"
                  >
                    <Button className="bg-[#ec4469] hover:bg-[#ec4469] border-none lg:text-base md:text-xs text-white hover:text-white focus:ring-inset-0 font-bold">
                      More of These
                    </Button>
                  </a>
                </div>
              </div>
            </Card>

            <Card className="bg-[#a6dd73]">
              <div className="border-dashed border-2 border-[#4c7438] rounded-md">
                <CardHeader>
                  <div className="flex justify-between font-black items-center">
                    <p>Sometimes I write</p>
                    <PencilLine />
                  </div>
                </CardHeader>
                <CardContent>
                  <ul>
                    {articles?.map((article: any) => (
                      <li
                        key={article.id}
                        className="flex items-center space-x-4 md:my-1 lg:my-3 hover:border-[#4c7438] hover:border-r hover:border-l rounded-tr-lg rounded-bl-lg"
                      >
                        <div>
                          <PencilLine strokeWidth={1} color="#4c7438" />
                        </div>
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block cursor-pointer no-underline text-black hover:text-black"
                        >
                          <div>
                            <span className="lg:text-base md:text-[0.9rem]"> {article.title}</span>
                            <p className="lg:text-base md:text-[0.8rem]">
                              {article?.description?.length > 50
                                ? `${article.description.slice(0, 50)}...`
                                : article.description}
                            </p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="flex justify-end">
                  <a href="https://dame-techie.hashnode.dev/" target="_blank">
                    <Button className="bg-[#4c7438] hover:bg-[#4c7438] border-none lg:text-base md:text-xs text-white hover:text-white focus:ring-inset-0 font-bold">
                      More of These
                    </Button>
                  </a>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-center space-x-6">
              <div 
              className="bg-[#edbcc0] rounded-full md:p-4 lg:p-5 cursor-pointer"
              onClick={() => window.open('https://github.com/NyawiraMuturi', '_blank')} 
              >
                <Github className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10" strokeWidth={1} />
              </div>

              <div 
              className="bg-[#70cdc5] rounded-full md:p-4 lg:p-5 cursor-pointer"
              onClick={() => window.open('https://www.linkedin.com/in/nyawira-muturi/', '_blank')} 
              >
                <Linkedin className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10" strokeWidth={1} />
              </div>

              <div 
              className="bg-[#a6dd73] rounded-full md:p-4 lg:p-5 cursor-pointer"
              onClick={() => window.location.href = 'mailto:albinamuturi@gmail.com'}
              >
                <Mail className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10" strokeWidth={1} />
              </div>

              <div 
              className="bg-[#fec268] rounded-full md:p-4 lg:p-5 cursor-pointer"
              onClick={() => window.open('https://dame-techie.hashnode.dev/', '_blank')} 
              >
                <PencilLine className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10" strokeWidth={1} />
              </div>
              <div 
              className="bg-[#8184d2] rounded-full md:p-4 lg:p-5 cursor-pointer"
              onClick={() => window.open('https://twitch.tv/dametechie', '_blank')} 
              >
                <Twitch className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
