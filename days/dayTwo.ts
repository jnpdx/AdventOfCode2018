import { dayTwoInput } from "./inputs/dayTwoInput";

const dayTwoTestInput = [
  "abcdef",
  "bababc",
  "abbcde",
  "abcccd",
  "aabcdd",
  "abcdee",
  "ababab"
];

function letterCounts(input: string) {
  let letterCounts: { [key: string]: number } = {};
  for (let i = 0; i < input.length; i++) {
    const letter = input[i];
    if (letterCounts[letter] == undefined) {
      letterCounts[letter] = 1;
    } else {
      letterCounts[letter] += 1;
    }
  }
  return Object.keys(letterCounts).map(item => ({
    letter: item,
    count: letterCounts[item]
  }));
}

export function dayTwoPart1() {
  const twosAndThrees = dayTwoInput
    .map(item => {
      const counts = letterCounts(item);
      const hasTwo = counts.find(item => item.count === 2) != undefined;
      const hasThree = counts.find(item => item.count === 3) != undefined;
      return {
        hasTwo,
        hasThree
      };
    })
    .reduce(
      (totals, item) => ({
        twos: totals.twos + (item.hasTwo ? 1 : 0),
        threes: totals.threes + (item.hasThree ? 1 : 0)
      }),
      { twos: 0, threes: 0 }
    );
  return twosAndThrees.twos * twosAndThrees.threes;
}
