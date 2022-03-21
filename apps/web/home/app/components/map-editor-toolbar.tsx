import { Subject } from 'mlyn';
import { SelectedTerrain } from '~last/shared/types';
import Mlyn, {
  seal,
  useSubjectValue,
} from 'react-mlyn';

export const MapEditorToolbar = ({
  selectedTerrain$,
}: {
  selectedTerrain$: Subject<SelectedTerrain>;
}) => {
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
          one="River"
          two="Mountain"
        />
      </div>
    </div>
  );
};

const TwoCheckBoxes = seal(
  ({
    selectedTerrain$,
    one,
    two,
  }: {
    selectedTerrain$: Subject<SelectedTerrain>;
    one: string;
    two: string;
  }) => {
    const value = useSubjectValue(
      selectedTerrain$
    );
    console.log(selectedTerrain$());
    return (
      <div>
        <div className="form-check">
          <input
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            onClick={() => {
              if (value === 'river') {
                selectedTerrain$('none');
              } else {
                selectedTerrain$('river');
              }
            }}
            checked={value === 'river'}
          />
          <label
            onClick={() => {
              if (value === 'river') {
                selectedTerrain$('none');
              } else {
                selectedTerrain$('river');
              }
            }}
            className="form-check-label inline-block text-white-800"
            htmlFor="flexCheckDefault"
          >
            {one}
          </label>
        </div>
        <Mlyn.Input
          className="text-red-600"
          bindValue={selectedTerrain$}
        />
        <div className="form-check">
          <input
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            value=""
            checked={
              selectedTerrain$() === 'mountain'
            }
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
  }
);
