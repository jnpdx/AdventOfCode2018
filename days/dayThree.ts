import { dayThreeInput } from "./inputs/dayThreeInput";

export function dayThreePart1() {
  return generateClaims().filter(item => item.count >= 2).length;
}

export function generateClaims() {
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
        claims[item] =
          claims[item] === undefined
            ? { count: 1, owners: [input.owner] }
            : {
                count: claims[item].count + 1,
                owners: [...claims[item].owners, input.owner]
              };
      });
      return claims;
    },
    {} as { [key: string]: { count: number; owners: number[] } }
  );
  return Object.keys(claims).map(coordinate => ({
    coordinate,
    count: claims[coordinate].count,
    owners: claims[coordinate].owners
  }));
}

export function dayThreePart2() {
  const claims = generateClaims();
  return dayThreeInput.reduce(
    (singleOwners, item) => {
      const itemArea = item.width * item.height;
      const ownedSquares = claims.filter(
        claim => claim.owners[0] === item.owner && claim.owners.length === 1
      );
      if (itemArea === ownedSquares.length)
        return [...singleOwners, item.owner];
      else return singleOwners;
    },
    [] as number[]
  );
}
