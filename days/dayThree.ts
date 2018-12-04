import { dayThreeInput } from "./inputs/dayThreeInput";

export function dayThreePart1() {
  const claims = dayThreeInput.reduce(
    (claims, input) => {
      //cover each of the squares
      let xCoords: number[] = [];
      let fullCoords: string[] = [];
      for (let xCoord = input.x; xCoord < input.x + input.width; xCoord++) {
        xCoords.push(xCoord);
      }
      for (let yCoord = input.y; yCoord < input.y + input.height; yCoord++) {
        xCoords.forEach(item => fullCoords.push(`(${item},${yCoord})`));
      }
      fullCoords.forEach(item => {
        claims[item] = claims[item] === undefined ? 1 : claims[item] + 1;
      });
      return claims;
    },
    {} as { [key: string]: number }
  );
  const mappedClaims = Object.keys(claims)
    .map(item => ({
      coordinate: item,
      count: claims[item]
    }))
    .filter(item => item.count >= 2);
  return mappedClaims.length;
}
