import { daySixInput } from "./inputs/daySixInput";

type Point = {
  x: number;
  y: number;
};

export function daySixPart1() {
  //find the dimensions of the grid
  const dimensions = daySixInput.reduce(
    (maxValues, item) => ({
      max: {
        x: item.x > maxValues.max.x ? item.x : maxValues.max.x,
        y: item.y > maxValues.max.y ? item.y : maxValues.max.y
      },
      min: {
        x: item.x < maxValues.min.x ? item.x : maxValues.min.x,
        y: item.y < maxValues.min.y ? item.y : maxValues.min.y
      }
    }),
    {
      max: { x: 0, y: 0 },
      min: { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER }
    }
  );

  console.log("Grid dimensions:");
  console.log(dimensions);

  const allPoints: Point[] = [];
  for (let y = dimensions.min.y; y < dimensions.max.y; y++) {
    for (let x = dimensions.min.x; x < dimensions.max.x; x++) {
      allPoints.push({ x, y });
    }
  }

  const closestDistances = allPoints
    .map(point => {
      //find the distance to each item
      const distances = daySixInput
        .map(inputPoint => {
          const distance =
            Math.abs(inputPoint.x - point.x) + Math.abs(inputPoint.y - point.y);
          return {
            inputPoint,
            distance
          };
        })
        .sort((a, b) => {
          return a.distance - b.distance;
        });
      return {
        point,
        distances
      };
    })
    .filter(item => item.distances[0] != item.distances[1]) //don't deal with any points that have a tie
    .map(item => ({
      point: item.point,
      closestDistance: item.distances[0]
    })); //show only the closest distance

  const distances = closestDistances
    .reduce((totals, item) => {
      const currentPoint = totals.find(
        i => i.point == item.closestDistance.inputPoint
      );
      if (currentPoint) {
        currentPoint.count++;
      }
      return totals;
    }, daySixInput.map(item => ({ point: item, count: 0 })))
    .sort((a, b) => b.count - a.count);

  console.log("Distances:");
  console.log(JSON.stringify(distances));

  //[0];
}
