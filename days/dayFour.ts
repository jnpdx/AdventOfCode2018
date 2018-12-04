import { dayFourInput, GuardEventType } from "./inputs/dayFourInput";

export function dayFourPart1() {
  const shiftBeginnings = dayFourInput.filter(
    item => item.type === GuardEventType.BEGIN_SHIFT
  );
  const guardEventPairs = shiftBeginnings.reduce(
    (guardInfo, item) => {
      const index = dayFourInput.findIndex(i => i === item);
      //shift begins at index
      const dayOfYear =
        item.date.hour() === 0
          ? item.date.dayOfYear()
          : item.date
              .clone()
              .add(1, "d")
              .dayOfYear();
      const midnightEvents = dayFourInput.filter(i => {
        const newDayOfYear =
          i.date.hour() === 0
            ? i.date.dayOfYear()
            : i.date
                .clone()
                .add(1, "d")
                .dayOfYear();
        return i.guardNumber === item.guardNumber && newDayOfYear === dayOfYear;
      });
      const pairs = midnightEvents.reduce(
        (pairs, event) => {
          if (event.type === GuardEventType.ASLEEP) {
            pairs.push({
              fallAsleep: event.date.minute(),
              awake: -1
            });
          } else if (event.type === GuardEventType.WAKE) {
            pairs[pairs.length - 1].awake = event.date.minute();
          }
          return pairs;
        },
        [] as EventPair[]
      );
      if (guardInfo[item.guardNumber] == undefined) {
        guardInfo[item.guardNumber] = pairs;
      } else {
        guardInfo[item.guardNumber] = [
          ...guardInfo[item.guardNumber],
          ...pairs
        ];
      }
      return guardInfo;
    },
    {} as { [key: string]: EventPair[] }
  );

  const keys = Object.keys(guardEventPairs);

  const sortedTime = keys
    .map(key => {
      const pairs = guardEventPairs[key];
      const timeAsleep = pairs.reduce(
        (acc, item) => acc + (item.awake - item.fallAsleep),
        0
      );
      return {
        guardNumber: key,
        timeAsleep
      };
    })
    .sort((a, b) => (a.timeAsleep > b.timeAsleep ? -1 : 1));

  const sleepiestGuard = sortedTime[0].guardNumber;

  let minutes: number[] = [];
  for (let i = 0; i < 60; i++) {
    minutes.push(0);
  }

  const sleepiestGuardPairs = guardEventPairs[sleepiestGuard];

  for (let pair of sleepiestGuardPairs) {
    for (let i = pair.fallAsleep; i < pair.awake; i++) {
      minutes[i]++;
    }
  }

  const sleepiestMinute = minutes.reduce(
    (storedValue, currentItem, currentIndex) =>
      currentItem > storedValue.value
        ? {
            index: currentIndex,
            value: currentItem
          }
        : storedValue,
    {
      index: -1,
      value: -1
    }
  );

  console.log("Sleepiest minute: " + sleepiestMinute.index);

  return sleepiestMinute.index * Number(sleepiestGuard);
}

type EventPair = {
  fallAsleep: number;
  awake: number;
};
