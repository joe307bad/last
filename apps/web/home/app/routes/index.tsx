import type {
  MetaFunction,
  LoaderFunction,
} from 'remix';
import { useLoaderData } from 'remix';
import { AllPlanetsResponse } from '~last/shared/types';
import { getAllPlanets } from '~last/request/node';
import { Planet } from '~/components/planet';
import { sampleSize } from 'lodash';

export let loader: LoaderFunction = async () => {
  return getAllPlanets();
};

type IndexData = AllPlanetsResponse;

export let meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  };
};

export default function Index() {
  let data = useLoaderData<IndexData>();
  console.log(data);
  // return <></>;

  if (!data?.data?.planets?.edges) {
    return <></>;
  }

  return (
    <main className="remix__page flex justify-center">
      {sampleSize(data.data.planets.edges, 4).map(
        ({ node }, i) => (
          <Planet key={i} planet={node} />
        )
      )}
    </main>
  );
}
