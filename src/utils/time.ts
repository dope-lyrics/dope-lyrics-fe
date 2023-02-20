const timeUnits = ["seconds", "minutes", "hours", "days"] as const;
type Unit = typeof timeUnits[number];

function timeAsMs(time: number, unit: Unit) {
  if (Number.isNaN(time) || !timeUnits.includes(unit)) return;

  const timeMap = {
    seconds: (time: number) => time * 1000,
    minutes: (time: number) => time * 1000 * 60,
    hours: (time: number) => time * 1000 * 60 * 60,
    days: (time: number) => time * 1000 * 60 * 60 * 24,
  };

  return timeMap[unit](time);
}

export { timeAsMs };
