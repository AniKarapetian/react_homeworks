import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SharedState = {
  micInfo: {
    mics: (MediaDeviceInfo | InputDeviceInfo)[];
    selectedMic: MediaDeviceInfo | null;
  };
  cameraInfo: {
    cameras: (MediaDeviceInfo | InputDeviceInfo)[];
    selectedCamera: MediaDeviceInfo | null;
  };
  speakerInfo: {
    speakers: MediaDeviceInfo[];
    selectedSpeaker: MediaDeviceInfo | null;
  };
};

const initialState: SharedState = {
  micInfo: {
    mics: [],
    selectedMic: null,
  },
  cameraInfo: {
    cameras: [],
    selectedCamera: null,
  },
  speakerInfo: {
    speakers: [],
    selectedSpeaker: null,
  },
};

const sharedSlice = createSlice({
  name: "shared",
  initialState,

  reducers: {
    setMics(state, action: PayloadAction<MediaDeviceInfo[]>) {
      state.micInfo.mics = action.payload;
    },
    setSelectedMic(state, action: PayloadAction<string>) {
      state.micInfo.selectedMic =
        state.micInfo.mics.find((mic) => mic.deviceId === action.payload) ||
        null;
    },
    setCameras(state, action: PayloadAction<MediaDeviceInfo[]>) {
      state.cameraInfo.cameras = action.payload;
    },
    setSelectedCamera(state, action: PayloadAction<string>) {
      state.cameraInfo.selectedCamera =
        state.cameraInfo.cameras.find(
          (camera) => camera.deviceId === action.payload
        ) || null;
    },
    setSpeakers(state, action: PayloadAction<MediaDeviceInfo[]>) {
      state.speakerInfo.speakers = action.payload;
    },
    setSelectedSpeaker(state, action: PayloadAction<string>) {
      state.speakerInfo.selectedSpeaker =
        state.speakerInfo.speakers.find(
          (speaker) => speaker.deviceId === action.payload
        ) || null;
    },
  },
});

export const {
  setMics,
  setSelectedMic,
  setCameras,
  setSelectedCamera,
  setSpeakers,
  setSelectedSpeaker,
} = sharedSlice.actions;

export default sharedSlice.reducer;
