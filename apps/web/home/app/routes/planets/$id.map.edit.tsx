import {
  ActionFunction,
  json,
  useActionData,
  useLoaderData,
} from 'remix';
import type { LoaderFunction } from 'remix';
import {
  getMapById,
  getPlanetById,
} from '~last/request/node';
import {
  MapResponse,
  Planet as TPlanet,
} from '~last/shared/types';
import { MapProvider } from '~/directory/MapContext';
import { MapEditor } from '~/components/map-editor';
import { saveMapState } from '~last/request/node';
import { useEffect } from 'react';

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
  const map = await getMapById(
    planet?.data?.planet?.mapId || ''
  ).catch(() => null);

  return {
    planet: planet.data.planet,
    map,
  };
};

export const action: ActionFunction = async ({
  request,
}) => {
  const body = await request.formData();
  return json({
    mapStateId: await saveMapState({
      mapId: Math.random().toString(),
      mapState:
        (body.get('mapState') as string) || '',
    }),
  });
};

export default function MapEdit() {
  let { planet, map } = useLoaderData<{
    planet: Partial<TPlanet>;
    map: MapResponse | null;
  }>();
  const actionData = useActionData();

  useEffect(() => {}, [actionData]);

  console.log(actionData);

  return (
    <MapProvider>
      <MapEditor map={map} planet={planet} />
    </MapProvider>
  );
}
