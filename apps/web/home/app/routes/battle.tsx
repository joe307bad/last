import type {
  MetaFunction,
  LoaderFunction,
} from 'remix';
import MapSvgFromJson from '~/components/mapSvgFromJson';
import { getAllPlanets } from '~last/request/node';
import { sampleSize } from 'lodash';
import { useLoaderData } from 'remix';
import {
  Planet as TPlanet,
  SvgResult,
} from '~last/shared/types';
import { Planet } from '~/components/planet';
import { getMapSvg } from '~/utils/getMapSvg';

export let loader: LoaderFunction = async () => {
  const allPlanets = await getAllPlanets();
  return {
    planets: sampleSize(
      allPlanets.data?.planets?.edges || [],
      2
    ),
    map: await getMapSvg(`public/maps/map2.svg.json`),
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
    map: SvgResult;
  }>();
  console.log(map);
  return (
    <div className=" flex content-center justify-center items-center">
      <Planet planet={planets[0].node} />
      <div className={'flex-1 content-center'}>
        <MapSvgFromJson map={map} />
      </div>
      <Planet planet={planets[1].node} />
    </div>
  );
}
