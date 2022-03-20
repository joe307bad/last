import type {
  MetaFunction,
  LoaderFunction,
} from 'remix';
import {
  getAllPlanets,
  getMapById,
} from '~last/request/node';
import { sampleSize } from 'lodash';
import { useLoaderData } from 'remix';
import {
  MapResponse,
  Planet as TPlanet,
} from '~last/shared/types';
import { Planet } from '~/components/planet';
import { VisxVoronoi } from '~/components/visx';

export let loader: LoaderFunction = async () => {
  const allPlanets = await getAllPlanets();
  const twoRandomPlanets = sampleSize(
    allPlanets.data?.planets?.edges || [],
    2
  );

  const map = await (() => {
    const getMap = (mapId: string) =>
      getMapById(mapId);

    if (twoRandomPlanets[0].node.mapId) {
      return getMap(
        twoRandomPlanets[0].node.mapId
      );
    }

    if (twoRandomPlanets[1].node.mapId) {
      return getMap(
        twoRandomPlanets[1].node.mapId
      );
    }

    return Promise.resolve(null);
  })();

  return {
    planets: twoRandomPlanets,
    map,
  };
};

export let meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  };
};

export default function Battle() {
  let { planets, map } = useLoaderData<{
    planets: { node: TPlanet }[];
    map: MapResponse;
  }>();

  console.log(map);

  const { height, width, territories } =
    map || {};

  return (
    <div className="flex content-center justify-center items-center h-full">
      <Planet planet={planets[0].node} />
      <div className="relative w-[50%] h-full">
        <div className="absolute top-0 bottom-0 w-full h-full">
          {!map ? (
            <span className="block w-full text-center text-red-500 text-xl font-bold">
            No Map
          </span>
          ) : (
            <VisxVoronoi
              height={height || 0}
              width={width || 0}
              regions={JSON.parse(
                territories || '[]'
              )}
            />
          )}
        </div>
      </div>
      <Planet planet={planets[1].node} />
    </div>
  );
}
