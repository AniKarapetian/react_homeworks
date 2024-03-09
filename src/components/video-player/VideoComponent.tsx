import React, { FC } from "react";
interface VideoProps {
  videoRef: any;
}
export const VideoComponent: FC<VideoProps> = ({ videoRef }) => {
  return (
    <video
      width={400}
      height={400}
      ref={videoRef}
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    ></video>
  );
};
