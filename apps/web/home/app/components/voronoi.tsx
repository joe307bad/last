import { VoronoiPolygon } from '@vx/voronoi';
import { Group } from '@vx/group';
// @ts-ignore
import { Delaunay } from 'd3-delaunay';
// TODO
// does it make sense to convert this to this https://airbnb.io/visx/voronoi
// made the mistake of using @vx instead of @visx
export const Voronoi = ({
  regions,
}: {
  regions: { id: string; x: number; y: number }[];
}) => {
  const delaunay = Delaunay.from(
    regions,
    (d) => d.x,
    (d) => d.y
  );
  const voronoi = delaunay.voronoi([
    0, 0, 920, 1000,
  ]);

  const polygons = Array.from(
    voronoi.cellPolygons()
  ).map((cp, i) => ({
    id: regions[i].id,
    polygon: cp,
  }));

  return (
    <svg
      viewBox="0 0 920 1000"
      height="100%"
      width="100%"
      preserveAspectRatio="xMinYMin meet"
    >
      <Group>
        {polygons.map(
          ({ id, polygon }: any, i) => {
            return (
              <VoronoiPolygon
                className="region"
                key={i}
                onMouseDown={(event) => {
                  const region =
                    event.nativeEvent.target;

                  const seed = regions.find(
                    (p) => {
                      return p.id === region.id;
                    }
                  );

                  const dRegion = delaunay.find(
                    seed.x,
                    seed.y
                  );

                  const neighbors = Array.from(
                    voronoi.neighbors(dRegion)
                  );

                  regions.forEach((n) => {
                    document.getElementById(
                      `${n.id}`
                    ).style.fill = '#4338ca';
                  });

                  neighbors.forEach((n) => {
                    document.getElementById(
                      `${polygons[n].id}`
                    ).style.fill = 'green';
                  });
                }}
                fill="#4338ca"
                strokeWidth="2"
                stroke="black"
                id={id}
                polygon={polygon}
              />
            );
          }
        )}
        {regions.map(
          (
            {
              id,
              x,
              y,
            }: {
              id: string;
              x: number;
              y: number;
            },
            i: number
          ) => (
            <circle
              fill="red"
              r={2}
              key={`${i}-point`}
              cx={x}
              cy={y}
              id={`${id}-circle`}
            />
          )
        )}
      </Group>
    </svg>
  );
};
