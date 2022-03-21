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
import { VisxVoronoi } from '~/components/visx';
import { MapEditorToolbar } from '~/components/map-editor-toolbar';
import { useSubject } from 'react-mlyn';

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
  await resourceChangeByPlanetId(
    body.get('planetId'),
    body.get('resourceId')
  );
  return true; //redirect(`/planets/${body.planetId}`);
}

export default function MapEdit() {
  let { planet, map } = useLoaderData<{
    planet: Partial<TPlanet>;
    map: MapResponse | null;
  }>();

  const selectedTerrain$ =
    useSubject<SelectedTerrain>('none');

  const { height, width, territories } =
    map || {};

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full text-center">
        <span className="text-[30px] font-bold">
          Map Editor ::{' '}
          <span className="text-green-400">
            {planet.name}
          </span>
        </span>
      </div>
      <div className="relative w-full h-full">
        <div className="z-0 absolute p-5 pb-0 top-0 bottom-0 left-0 right-0">
          {!map ? (
            <span className="block w-full text-center text-red-500 text-xl font-bold">
              No Map
            </span>
          ) : (
            <VisxVoronoi
              height={height || 0}
              width={width || 0}
              regions={JSON.parse(
                territories || '[]'
              )}
            />
          )}
        </div>
      </div>
      <MapEditorToolbar
        selectedTerrain$={selectedTerrain$}
      />
    </div>
  );
}
