import type {
  MetaFunction,
  LoaderFunction,
} from 'remix';
import { useLoaderData } from 'remix';
import { Planet as TPlanet } from '~last/shared/types';
import { sampleSize } from 'lodash';
import { Planet } from '~/components/planet';
import r from '~/utils/request.server';

export let loader: LoaderFunction = async () => {
  const allPlanets =
    await r.request.graphql.getAllPlanets();
  return sampleSize(
    allPlanets.data?.planets?.edges || [],
    6
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
    <div className="flex flex-wrap justify-center">
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
