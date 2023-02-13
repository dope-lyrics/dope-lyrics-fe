function convertSecondsToMs(seconds: number) {
  if (Number.isNaN(seconds)) return;

  return 1000 * seconds;
}

export { convertSecondsToMs };
