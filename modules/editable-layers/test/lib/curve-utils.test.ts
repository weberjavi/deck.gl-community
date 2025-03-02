import { it, expect } from 'vitest';
import { generateCurveFromControlPoints } from '../../src/curve-utils';
import { Feature } from '@deck.gl-community/editable-layers';

const POLYLINE: Feature = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates: [
      [-122.41988182067871, 37.8014343052295],
      [-122.41904497146605, 37.802790657411244],
      [-122.41724252700804, 37.801603850614384],
      [-122.41612672805786, 37.80314669573162],
    ],
  },
};

it('test generateCurveFromControlPoints', () => {
  // @ts-ignore
  const result = generateCurveFromControlPoints(POLYLINE);
  expect(result).toMatchSnapshot();
});
