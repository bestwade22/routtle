import React, { createContext, useContext, useReducer } from 'react';
interface rouletteTable {
  id: number;
  title: string;
  numbers: number[];
  lastNumber: number | null;
}
interface RouletteState {
  rouletteTables: rouletteTable[];
}
interface Props {
  children: React.ReactNode;
}
const RouletteContext = createContext<{
  state: RouletteState;
  dispatch: React.Dispatch<any>;
}>({
  state: {
    rouletteTables: [],
  },
  dispatch: () => {},
});

export const useRouletteContext = () => useContext(RouletteContext);

const rouletteReducer = (state: RouletteState, action: any) => {
  switch (action.type) {
    case 'ADD_ROULETTE_TABLE':
      const payload = action.payload;
      return {
        ...state,
        rouletteTables: [...state.rouletteTables, payload],
      };
    case 'REMOVE_ROULETTE_TABLE':
      var filteredTable = state.rouletteTables.filter(function (item) {
        return item.id !== action.payload.id;
      });
      return {
        ...state,
        rouletteTables: {
          ...state.rouletteTables,
          ...filteredTable,
        },
      };

    case 'ENTER_NUMBER':
      const { id, number } = action.payload;
      const rouletteTables = state.rouletteTables;
      const tableIndex = state.rouletteTables.findIndex(
        (item) => item.id == id
      );
      const numbers = rouletteTables[tableIndex].numbers;
      rouletteTables[tableIndex].numbers = [...numbers, number];

      return {
        ...state,
        rouletteTables: [...rouletteTables],
      };

    default:
      return state;
  }
};

const initialState: RouletteState = {
  rouletteTables: [],
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
