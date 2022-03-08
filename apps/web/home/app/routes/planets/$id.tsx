import { redirect, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import {
  getPlanetById,
  resourceChangeByPlanetId,
} from '~last/request/node';
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

export async function action({
  request,
}: {
  request: { formData: () => Promise<any> };
}) {
  const body = await request.formData();
  await resourceChangeByPlanetId(
    body.get("planetId"),
    body.get("resourceId")
  );
  return true; //redirect(`/planets/${body.planetId}`);
}

export default function PlanetById() {
  let data = useLoaderData<Partial<TPlanet>>();

  return (
    <Planet
      actionText="Add Resource"
      planet={data}
    />
  );
}
