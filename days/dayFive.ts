import { dayFiveInput } from "./inputs/dayFiveInput";

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const letterPairs: string[] = [];

for (let i = 0; i < alphabet.length; i++) {
  const currentLetter = alphabet[i];
  letterPairs.push(`${currentLetter}${currentLetter.toUpperCase()}`);
  letterPairs.push(`${currentLetter.toUpperCase()}${currentLetter}`);
}

export function dayFive() {
  let currentString = dayFiveInput;

  for (let i = 0; i < currentString.length - 1; i++) {
    const testPair = currentString.slice(i, i + 2);
    //console.log(testPair);
    if (letterPairs.indexOf(testPair) != -1) {
      currentString =
        currentString.substring(0, i) + currentString.substring(i + 2);
      //console.log("Set to: " + currentString);
      i = -1;
    }
  }

  return currentString.length;
}
