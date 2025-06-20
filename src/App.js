import React, { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import pic1 from "./compo/pic1.jpg";
import pic2 from "./compo/pic2.jpg";
import pic3 from "./compo/pic3.jpg";
import pic4 from "./compo/pic4.jpg";
import pic5 from "./compo/pic5.jpg";
import audio1 from "./compo/audio1.waptt";
import audio2 from "./compo/audio2.waptt";
import audio3 from "./compo/audio3.waptt";
import audio4 from "./compo/audio4.waptt";
import audio5 from "./compo/audio5.waptt";
import music from "./compo/music.dat";
const MagicalGiftBox = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [viewedPhotos, setViewedPhotos] = useState(new Set());
  const [sparkleAnimation, setSparkleAnimation] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const memories = [
    {
      id: 1,
      photo: pic1,
      voiceMessage: audio1,
    },
    {
      id: 2,
      photo: pic2,
      voiceMessage: audio2,
    },
    {
      id: 3,
      photo: pic3,
      voiceMessage: audio3,
    },
    {
      id: 4,
      photo: pic4,
      voiceMessage: audio4,
    },
    {
      id: 5,
      photo: pic5,
      voiceMessage: audio5,
    },
  ];

  const handleGiftBoxClick = () => {
    setSparkleAnimation(true);
    setTimeout(() => {
      setIsOpened(true);
    }, 800);
  };

  const handleBubbleClick = (memory) => {
    setSelectedPhoto(memory);
    setIsPlayingAudio(true);

    const audio = new Audio(memory.voiceMessage);
    setCurrentAudio(audio);

    audio.play().catch((e) => console.log("Audio play failed:", e));

    audio.onended = () => {
      setIsPlayingAudio(false);
      setSelectedPhoto(null);
      setViewedPhotos((prev) => new Set([...prev, memory.id]));

      if (viewedPhotos.size >= memories.length - 1) {
        setTimeout(() => {
          setShowFinalMessage(true);
        }, 1000);
      }
    };
  };

  const closeModal = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setSelectedPhoto(null);
    setIsPlayingAudio(false);
    setViewedPhotos((prev) => new Set([...prev, selectedPhoto.id]));

    if (viewedPhotos.size >= memories.length - 1) {
      setTimeout(() => {
        setShowFinalMessage(true);
      }, 1000);
    }
  };

  const floatingBubbles = memories.map((memory, index) => ({
    ...memory,
    x: 15 + (index % 3) * 25 + Math.random() * 15,
    y: 25 + Math.floor(index / 3) * 30 + Math.random() * 10,
    delay: index * 0.3,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-blue-950 to-indigo-950 overflow-hidden relative">
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {isOpened && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={`butterfly-${i}`}
              className="absolute text-2xl sm:text-3xl md:text-4xl animate-bounce"
              style={{
                left: `${Math.random() * 85}%`,
                top: `${Math.random() * 85}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              🦋
            </div>
          ))}
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-yellow-300 rounded-full opacity-60 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {!isOpened && (
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 animate-pulse px-4">
              ✨ For the Most Amazing Mom ✨
            </h1>

            <div
              onClick={handleGiftBoxClick}
              className={`relative cursor-pointer transform transition-all duration-500 hover:scale-110 ${
                sparkleAnimation ? "animate-bounce" : ""
              } mx-auto`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-3xl blur-xl opacity-75 animate-pulse"></div>

                <div className="relative bg-gradient-to-br from-red-500 to-pink-600 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-3xl shadow-2xl">
                  <div className="absolute top-1/2 left-0 right-0 h-4 sm:h-6 md:h-8 bg-gradient-to-r from-yellow-400 to-amber-500 transform -translate-y-1/2 shadow-lg"></div>

                  <div className="absolute top-0 bottom-0 left-1/2 w-4 sm:w-6 md:w-8 bg-gradient-to-b from-yellow-400 to-amber-500 transform -translate-x-1/2 shadow-lg"></div>

                  <div className="absolute -top-3 sm:-top-4 md:-top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 sm:w-12 md:w-16 h-6 sm:h-8 md:h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-lg"></div>
                    <div className="absolute top-1 sm:top-2 left-1/2 transform -translate-x-1/2 w-2 sm:w-3 md:w-4 h-4 sm:h-6 md:h-8 bg-gradient-to-b from-yellow-300 to-amber-400 rounded-full"></div>
                  </div>

                  {sparkleAnimation && (
                    <>
                      {[...Array(12)].map((_, i) => (
                        <Sparkles
                          key={i}
                          className="absolute text-yellow-300 animate-ping"
                          size={16}
                          style={{
                            left: `${-20 + Math.random() * 140}%`,
                            top: `${-20 + Math.random() * 140}%`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl text-white mt-6 sm:mt-8 animate-bounce px-4">
              Click the gift to open your surprise! 🎁
            </p>
          </div>
        </div>
      )}

      {isOpened && !showFinalMessage && (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative">
          <h2 className="absolute top-4 sm:top-6 md:top-8 left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center px-4">
            Tap each magical bubble! ✨
            <br />
            <span className="text-sm sm:text-base md:text-lg text-purple-200">
              ({viewedPhotos.size}/{memories.length} memories viewed)
            </span>
          </h2>

          {floatingBubbles.map((memory) => (
            <div
              key={memory.id}
              onClick={() => handleBubbleClick(memory)}
              className="absolute cursor-pointer transform transition-all duration-300 hover:scale-110 animate-pulse"
              style={{
                left: `${memory.x}%`,
                top: `${memory.y}%`,
                animationDelay: `${memory.delay}s`,
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-lg opacity-60"></div>

                <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 border-4 border-white shadow-xl flex items-center justify-center">
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    💝
                  </span>
                </div>

                {viewedPhotos.has(memory.id) && (
                  <Heart
                    className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-red-500 animate-bounce"
                    size={16}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showFinalMessage && (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
          <audio autoPlay loop>
            <source src={music} type="audio/wav" />
          </audio>
          <div className="text-center animate-fade-in">
            <div className="mb-6 sm:mb-8 flex flex-wrap justify-center">
              {[...Array(15)].map((_, i) => (
                <Heart
                  key={i}
                  className="text-red-500 animate-bounce mx-1 sm:mx-2"
                  size={24}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 animate-pulse px-4">
              Happy Birthday, Mom ❤️
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-white mb-6 sm:mb-8 animate-bounce px-4">
              You're my everything.
            </p>

            <div className="text-lg sm:text-xl text-white opacity-80 px-4">
              Thank you for being the most wonderful mom in the world! 🌟
            </div>
          </div>
        </div>
      )}

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg w-full text-center "
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.photo}
              alt="Memory"
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl object-cover mx-auto border-4 border-purple-400 shadow-xl"
            />

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full hover:bg-red-600 transition-colors text-sm sm:text-base"
            ></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MagicalGiftBox;
