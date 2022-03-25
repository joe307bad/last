import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import {
  getMapById,
  getPlanetById,
  resourceChangeByPlanetId,
} from '~last/request/node';
import {
  MapResponse,
  Planet as TPlanet,
  SelectedTerrain,
} from '~last/shared/types';
import { MapProvider } from '~/directory/MapContext';
import { MapEditor } from '~/components/map-editor';

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

export async function action({
  request,
}: {
  request: { formData: () => Promise<any> };
}) {
  const body = await request.formData();
  console.log({ saveMap: body.get('mapState') });
  // await resourceChangeByPlanetId(
  //   body.get('planetId'),
  //   body.get('resourceId')
  // );
  return true; //redirect(`/planets/${body.planetId}`);
}

export default function MapEdit() {
  let { planet, map } = useLoaderData<{
    planet: Partial<TPlanet>;
    map: MapResponse | null;
  }>();

  return (
    <MapProvider>
      <MapEditor map={map} planet={planet} />
    </MapProvider>
  );
}
