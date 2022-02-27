import type {
  MetaFunction,
  LoaderFunction,
} from 'remix';
import { useLoaderData, json } from 'remix';
import got from 'got';

export type TPlanet = {
  name: string;
  colors: string[];
  rulingFamily: string;
  opposingFamilies: string[];
  resources: Array<[string, number, string]>;
};

type IndexData = {
  data: {
    planets: { edges: { node: TPlanet }[] };
  };
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async () => {
  const plantInfoQuery = `
  query {
    planets {
      edges {
        node {
          id
          name
        }
      }
    }
  }
 `;

  const planets = await got
    .post('http://localhost:3333/graphql', {
      json: {
        query: plantInfoQuery,
      },
    })
    .json<{
      data: {
        edges: {
          node: {
            name: string;
            planetResources: {
              initialAmount: number;
              resource: {
                name: string;
                id: string;
              };
            };
          }[];
        }[];
      };
    }>();
  return json(planets);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();
  console.log(data.data.planets.edges);

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
                (planetKey, i) => (
                  <div key={i}>
                    <div
                      style={{ color: 'white' }}
                    >
                      {planetKey}:{' '}
                      {
                        node[
                          planetKey as keyof TPlanet
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
