import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { streamProvider } from "../../providers/stream-provider";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import {
  camerasSelector,
  micsSelector,
  selectedCameraSelector,
  selectedMicSelector,
} from "../../store/shared/shared-selector";
import { devicesProvider } from "../../providers/devices-provider";
import { db } from "../../providers/db-provider";
import recorderProvider from "../../providers/recorder-provider";
import { ChunkInfo } from "../../types/types";
import { STORE_NAME } from "../../constants";
import { Button, Container, Row, Col } from "react-bootstrap";
import {
  setSelectedCamera,
  setSelectedMic,
} from "../../store/shared/shared-slice";

type Props = {};

const Stream: FC<Props> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const dispatch = useDispatch();
  const selectedMic = useSelector(selectedMicSelector);
  const selectedCamera = useSelector(selectedCameraSelector);

  const cameras = useSelector(camerasSelector);
  const mics = useSelector(micsSelector);

  const [isRecording, setIsRecording] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    devicesProvider.getDevices();
    db.connect();
  }, []);

  useEffect(() => {
    if (selectedMic && selectedCamera) {
      startStream();
    }

    return streamProvider.stopStream;
  }, [selectedMic, selectedCamera]);

  useEffect(() => {
    if (videoRef.current) {
      startStream();
    }
    // return streamProvider.stopStream;
  }, [videoRef.current]);

  const startStream = async () => {
    setIsLoading(true);
    await streamProvider.startStream(selectedMic, selectedCamera);
    if (videoRef.current) {
      videoRef.current.srcObject = await streamProvider.getStream();
      videoRef.current.autoplay = true;
      videoRef.current.muted = true;

      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current!.addEventListener("canplaythrough", () => {
          videoRef
            .current!.play()
            .then(() => {
              setIsLoading(false);
            })
            .catch((error) => {
              console.error("Error playing video:", error);
              setIsLoading(false);
            });
        });
      });
    }
  };

  const toggleRecording = async () => {
    setIsRecording((prevIsRecording) => !prevIsRecording);
    try {
      if (isRecording) {
        recorderProvider.stop();
      } else {
        const stream = await streamProvider.getStream();
        recorderProvider.start(stream);
      }
    } catch (error) {
      console.error("Error toggling recording:", error);
    }
  };

  const onDownload = async () => {
    const chunks: ChunkInfo[] = (await db.getAll(STORE_NAME)) as ChunkInfo[];
    const blob = new Blob(
      chunks.map((chunk) => chunk.data),
      { type: "video/webm" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.webm";
    a.click();

    await db.clearStore(STORE_NAME);
  };

  const onMicChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedMic(event.target.value));
  };

  const onCameraChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedCamera(event.target.value));
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div style={{ width: "650px" }}>
        {isLoading && (
          <img
            src="https://i.gifer.com/ZKZg.gif"
            alt="loading"
            style={{ height: "450px" }}
          />
        )}
        <video ref={videoRef} className="mt-3"></video>
      </div>
      <div>
        <InputGroup className="mt-3">
          <InputGroup.Text>Camera</InputGroup.Text>
          <Form.Select onChange={onCameraChange}>
            {cameras.map(({ deviceId, label }) => (
              <option key={deviceId} value={deviceId}>
                {label}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
        <InputGroup className="mt-3 mb-3">
          <InputGroup.Text>Mic</InputGroup.Text>
          <Form.Select onChange={onMicChange}>
            {mics.map(({ deviceId, label }) => (
              <option key={deviceId} value={deviceId}>
                {label}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={toggleRecording}>
            {isRecording ? "Stop" : "Start"} recording
          </Button>
          <Button onClick={onDownload}>Download recording</Button>
        </div>
      </div>
    </div>
  );
};

export default Stream;
