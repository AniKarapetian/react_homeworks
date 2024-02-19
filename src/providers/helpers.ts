import { setCameras, setMics } from "../store/shared/shared-slice";
import store from "../store/store";

export const setDevices = (devices: (MediaDeviceInfo| InputDeviceInfo)[]) => {
    
  const cameras: (MediaDeviceInfo| InputDeviceInfo)[] = [];

  const mics: (MediaDeviceInfo| InputDeviceInfo)[] = [];


devices.forEach((device)=>{
    const serializedDevice = JSON.stringify({
        deviceId: device.deviceId,
        kind: device.kind,
        label: device.label,
        groupId: device.groupId
    });
    if (device.kind === "videoinput" && device.deviceId !== "default"){
        cameras.push(JSON.parse(serializedDevice));
    } else if(device.kind === "audioinput" && device.deviceId !== "default"){
        mics.push(JSON.parse(serializedDevice));
    }
})
  store.dispatch(setCameras(cameras));
  store.dispatch(setMics(mics));
};
