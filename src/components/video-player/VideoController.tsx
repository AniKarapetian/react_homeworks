import { FC, useEffect, useState } from "react";
import classes from "./style.module.css";
import { formatTime } from "./helper";
import React from "react";
import { ControllerIcons } from "./ControllerIcons";

export const VideoController: FC<{ videoRef: any }> = ({ videoRef }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("canplay", onCanPlay);
      videoRef.current.addEventListener("waiting", onWaiting);
      videoRef.current.addEventListener("timeupdate", updatePointer);
      videoRef.current.addEventListener("loadedmetadata", getVideoInfo);
    }

    return () => {
      videoRef.current?.removeEventListener("canplay", onCanPlay);
      videoRef.current?.removeEventListener("waiting", onWaiting);
      videoRef.current.removeEventListener("loadedmetadata", getVideoInfo);
      videoRef.current?.removeEventListener("timeupdate", updatePointer);
    };
  }, [videoRef.current]);

  useEffect(() => {
    videoRef.current && (videoRef.current.currentTime = rangeValue);
  }, [rangeValue]);

  const getVideoInfo = () => {
    videoRef.current && setDuration(videoRef.current.duration);
  };
  const onCanPlay = () => {
    setIsLoading(false);
  };

  const onWaiting = () => {
    // setIsLoading(true);
  };

  const playVideo = () => {
    setIsPaused(!isPaused);
    videoRef.current?.play();
  };

  const pauseVideo = () => {
    setIsPaused(!isPaused);
    videoRef.current?.pause();
  };

  const stopVideo = () => {
    setIsPaused(false);
    videoRef.current?.pause();
    setRangeValue(0);
    videoRef.current && (videoRef.current.currentTime = 0);
  };

  const onRangeChange = (event: any) => {
    setRangeValue(event.target.value);
  };

  const updatePointer = () => {
    setRangeValue(videoRef.current!.currentTime);
  };
  return (
    <div>
      <span>
        {videoRef.current
          ? formatTime(videoRef.current?.currentTime)
          : "00:00:00"}
      </span>
      /<span>{formatTime(duration)}</span>
      <input
        type="range"
        className={classes.rangeInput}
        value={rangeValue}
        min="0"
        max={duration}
        step="0"
        onChange={onRangeChange}
      ></input>
      <ControllerIcons
        isLoading={isLoading}
        isPaused={isPaused}
        actions={{ pauseVideo, stopVideo, playVideo }}
      />
    </div>
  );
};
