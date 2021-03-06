import React, {
  useState,
  useMemo,
  useRef,
} from 'react';
import { Group } from '@visx/group';
import {
  voronoi,
  VoronoiPolygon,
} from '@visx/voronoi';
import { SelectedTerrain } from '~last/shared/types';
import { useMapContext } from '~/directory/MapContext';
type Datum = {
  x: number;
  y: number;
  id: string;
};

export const VisxVoronoi = ({
  height,
  width,
  regions,
  selectedTerrain,
}: {
  height: number;
  width: number;
  regions: any;
  selectedTerrain: SelectedTerrain;
}) => {
  const voronoiLayout = useMemo(
    () =>
      voronoi<Datum>({
        x: (d) => d.x,
        y: (d) => d.y,
        width,
        height: height + 80,
      })(regions),
    [width, height]
  );

  const polygons = voronoiLayout.polygons();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredId, setHoveredId] = useState<
    string | null
  >(null);
  const [neighborIds, setNeighborIds] = useState<
    Set<string>
  >(new Set());
  const {
    state: mapState,
    dispatch: mapDispatch,
  } = useMapContext();

  const viewBox = `0 0 ${width} ${height + 80}`;

  return (
    <svg
      viewBox={viewBox}
      height="100%"
      width="100%"
      ref={svgRef}
    >
      <Group>
        {polygons.map((polygon) => (
          <VoronoiPolygon
            onMouseDown={(event) => {
              const region =
                event.nativeEvent.target;

              const point = regions.find((p) => {
                return p.id === region?.id;
              });

              const closest = voronoiLayout.find(
                point.x,
                point.y,
                750
              );

              if (
                closest &&
                closest.data.id !== hoveredId
              ) {
                const neighbors =
                  new Set<string>();
                const cell =
                  voronoiLayout.cells[
                    closest.index
                  ];
                if (!cell) return;

                // cell.halfedges.forEach(
                //   (index) => {
                //     const edge =
                //       voronoiLayout.edges[index];
                //     const { left, right } = edge;
                //     if (left && left !== closest)
                //       neighbors.add(left.data.id);
                //     else if (
                //       right &&
                //       right !== closest
                //     )
                //       neighbors.add(
                //         right.data.id
                //       );
                //   }
                // );

                setNeighborIds(neighbors);
                setHoveredId(closest.data.id);

                if (selectedTerrain === 'water') {
                  mapDispatch({
                    type: 'addWater',
                    payload: closest.data.id,
                  });
                } else if (
                  selectedTerrain === 'mountain'
                ) {
                  mapDispatch({
                    type: 'addMountain',
                    payload: closest.data.id,
                  });
                }
              }
            }}
            key={`polygon-${polygon.data.id}`}
            polygon={polygon}
            fill={
              (() => {
                if (
                  mapState.water.has(
                    polygon.data.id
                  )
                ) {
                  return 'blue';
                }
                if (
                  mapState.mountains.has(
                    polygon.data.id
                  )
                ) {
                  return '#817668';
                }

                return '#4338ca';
              })()
              // hoveredId &&
              // (polygon.data.id === hoveredId ||
              //   neighborIds.has(polygon.data.id))
              //   ? 'green'
              //   : '#4338ca'
            }
            id={polygon.data.id}
            stroke="black"
            strokeWidth={2}
            // fillOpacity={
            //   hoveredId &&
            //   neighborIds.has(polygon.data.id)
            //     ? 0.5
            //     : 1
            // }
          />
        ))}
        {regions.map(({ x, y, id }) => (
          <circle
            key={`circle-${id}`}
            r={2}
            cx={x}
            cy={y}
            fill="red"
          />
        ))}
      </Group>
    </svg>
  );
};
