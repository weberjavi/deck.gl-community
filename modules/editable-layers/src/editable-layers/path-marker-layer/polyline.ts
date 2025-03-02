import { Vector3, clamp } from '@math.gl/core';

// Return the closest point on a line segment
export function getClosestPointOnLine({ p, p1, p2, clampToLine = true }) {
  const lineVector = new Vector3(p2).subtract(p1);
  const pointVector = new Vector3(p).subtract(p1);
  let dotProduct = lineVector.dot(pointVector);
  if (clampToLine) {
    dotProduct = clamp(dotProduct, 0, 1);
  }

  return lineVector.lerp(p1, p2, dotProduct);
}

// Return the closest point on a line segment
export function getClosestPointOnPolyline({ p, points }) {
  p = new Vector3(p);
  let pClosest: Vector3 | null = null;
  let distanceSquared = Infinity;
  let index = -1;
  for (let i = 0; i < points.length - 1; ++i) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const pClosestOnLine = getClosestPointOnLine({ p, p1, p2 });
    const distanceToLineSquared = p.distanceSquared(pClosestOnLine);
    if (distanceToLineSquared < distanceSquared) {
      distanceSquared = distanceToLineSquared;
      pClosest = pClosestOnLine;
      index = i;
    }
  }
  return {
    point: pClosest as Vector3,
    index,
    p1: points[index],
    p2: points[index + 1],
    distanceSquared,
    distance: Math.sqrt(distanceSquared),
  };
}
