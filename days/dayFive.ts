import { dayFiveInput, dayFiveTestInput } from "./inputs/dayFiveInput";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const letterPairs = alphabet
  .map(letter => `${letter}${letter.toUpperCase()}`)
  .concat(alphabet.map(letter => `${letter.toUpperCase()}${letter}`));

export function dayFivePartOne() {
  return reactPolymer(dayFiveInput).length;
}

function reactPolymer(polymer: string) {
  let currentString = polymer;
  let currentLength = currentString.length;
  while (true) {
    letterPairs.forEach(
      pair => (currentString = currentString.replace(new RegExp(pair, "g"), ""))
    );
    if (currentString.length == currentLength) break;
    else {
      currentLength = currentString.length;
    }
  }

  return currentString;
}

export function dayFivePartTwo() {
  let shortestPolymer = Number.MAX_SAFE_INTEGER;

  alphabet.forEach(letter => {
    let filteredPolymer = dayFiveInput.replace(
      new RegExp(`(${letter}|${letter.toUpperCase()})`, "g"),
      ""
    );

    const reacted = reactPolymer(filteredPolymer);

    if (reacted.length < shortestPolymer) shortestPolymer = reacted.length;
  });

  return shortestPolymer;
}
