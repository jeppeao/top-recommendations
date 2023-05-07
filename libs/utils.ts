export const msToMinutesAndSeconds = (timeInMs: number) => {
  const timeInSeconds = Math.round(timeInMs / 1000);
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - (minutes * 60);
  return `${minutes}:${seconds}`  
}