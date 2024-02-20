import {
  setCameras,
  setMics,
  setSelectedCamera,
  setSelectedMic,
  setSelectedSpeaker,
  setSpeakers,
} from "../store/shared/shared-slice";
import store from "../store/store";

export const setDevices = (devices: (MediaDeviceInfo | InputDeviceInfo)[]) => {
  const cameras: (MediaDeviceInfo | InputDeviceInfo)[] = [];

  const mics: (MediaDeviceInfo | InputDeviceInfo)[] = [];

  const speakers: (MediaDeviceInfo | InputDeviceInfo)[] = [];

  devices.forEach((device) => {
    const serializedDevice = JSON.stringify({
      deviceId: device.deviceId,
      kind: device.kind,
      label: device.label,
      groupId: device.groupId,
    });
    if (device.kind === "videoinput") {
      cameras.push(JSON.parse(serializedDevice));
    } else if (device.kind === "audioinput") {
      mics.push(JSON.parse(serializedDevice));
    } else if (device.kind === "audiooutput") {
      speakers.push(JSON.parse(serializedDevice));
    }
  });
  
  store.dispatch(setCameras(cameras));
  store.dispatch(setMics(mics));
  store.dispatch(setSpeakers(speakers));
  store.dispatch(setSelectedCamera(cameras[0].deviceId));
  store.dispatch(setSelectedMic(mics[0].deviceId));
  store.dispatch(setSelectedSpeaker(speakers[0].deviceId));
};
