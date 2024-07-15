import React, { createContext, useContext, useReducer } from 'react';

interface RouletteState {
  rouletteTables: {
    [key: string]: {
      numbers: number[];
      lastNumber: number | null;
    };
  };
}
interface Props {
  children: React.ReactNode;
}
const RouletteContext = createContext<{
  state: RouletteState;
  dispatch: React.Dispatch<any>;
}>({
  state: {
    rouletteTables: {},
  },
  dispatch: () => {},
});

export const useRouletteContext = () => useContext(RouletteContext);

const rouletteReducer = (state: RouletteState, action: any) => {
  switch (action.type) {
    case 'ADD_ROULETTE':
      const id = `roulette_${Date.now()}`;
      return {
        ...state,
        rouletteTables: {
          ...state.rouletteTables,
          [id]: {
            numbers: [],
            lastNumber: null,
          },
        },
      };

    case 'ENTER_NUMBER':
      const { rouletteId, number } = action.payload;
      const rouletteTable = state.rouletteTables[rouletteId];
      const updatedNumbers = [...rouletteTable.numbers, number];

      return {
        ...state,
        rouletteTables: {
          ...state.rouletteTables,
          [rouletteId]: {
            ...rouletteTable,
            numbers: updatedNumbers,
            lastNumber: number,
          },
        },
      };

    default:
      return state;
  }
};

const initialState: RouletteState = {
  rouletteTables: {},
};

export const RouletteProvider: React.FC<Props> = (props) => {
  const [state, dispatch] = useReducer(rouletteReducer, initialState);
  const { children } = props;
  return (
    <RouletteContext.Provider value={{ state, dispatch }}>
      {children}
    </RouletteContext.Provider>
  );
};
