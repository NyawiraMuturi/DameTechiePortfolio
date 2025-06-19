import { useState, useRef } from 'react';
import { Play, CirclePlay } from 'lucide-react';

interface VideoCardProps {
  videoSrc?: string;
  thumbnailSrc: string;
  title?: string;
  externalUrl?: string;
  embedUrl?: string;
  type?: 'video' | 'embed' | 'external';
}

const VideoCard = ({ 
  videoSrc, 
  thumbnailSrc,
  title = "Video", 
  externalUrl,
  embedUrl,
  type = "video"
}: VideoCardProps) => {
  const [showEmbed, setShowEmbed] = useState(false);

  if (type === "embed") {
    return (
      <div className="relative w-full h-full bg-[#8184d2] rounded-lg overflow-hidden">
        <div className="border-dashed border-2 border-[#f58003] rounded-md h-full relative">
          {!showEmbed ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={thumbnailSrc}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <button
                  onClick={() => setShowEmbed(true)}
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-300 transform hover:scale-110"
                >
                  <Play className="w-8 h-8 text-[#8184d2] ml-1" fill="currentColor" />
                </button>
              </div>
            </div>
          ) : (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <p className="font-black text-white">{title}</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "external") {
    return (
      <div 
        className="relative w-full h-full bg-[#8184d2] rounded-lg overflow-hidden cursor-pointer"
        onClick={() => externalUrl && window.open(externalUrl, '_blank')}
      >
        <div className="border-dashed border-2 border-[#f58003] rounded-md h-full relative">
          <img
            src={thumbnailSrc}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-300 transform hover:scale-110">
              <CirclePlay className="w-8 h-8 text-[#000000]" />
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <p className="font-black text-white">{title}</p>
          </div>
        </div>
      </div>
    );
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        setShowThumbnail(false);
      }
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowThumbnail(true);
  };

  return (
    <div className="relative w-full h-full bg-[#8184d2] rounded-lg overflow-hidden">
      <div className="border-dashed border-2 border-[#f58003] rounded-md h-full relative">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onEnded={handleVideoEnd}
          style={{ display: showThumbnail ? 'none' : 'block' }}
        >
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>

        {showThumbnail && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={thumbnailSrc}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <button
                onClick={handlePlayPause}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-300 transform hover:scale-110"
              >
                <Play className="w-8 h-8 text-[#8184d2] ml-1" fill="currentColor" />
              </button>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <p className="font-black text-white">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;