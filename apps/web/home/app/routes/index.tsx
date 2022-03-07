import type {
  MetaFunction,
  LoaderFunction,
} from 'remix';
import { useLoaderData } from 'remix';
import { Planet as TPlanet } from '~last/shared/types';
import { getAllPlanets } from '~last/request/node';
import { sampleSize } from 'lodash';
import { Planet } from '~/components/planet';

export let loader: LoaderFunction = async () => {
  const allPlanets = await getAllPlanets();
  return sampleSize(
    allPlanets.data?.planets?.edges || [],
    8
  );
};

export let meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  };
};

export default function Index() {
  let planets =
    useLoaderData<{ node: TPlanet }[]>();

  if (!planets) {
    return <></>;
  }

  return (
    <main className="remix__page flex  justify-center">
      <div className="grid grid-cols-4 grid-rows-2 gap-4">
        {planets.map(({ node }, i) => (
          <Planet key={i} planet={node} />
        ))}
      </div>
    </main>
  );
}
