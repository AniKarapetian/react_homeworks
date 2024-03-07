import React, { FC, useEffect, useRef } from "react";
export const VideoComponent: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("canplay", onCanPlay);
      videoRef.current.addEventListener("waiting", onWaiting);
    }

    return () => {
      videoRef.current?.removeEventListener("canplay", onCanPlay);
      videoRef.current?.removeEventListener("waiting", onWaiting);
    };
  }, [videoRef.current]);

  const onCanPlay = () => {
    console.log("canplay");
  };

  const onWaiting = () => {
    console.log("waiting");
  };
  return (
    <div>
      <video
        width={400}
        autoPlay
        height={400}
        ref={videoRef}
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      ></video>
    </div>
  );
};

// loadedmetadata
// canplay
// waiting
// videoRef.current.addEventListener('canplay', () => {})
