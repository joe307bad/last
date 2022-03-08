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
    3
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
    <div className="flex">
      {planets.map(({ node }, i) => (
        <Planet
          linkText="Visit"
          link={`/planets/${node.id}`}
          key={i}
          planet={node}
        />
      ))}
    </div>
  );
}
