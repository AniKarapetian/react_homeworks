import React, { FC, useEffect, useRef, useState } from "react";
import { streamProvider } from "../../providers/stream-provider";
import { useSelector } from "react-redux";
import {
  selectedCameraSelector,
  selectedMicSelector,
} from "../../store/shared/shared-selector";
import { devicesProvider } from "../../providers/devices-provider";
import { db } from "../../providers/db-provider";
import recorderProvider from "../../providers/recorder-provider";
import { ChunkInfo } from "../../types/types";

type Props = {};

const Stream: FC<Props> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const selectedMic = useSelector(selectedMicSelector);
  const selectedCamera = useSelector(selectedCameraSelector);

  const [isRecording, setIsRecording] = useState(false);
  useEffect(() => {
    devicesProvider.getDevices();
    db.connect();
  }, []);

  useEffect(() => {
    if (selectedMic && selectedCamera) {
      startStream();
    }

    // return streamProvider.stopStream;
  }, [selectedMic, selectedCamera]);

  useEffect(() => {
    if (videoRef.current) {
      startStream();
    }
    // return streamProvider.stopStream;
  }, [videoRef.current]);

  const startStream = async () => {
    await streamProvider.startStream(selectedMic, selectedCamera);

    if (videoRef.current) {
      videoRef.current.srcObject = await streamProvider.getStream();
      videoRef.current.autoplay = true;
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  };

  const toggleRecording = async () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      recorderProvider.stop();
    } else {
      const stream = await streamProvider.getStream();
      recorderProvider.start(stream);
    }
  };

  const onDownload = async () => {
    const chunks: ChunkInfo[] = (await db.getAll()) as ChunkInfo[];
    const blob = new Blob(
      chunks.map((chunk) => chunk.data),
      { type: "video/webm" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.webm";
    a.click();
  };

  return (
    <div>
      <video ref={videoRef}></video>

      <button onClick={toggleRecording}>
        {isRecording ? "Stop" : "Start"} recording
      </button>
      <button onClick={onDownload}>Download recording</button>
    </div>
  );
};

export default Stream;
