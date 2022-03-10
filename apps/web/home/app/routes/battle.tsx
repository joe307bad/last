import type {
  MetaFunction,
  LoaderFunction,
} from 'remix';
import MapSvg from '~/components/map';
import { getAllPlanets } from '~last/request/node';
import { sampleSize } from 'lodash';
import { useLoaderData } from 'remix';
import { Planet as TPlanet } from '~last/shared/types';
import { Planet } from '~/components/planet';

export let loader: LoaderFunction = async () => {
  const allPlanets = await getAllPlanets();
  return sampleSize(
    allPlanets.data?.planets?.edges || [],
    2
  );
};

export let meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  };
};

export default function Battle() {
  let planets =
    useLoaderData<{ node: TPlanet }[]>();
  return (
    <div className=" flex content-center justify-center items-center">
      <Planet planet={planets[0].node} />
      <div className={'flex-1 content-center'}>
        <MapSvg />
      </div>
      <Planet planet={planets[1].node} />
    </div>
  );
}
