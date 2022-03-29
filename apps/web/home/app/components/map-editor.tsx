import { VisxVoronoi } from '~/components/visx';
import { MapEditorToolbar } from '~/components/map-editor-toolbar';
import Mlyn, { useSubject } from 'react-mlyn';
import {
  MapResponse,
  Planet,
  SelectedTerrain,
} from '~last/shared/types';

export const MapEditor = ({
  planet,
  map,
}: {
  planet: Partial<Planet>;
  map: MapResponse | null;
}) => {
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
        <div>
          {!map ? (
            <span className="block w-full text-center text-red-500 text-xl font-bold">
              No Map
            </span>
          ) : (
            <Mlyn.Div className="z-0 absolute p-5 pb-0 top-0 bottom-0 left-0 right-0">
              {() => (
                <VisxVoronoi
                  selectedTerrain={selectedTerrain$()}
                  height={height || 0}
                  width={width || 0}
                  regions={JSON.parse(
                    territories || '[]'
                  )}
                />
              )}
            </Mlyn.Div>
          )}
        </div>
      </div>
      <Mlyn.Div>
        {() => (
          <MapEditorToolbar
            selectedTerrain$={selectedTerrain$}
          />
        )}
      </Mlyn.Div>
    </div>
  );
};
