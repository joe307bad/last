import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import {
  getPlanetById,
  resourceChangeByPlanetId,
} from '~last/request/node';
import { Planet as TPlanet } from '~last/shared/types';
import { Planet } from '~/components/planet';
import { VxVoronoi } from '~/components/vxVoronoi';

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

  const regions = new Array(150)
    .fill(null)
    .map(() => ({
      x: Math.random() * 920,
      y: Math.random() * 1000,
      id: Math.random().toString(36).slice(2),
    }));

  return {
    planet: planet.data.planet,
    regions,
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
        <div className="w-72 mt-0 pt-0 min-w-[200px] p-4 mr-4 border-gray-50 grid-flow-col grid-rows-7">
          <span className="font-semibold text-xl mb-4 block">
            Map tools
          </span>
          <span className="font-semibold text-l mb-4 block">
            Draw
          </span>
          <div className="grid grid-cols-5 gap-4 flex-nowrap auto-cols-max">
            <input
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label
              className="col-span-4 form-check-label flex-nowrap text-white"
              htmlFor="flexCheckDefault"
            >
              Lorem ipsum dolor sit amet
            </label>
          </div>
          <span className="font-semibold text-l mb-4 block">
            Place
          </span>
          <div className="grid grid-cols-5 gap-4 flex-nowrap auto-cols-max">
            <input
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label
              className="col-span-4 form-check-label flex-nowrap text-white"
              htmlFor="flexCheckDefault"
            >
              Lorem ipsum dolor sit amet
            </label>
          </div>
        </div>
        <div className="relative w-full h-full">
          <div className="absolute bottom-3 top-0 right-0 left-0">
            <VxVoronoi regions={regions} />
          </div>
        </div>
      </div>
    </div>
  );
}
