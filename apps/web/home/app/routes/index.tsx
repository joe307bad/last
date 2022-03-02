import type {
  MetaFunction,
  LoaderFunction,
} from 'remix';
import { useLoaderData } from 'remix';
import {
  AllPlanetsResponse,
  Planet,
} from '~last/shared/types';
import { getAllPlanets } from '~last/request/node';

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

  if (!data?.data?.planets?.edges) {
    return <></>;
  }

  return (
    <main>
      <div>
        {data.data.planets.edges.map(
          ({ node }, i) => (
            <div key={i}>
              {Object.keys(node).map(
                (planetKey: string, i) => (
                  <div key={i}>
                    <div
                      style={{ color: 'white' }}
                    >
                      {planetKey}:{' '}
                      {
                        node[
                          planetKey as keyof Planet
                        ]
                      }
                    </div>
                  </div>
                )
              )}
              <br />
            </div>
          )
        )}
      </div>
    </main>
  );
}
