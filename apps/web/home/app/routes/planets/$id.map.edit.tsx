import {
  ActionFunction,
  json,
  useActionData,
  useLoaderData,
} from 'remix';
import type { LoaderFunction } from 'remix';
import r from '~/utils/request.server';
import { MapProvider } from '~/directory/MapContext';
import { MapEditor } from '~/components/map-editor';
import { useEffect } from 'react';
import { MapResponse, Planet } from '~last/shared/types';

export let loader: LoaderFunction = async ({
  params,
}) => {
  if (!params?.id) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const planet = await r.getPlanetById(params.id);

  if (!planet?.data?.planet) {
    throw new Response('Not Found', {
      status: 404,
    });
  }
  const map = await r
    .getMapById(planet?.data?.planet?.mapId || '')
    .catch(() => null);

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
    mapStateId: await r.saveMapState({
      mapId: Math.random().toString(),
      mapState:
        (body.get('mapState') as string) || '',
    }),
  });
};

export default function MapEdit() {
  let { planet, map } = useLoaderData<{
    planet: Partial<Planet>;
    map: MapResponse | null;
  }>();
  const actionData = useActionData();

  useEffect(() => {}, [actionData]);

  return (
    <MapProvider>
      <MapEditor map={map} planet={planet} />
    </MapProvider>
  );
}
