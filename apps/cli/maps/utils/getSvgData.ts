import { parseString } from 'xml2js';
import { readFile } from 'fs/promises';
import { Left, Right } from 'purify-ts';
import { v4 as uuidv4 } from 'uuid';
import Flatten from '@flatten-js/core';
let relate = Flatten.Relations;
import point = Flatten.point;
import Circle = Flatten.Circle;
import Polygon = Flatten.Polygon;
import { SvgData } from '~last/shared/types';

export const getSvgData = async (
  svgFileName: string
): Promise<SvgData> => {
  const svgFile = `${process.cwd()}/maps/${svgFileName}`;
  const data = await readFile(svgFile, 'utf-8');

  return new Promise<SvgData>(
    (resolve, reject) => {
      parseString(
        data,
        async (err: any, svgRaw: any) => {
          if (err) {
            resolve(
              Left(
                new Error(
                  `Error parsing ${svgFile}: ${err}`
                )
              )
            );
          }

          const group = svgRaw.svg.g;
          const [{ path }, edges, seeds] = group;

          const getPathPoints = (
            pathData: string
          ) =>
            pathData
              .split(/[\s,MLZ]+/)
              .slice(1, -1)
              .reduce<
                { x?: string; y?: string }[]
              >((all, coord, index) => {
                if (index % 2 === 0)
                  all.push({ x: coord });
                else
                  all[all.length - 1].y = coord;
                return all;
              }, []);

          const polygons = path.map(
            ({ $ }: { $: { d: string } }) => ({
              id: uuidv4(),
              d: $.d,
              polygon: new Polygon(
                getPathPoints($.d).map(
                  ({ x, y }) => {
                    return point(
                      Number(x),
                      Number(y)
                    );
                  }
                )
              ),
            })
          );

          const paths = polygons
            .map(
              (p: {
                $: any;
                polygon: Polygon;
              }) => {
                return {
                  ...p,
                  seed: seeds.circle.filter(
                    ({
                      $,
                    }: {
                      $: {
                        cx: string;
                        cy: string;
                      };
                    }) =>
                      relate.inside(
                        new Circle(
                          point(
                            Number($.cx),
                            Number($.cy)
                          ),
                          1
                        ),
                        p.polygon
                      )
                  ),
                };
              }
            )
            .map((p: { polygon: Polygon }) => {
              return {
                ...p,
                adjacentPolygons: polygons
                  .map(
                    (pp: {
                      id: string;
                      polygon: Polygon;
                    }) => ({
                      id: pp.id,
                      distanceFrom:
                        p.polygon.distanceTo(
                          pp.polygon
                        )[0],
                    })
                  )
                  .sort(
                    (
                      a: { distanceFrom: number },
                      b: { distanceFrom: number }
                    ) =>
                      a.distanceFrom -
                      b.distanceFrom
                  ),
              };
            });

          resolve(
            Right({
              paths,
              edges: edges.path[0].$.d,
            })
          );
        }
      );
    }
  );
};
