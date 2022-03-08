import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { getPlanetById } from '~last/request/node';
import { Planet as TPlanet } from '~last/shared/types';
import { Planet } from '~/components/planet';

export let loader: LoaderFunction = async ({
  params,
}) => {
  if (!params?.id) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const planet = await getPlanetById(params.id);

  if (!planet?.data?.planet) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  return planet.data.planet;
};

export default function PlanetById() {
  let data = useLoaderData<Partial<TPlanet>>();
  return <Planet planet={data} />;
}
