export default (milliseconds) => {
  const totalSeconds = milliseconds / 1000;

  const seconds = (totalSeconds % 60) | 0;
  const minutes = ((totalSeconds / 60) % 60) | 0;
  const hours = (totalSeconds / (60 * 60)) | 0;

  return {
    seconds,
    minutes,
    hours,
  };
}
