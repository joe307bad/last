import { Subject } from 'mlyn';
import { SelectedTerrain } from '~last/shared/types';
import { useSubjectValue } from 'react-mlyn';
import { useCallback } from 'react';
import { SubmitButton } from '~/components/button';
import { useMapContext } from '~/directory/MapContext';
import { Form } from 'remix';

export const MapEditorToolbar = ({
  selectedTerrain$,
}: {
  selectedTerrain$: Subject<SelectedTerrain>;
}) => {
  const {
    state: mapState,
    dispatch: mapDispatch,
  } = useMapContext();

  return (
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
          selectedTerrain$={selectedTerrain$}
          one="Water"
          two="Mountain"
        />
        <Form method="post">
          <input
            name="mapState"
            type="hidden"
            value={JSON.stringify(mapState)}
          />
          <SubmitButton>Save Map</SubmitButton>
        </Form>
      </div>
    </div>
  );
};

const TwoCheckBoxes = ({
  selectedTerrain$,
  one,
  two,
}: {
  selectedTerrain$: Subject<SelectedTerrain>;
  one: string;
  two: string;
}) => {
  const selectedTerrain = useSubjectValue(
    selectedTerrain$
  );

  const toggleSelectedTerrain = useCallback(
    (newSelectedTerrain: SelectedTerrain) => {
      if (
        selectedTerrain === newSelectedTerrain
      ) {
        selectedTerrain$('none');
      } else {
        selectedTerrain$(newSelectedTerrain);
      }
    },
    [selectedTerrain]
  );

  return (
    <div>
      <div className="form-check">
        <input
          autoComplete="off"
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          onClick={() =>
            toggleSelectedTerrain('water')
          }
          checked={selectedTerrain$() === 'water'}
        />
        <label
          onClick={() =>
            toggleSelectedTerrain('water')
          }
          className="form-check-label inline-block text-white-800"
          htmlFor="flexCheckDefault"
        >
          {one}
        </label>
      </div>
      <div className="form-check">
        <input
          autoComplete="off"
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          value=""
          onClick={() =>
            toggleSelectedTerrain('mountain')
          }
          checked={selectedTerrain === 'mountain'}
        />
        <label
          onClick={() =>
            toggleSelectedTerrain('mountain')
          }
          className="form-check-label inline-block text-white-800"
          htmlFor="flexCheckChecked"
        >
          {two}
        </label>
      </div>
    </div>
  );
};
