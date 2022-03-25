import {
  createContext,
  ReducerWithoutAction,
  useContext,
  useReducer,
} from 'react';

type Action =
  | { type: 'addWater'; payload: string }
  | {
      type: 'addMountain';
      payload: string;
    };
type Dispatch = (action: Action) => void;
type State = {
  mountains: Set<string>;
  water: Set<string>;
};

const MapContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function mapReducer(
  state: State,
  action: Action
): State {
  switch (action.type) {
    case 'addWater': {
      return {
        ...state,
        water: state.water.add(action.payload),
      };
    }
    case 'addMountain': {
      return {
        ...state,
        mountains: state.mountains.add(
          action.payload
        ),
      };
    }
  }
}

function MapProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [state, dispatch] = useReducer(
    mapReducer as ReducerWithoutAction<any>,
    { water: new Set(), mountains: new Set() }
  );
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
}

function useMapContext() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error(
      'useMapContext must be used within a MapProvider'
    );
  }
  return context;
}

const MapConsumer = MapContext.Consumer;

export {
  MapProvider,
  useMapContext,
  MapConsumer,
};
