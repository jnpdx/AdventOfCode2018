import { dayTwoInput } from "./inputs/dayTwoInput";

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

export function dayTwoPart2() {
  return dayTwoInput.reduce(
    (answer, item1) => {
      const diff = dayTwoInput
        .map(item2 => compareIds(item1, item2))
        .filter(item => item.differentChars === 1);
      if (diff.length !== 0) {
        return { similarChars: diff[0].similarChars };
      } else {
        return answer;
      }
    },
    {
      similarChars: ""
    }
  ).similarChars;
}

function compareIds(input1: string, input2: string) {
  //assume the length is the same
  const length = input1.length;
  let differentChars = 0;
  let similarChars = "";
  for (let i = 0; i < length; i++) {
    if (input1[i] !== input2[i]) differentChars++;
    else similarChars += input1[i];
  }
  return {
    input1,
    input2,
    differentChars,
    similarChars
  };
}
