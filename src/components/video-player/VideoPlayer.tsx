import React, { FC, useRef } from "react";

import { VideoComponent } from "./VideoComponent";
import { VideoController } from "./VideoController";

export const VideoPlayer: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div>
      <VideoComponent videoRef={videoRef} />
      <VideoController videoRef={videoRef} />
    </div>
  );
};
