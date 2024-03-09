export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsRemainder = Math.floor(seconds % 60);

  const hoursStr = hours < 10 ? "0" + hours : hours;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const secondsStr =
    secondsRemainder < 10 ? "0" + secondsRemainder : secondsRemainder;

  return hoursStr + ":" + minutesStr + ":" + secondsStr;
}
