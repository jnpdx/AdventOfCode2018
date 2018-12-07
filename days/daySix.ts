import { daySixInput } from "./inputs/daySixInput";

type Point = {
  x: number;
  y: number;
};

export function daySixPart1() {
  const xDimensions = daySixInput.slice().sort((a, b) => a.x - b.x);
  const yDimensions = daySixInput.slice().sort((a, b) => a.y - b.y);
  const dimensions = {
    min: {
      x: xDimensions[0].x,
      y: yDimensions[0].y
    },
    max: {
      x: xDimensions[xDimensions.length - 1].x,
      y: yDimensions[yDimensions.length - 1].y
    }
  };
  console.log(dimensions);
  //calcate distances
  const allPoints: Point[] = [];
  for (let y = dimensions.min.y; y <= dimensions.max.y; y++) {
    for (let x = dimensions.min.x; x <= dimensions.max.x; x++) {
      allPoints.push({ x, y });
    }
  }

  const tally = daySixInput.map(i => ({
    inputPoint: i,
    count: 0
  }));

  const outerEdge = allPoints.filter(
    point =>
      point.x == dimensions.min.x ||
      point.x == dimensions.max.x ||
      point.y == dimensions.min.y ||
      point.y == dimensions.max.y
  );

  let duplicates = 0;
  //find the closest point to each one:
  const pointsWithDist = allPoints
    .map(point => {
      let closest: Point = { x: -1, y: -1 };
      let closestDistance = Number.MAX_SAFE_INTEGER;
      let duplicate = false;
      daySixInput.forEach(inputPoint => {
        // console.log(
        //   `Calc distance between ${point.x},${point.y} and ${inputPoint.x},${
        //     inputPoint.y
        //   }`
        // );
        const distance =
          Math.abs(inputPoint.x - point.x) + Math.abs(inputPoint.y - point.y);
        if (distance == closestDistance) {
          duplicates++;
          duplicate = true;
        }
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = inputPoint;
          duplicate = false;
        }
      });
      return {
        point,
        closestInputPoint: closest,
        duplicate
      };
    })
    .filter(i => !i.duplicate)

    .reduce((tally, point) => {
      const found = tally.find(
        i =>
          i.inputPoint.x == point.closestInputPoint.x &&
          i.inputPoint.y == point.closestInputPoint.y
      );
      const isPointOnEdge = outerEdge.find(
        i => i.x == point.point.x && i.y == point.point.y
      );
      if (found && !isPointOnEdge) {
        found.count++;
      }
      return tally;
    }, tally)
    .sort((a, b) => b.count - a.count);

  console.log("Result:");
  console.log(JSON.stringify(pointsWithDist[0]));
  return pointsWithDist[0].count;
}
