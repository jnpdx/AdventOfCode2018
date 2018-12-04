import { dayOneInput } from "./inputs/dayOneInput";

export function dayOnePart1() {
  return dayOneInput.reduce(
    (totalFreq, currentFrequency) => totalFreq + currentFrequency,
    0
  );
}

export function dayOnePart2() {
  let frequencies = new Set<number>();
  let frequency = 0;
  let index = 0;

  while (true) {
    const currentFrequency = dayOneInput[index];
    frequency += currentFrequency;
    if (frequencies.has(frequency)) {
      return frequency;
    } else {
      frequencies.add(frequency);
      index++;
      if (index == dayOneInput.length) index = 0;
    }
  }
}
