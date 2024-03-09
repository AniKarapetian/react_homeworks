import { FC, useEffect, useState } from "react";
import classes from "./style.module.css";
import { formatTime } from "./helper";
import React from "react";
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
    <div className="controls">
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
        step="1"
        onChange={onRangeChange}
      ></input>
      {!isPaused ? (
        <img
          onClick={playVideo}
          src="https://pixsector.com/cache/0d0aeff3/av172da3bd1ea59cc54d8.png"
          alt=""
          className={classes.playImg}
        />
      ) : (
        <img
          src="https://www.freeiconspng.com/uploads/circle-pause-icon-14.png"
          alt=""
          onClick={pauseVideo}
          className={classes.pauseImg}
        />
      )}
      <img
        onClick={stopVideo}
        src="https://thumb.silhouette-ac.com/t/6e/6e94aaaaa650e631109fee66a94385fb_t.jpeg"
        alt=""
        className={classes.playImg}
      />
      {isLoading && (
        <img
          src="https://i.gifer.com/ZKZg.gif"
          alt="loading"
          className={classes.loadingImg}
        />
      )}
    </div>
  );
};
