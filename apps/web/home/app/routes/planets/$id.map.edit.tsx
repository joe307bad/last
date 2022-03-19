import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import {
  getMapById,
  getPlanetById,
  resourceChangeByPlanetId,
} from '~last/request/node';
import { Planet as TPlanet } from '~last/shared/types';
import { VisxVoronoi } from '~/components/visx';

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

  // const map = {
  //   height: 0,
  //   width: 0,
  //   territories: '[]',
  // };

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
    map: {
      _id: string;
      height: number;
      width: number;
      territories: string;
    } | null;
  }>();

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
      <div className="pb-5 w-[600px] m-auto">
        {/**
         icons for mountain, house, structure, https://www.svgrepo.com/collection/american-tribal-symbols/1
         icons for soldiers, characters https://www.svgrepo.com/collection/spartan/
         icons for structures, castles https://www.svgrepo.com/collection/castles/
         **/}
        <ul
          id="tabs"
          className="inline-flex w-full px-1 pt-2 justify-center pb-5"
        >
          <li className="px-4 py-2 -mb-px font-semibold text-white border-b-2 border-blue-100 rounded-t">
            <a id="default-tab" href="#first">
              Terrains
            </a>
          </li>
          <li className="px-4 py-2 font-semibold text-white rounded-t">
            <a href="#second">Characters</a>
          </li>
          <li className="px-4 py-2 font-semibold text-white rounded-t">
            <a href="#third">Structures</a>
          </li>
          <li className="px-4 py-2 font-semibold text-white rounded-t">
            <a href="#third">Paths</a>
            {/**
             TODO
             - connect regions with a line or an underground tunnel
             -
             **/}
          </li>
          <li className="px-4 py-2 font-semibold text-white rounded-t">
            <a href="#third">Settings</a>
            {/**
             TODO
             settings for this would be
             - number of territories
             - reset the mao
             -
             **/}
          </li>
          <li className="px-4 py-2 font-semibold text-white rounded-t">
            <a href="#third">Actions</a>
            {/**
             TODO
             actions
             - reset map
             - combine painted regions into territories
                - might be able to use `unify` from flatten/js https://github.com/alexbol99/flatten-js#boolean-operations
             - undo/redo
             - reset and randomize territories
             **/}
          </li>
        </ul>
        <div className="flex grid grid-cols-5 justify-center">
          <TwoCheckBoxes
            one="River"
            two="Mountain"
          />
          <TwoCheckBoxes
            one="River"
            two="Mountain"
          />
          <TwoCheckBoxes
            one="River"
            two="Mountain"
          />
          <TwoCheckBoxes
            one="River"
            two="Mountain"
          />
          <TwoCheckBoxes
            one="River"
            two="Mountain"
          />
        </div>
      </div>
    </div>
  );
}

const TwoCheckBoxes = ({
  one,
  two,
}: {
  one: string;
  two: string;
}) => {
  return (
    <div>
      <div className="form-check">
        <input
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label
          className="form-check-label inline-block text-white-800"
          htmlFor="flexCheckDefault"
        >
          {one}
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          value=""
          id="flexCheckChecked"
          checked
        />
        <label
          className="form-check-label inline-block text-white-800"
          htmlFor="flexCheckChecked"
        >
          {two}
        </label>
      </div>
    </div>
  );
};
