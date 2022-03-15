import { SvgResult } from '~last/shared/types';

const MapSvgFromJson = ({
  map,
}: {
  map: SvgResult;
}) => {
  return (
    <svg
      id="main_svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 920 1000"
      height="100%"
      width="100%"
      preserveAspectRatio="none"
    >
      <g id="svg_g_bezier_cells">
        {map.paths.map((p) => (
          <path
            key={p.id}
            d={p.d}
            id={p.id}
            fill-opacity="1"
            fill="#4338ca"
            onClick={() => {
              const regions =
                document.getElementById(
                  'svg_g_bezier_cells'
                )?.childNodes;

              if (regions) {
                regions.forEach((r) => {
                  r.style.fill = '#4338ca';
                });
                p.adjacentPolygons
                  .filter(
                    (ap) => ap.distanceFrom < 1
                  )
                  .forEach((ap) => {
                    const adjacentRegion =
                      document.getElementById(
                        ap.id
                      );
                    adjacentRegion.style.fill =
                      'green';
                  });
              }

              console.log(
                p.adjacentPolygons.filter(
                  (ap) => ap.distanceFrom < 1
                )
              );
            }}
          />
        ))}
      </g>
      <g id="svg_g_edges">
        <path
          id="svg_path_edges"
          d={map.edges}
          stroke="black"
          stroke-width="2"
        />
      </g>
      {map.paths.map((p, i) => {
        const seed = p.seed[0];
        if (!seed?.$) {
          return <></>;
        }
        const { $ } = seed;
        const x =
          Number($.cx) > 900 ? 870 : Number($.cx);
        const y =
          Number($.cy) < 10 ? 30 : Number($.cy);
        return (
          <g>
            <circle
              id="c_0"
              cx={x}
              cy={y}
              r="3"
              stroke="black"
              stroke-width="2"
              fill="#4338ca"
            />
            <text
              fill={'black'}
              key={p.id}
              x={x + 10}
              y={y}
            >
              0
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default MapSvgFromJson;
