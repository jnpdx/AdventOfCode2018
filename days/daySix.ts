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

  console.log("Outer edge:");
  console.log(outerEdge);

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

export function _daySixPart1() {
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
  for (let y = 0; y <= dimensions.max.y; y++) {
    for (let x = 0; x <= dimensions.max.x; x++) {
      allPoints.push({ x, y });
    }
  }

  const closestDistances1 = allPoints.map(point => {
    //find the distance to each item
    const distances = daySixInput
      .map((inputPoint, index) => {
        console.log(
          `Calc distance between ${point.x},${point.y} and ${inputPoint.x},${
            inputPoint.y
          }`
        );
        const distance =
          Math.abs(inputPoint.x - point.x) + Math.abs(inputPoint.y - point.y);
        console.log("Distance: " + distance);
        return {
          index,
          inputPoint,
          distance
        };
      })
      .slice()
      .sort((a, b) => {
        return a.distance - b.distance;
      });

    return {
      point,
      distances
    };
  });

  let curY = 0;
  closestDistances1.forEach(point => {
    if (curY != point.point.y) {
      process.stdout.write("\n");
    }
    curY = point.point.y;
    const chartToWrite =
      point.distances[0].distance != point.distances[1].distance
        ? point.distances[0].index
        : ".";
    process.stdout.write(`${chartToWrite}`);
  });

  const closestDistances = closestDistances1
    .filter(item => item.distances[0] != item.distances[1]) //don't deal with any points that have a tie
    .map(item => ({
      point: item.point,
      closestDistance: item.distances[0]
    })); //show only the closest distance

  //well, let's print it out:

  console.log("\n\n---------");

  //collect the outer edge point names
  const outerEdge = allPoints
    .filter(
      point =>
        point.x == dimensions.min.x ||
        point.x == dimensions.max.x ||
        point.y == dimensions.min.y ||
        point.y == dimensions.max.y
    )
    .reduce((bannedPoints, edgePoint) => {
      const foundItem = closestDistances.find(i => i.point == edgePoint);
      if (foundItem) {
        bannedPoints.add(foundItem.closestDistance.inputPoint);
      }
      return bannedPoints;
    }, new Set<Point>());

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
    .filter(item => !outerEdge.has(item.point))
    .slice()
    .sort((a, b) => (b.count > a.count ? 1 : -1));

  console.log("Distances:");
  console.log(JSON.stringify(distances));

  //[0];
}
