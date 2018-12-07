import { daySixInput, distanceThreshold } from "./inputs/daySixInput";

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

  let totalDistanceCounter = 0;
  //find the closest point to each one:
  const pointsWithDist = allPoints
    .map(point => {
      let closest: Point = { x: -1, y: -1 };
      let closestDistance = Number.MAX_SAFE_INTEGER;
      let duplicate = false;
      let totalDistance = 0;
      daySixInput.forEach(inputPoint => {
        const distance =
          Math.abs(inputPoint.x - point.x) + Math.abs(inputPoint.y - point.y);
        totalDistance += distance;
        if (distance == closestDistance) {
          duplicate = true;
        }
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = inputPoint;
          duplicate = false;
        }
      });
      if (totalDistance < distanceThreshold) totalDistanceCounter++;

      return {
        point,
        closestInputPoint: closest,
        duplicate,
        totalDistance
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

  return {
    part1: pointsWithDist[0].count,
    part2: totalDistanceCounter
  };
}
