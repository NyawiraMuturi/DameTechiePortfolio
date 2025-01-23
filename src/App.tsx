import { useState, useEffect } from "react";
import bubble from './assets/icons/bubble.png'
import alt1 from './assets/images/alt1.png'
import alt2 from './assets/images/alt2.png'
import alt3 from './assets/images/alt3.png'
import alt4 from './assets/images/alt4.png'
import { Github, MicVocal, PencilLine, Linkedin, Mail, Twitch } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./components/ui/card";
import { articles, talks } from "./lib/data";
import { useRepositories } from "./hooks";



function App() {
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });
  const [currentImage, setCurrentImage] = useState(alt1);

  const { data: repositories, isLoading: reposLoading, error: reposError } = useRepositories('NyawiraMuturi');
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
          <div className="absolute lg:left-[9%] lg:top-[18%]">
            <header className="text-2xl">Hi, I am Albina Muturi, <br /> but feel free to call me <br /> Dame-Techie.</header>
          </div>
          <div className="absolute lg:left-[7%] lg:top-[30%]">
            <img src={currentImage} className="" alt="Profile Animation" />
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
                  <ul>
                    {repositories?.map((repo: any) => (
                      <li key={repo.id}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          {repo.name}
                        </a>
                        <p>
                          {repo?.description?.length > 50
                            ? `${repo.description.slice(0, 50)}...`
                            : repo.description}
                        </p>
                      </li>
                    ))}
                  </ul>

                </CardContent>
                <CardFooter className="flex justify-end">
                  <p>More of those</p>
                </CardFooter>
              </div>

            </Card>

            <Card className="bg-[#edbcc0]">
              <div className="border-dashed border-2 border-[#f57f04] rounded-md">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <p>Technical Talks</p>
                    <MicVocal />
                  </div>
                </CardHeader>
                <CardContent>
                  <ul>
                    {talks?.map((talk: any) => (
                      <li key={talk.id}>
                        <a href={talk.link} target="_blank" rel="noopener noreferrer">
                          {talk.title}
                        </a>
                        <p>
                          {talk?.description?.length > 50
                            ? `${talk.description.slice(0, 50)}...`
                            : talk.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <p>More of those</p>
                </CardFooter>
              </div>
            </Card>

            <Card className="bg-[#a6dd73]">
              <div className="border-dashed border-2 border-[#f57f04] rounded-md">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <p>Sometimes I write</p>
                    <PencilLine />
                  </div>
                </CardHeader>
                <CardContent>
                  <ul>
                    {articles?.map((article: any) => (
                      <li key={article.id}>
                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                          {article.title}
                        </a>
                        <p>
                          {article?.description?.length > 50
                            ? `${article.description.slice(0, 50)}...`
                            : article.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <p>More of those</p>
                </CardFooter>
              </div>
            </Card>

            <div className="flex items-center justify-center space-x-6">
              <div className="bg-[#edbcc0] rounded-full p-5">
                <Github size={42} strokeWidth={1} />
              </div>

              <div className="bg-[#70cdc5] rounded-full p-5">
                <Linkedin size={42} strokeWidth={1} />
              </div>

              <div className="bg-[#a6dd73] rounded-full p-5">
                <Mail size={42} strokeWidth={1} />
              </div>

              <div className="bg-[#fec268] rounded-full p-5">
                <PencilLine size={42} strokeWidth={1} />
              </div>
              <div className="bg-[#8184d2] rounded-full p-5">
                <Twitch size={42} strokeWidth={1} />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
