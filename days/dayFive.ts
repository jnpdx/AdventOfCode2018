import { dayFiveInput, dayFiveTestInput } from "./inputs/dayFiveInput";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
//const letterPairs: string[] = [];

const letterPairs = alphabet
  .map(letter => `${letter}${letter.toUpperCase()}`)
  .concat(alphabet.map(letter => `${letter.toUpperCase()}${letter}`));

export function dayFive() {
  let currentString = dayFiveTestInput;

  for (let i = 0; i < currentString.length - 1; i++) {
    const testPair = currentString.slice(i, i + 2);
    if (letterPairs.indexOf(testPair) != -1) {
      currentString =
        currentString.substring(0, i) + currentString.substring(i + 2);
      i = -1;
    }
  }

  return currentString.length;
}
