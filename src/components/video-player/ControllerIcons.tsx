import React, { FC } from "react";
import classes from "./style.module.css";
interface IProps {
  isPaused: boolean;
  isLoading: boolean;
  actions: {
    playVideo: VoidFunction;
    pauseVideo: VoidFunction;
    stopVideo: VoidFunction;
  };
}
export const ControllerIcons: FC<IProps> = ({
  isLoading,
  isPaused,
  actions,
}) => {
  return (
    <span>
      {!isPaused ? (
        <img
          onClick={actions.playVideo}
          src="https://pixsector.com/cache/0d0aeff3/av172da3bd1ea59cc54d8.png"
          alt=""
          className={classes.playImg}
        />
      ) : (
        <img
          src="https://www.freeiconspng.com/uploads/circle-pause-icon-14.png"
          alt=""
          onClick={actions.pauseVideo}
          className={classes.pauseImg}
        />
      )}
      <img
        onClick={actions.stopVideo}
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
    </span>
  );
};
