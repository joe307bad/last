import { redirect, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import {
  getPlanetById,
  resourceChangeByPlanetId,
} from '~last/request/node';
import {
  Planet as TPlanet,
  SvgResult,
} from '~last/shared/types';
import { Planet } from '~/components/planet';
import { getMapSvg } from '~/utils/getMapSvg';
import MapSvgFromJson from '~/components/mapSvgFromJson';
import map2 from '~/map2.svg.json';

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
    map: await getMapSvg(
      `public/maps/map2.svg.json`
    ),
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
  let { planet, map } = useLoaderData<{
    planet: Partial<TPlanet>;
    map: SvgResult;
  }>();

  return (
    <div className="flex h-full">
      <Planet planet={planet} />
      <div className="relative w-full h-full">
        <div className="absolute bottom-3 top-0 right-0 left-0">
          <MapSvgFromJson map={map2} />
        </div>
      </div>
      <div className="w-72 mt-0 pt-0 min-w-[200px] p-4 mr-4 border-gray-50 grid-flow-col grid-rows-7">
        <span className="font-semibold text-xl mb-4 block">
          Map tools
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
    </div>
    // <div className="flex h-full">
    //   <div className="flex h-full">
    //     <Planet planet={planet} />
    //   </div>
    //   <MapSvgFromJson map={map} />
    // </div>
  );
}
