import { useLoaderData } from 'remix';
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
  return {
    planet: planet.data.planet,
  };
};

export async function action({
  request,
}: {
  request: { formData: () => Promise<any> };
}) {
  const body = await request.formData();
  await resourceChangeByPlanetId(
    body.get('planetId'),
    body.get('resourceId')
  );
  return true; //redirect(`/planets/${body.planetId}`);
}

export default function PlanetById() {
  let { planet, regions } = useLoaderData<{
    planet: Partial<TPlanet>;
    regions: {
      id: string;
      x: number;
      y: number;
    }[];
  }>();

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full p-[50px] pb-[100px] pl-10">
        <span className="text-[50px] font-bold">
          Planet Dossier ::{' '}
          <span className="text-green-400">
            {planet.name}
          </span>
        </span>
      </div>
      <div className="flex h-full">
        <Planet planet={planet} />
      </div>
    </div>
  );
}
