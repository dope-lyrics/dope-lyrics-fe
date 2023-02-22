const timeUnits = ["seconds", "minutes", "hours", "days"] as const;
type Unit = typeof timeUnits[number];

function timeAsMs(time: number, unit: Unit) {
  if (Number.isNaN(time) || !timeUnits.includes(unit)) return;

  const timeMap = {
    seconds: function (time: number) {
      return time * 1000;
    },
    minutes: function (time: number) {
      return this.seconds(time) * 60;
    },
    hours: function (time: number) {
      return this.minutes(time) * 60;
    },
    days: function (time: number) {
      return this.hours(time) * 24;
    },
  };

  return timeMap[unit](time);
}

export { timeAsMs };
