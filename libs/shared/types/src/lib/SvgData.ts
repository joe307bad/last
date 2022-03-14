import { Either } from 'purify-ts';

export type SvgResult = {
  paths: {
    id: string;
    d: string;
    seed: {
      $: { id: string; cx: string; cy: string };
    }[];
    adjacentPolygons: {
      id: string;
      distanceFrom: number;
    }[];
  }[];
  edges: string;
};

export type SvgData = Either<Error, SvgResult>;
