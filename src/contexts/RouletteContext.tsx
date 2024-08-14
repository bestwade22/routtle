import React, { createContext, useContext, useEffect, useReducer } from 'react';

interface recordType {
  num: number;
  color: string;
}
interface rouletteTable {
  id: number;
  title: string;
  record: recordType[];
  numberRecord: number[];
  lastNumber: number | null;
}
interface RouletteState {
  rouletteTables: rouletteTable[];
}
interface Props {
  children: React.ReactNode;
}

export const initialState: RouletteState = {
  rouletteTables: [
    {
      id: 1,
      title: 'Table 1',
      record: [],
      numberRecord: [],
      lastNumber: null,
    },
  ],
};

const RouletteContext = createContext<{
  state: RouletteState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const useRouletteContext = () => useContext(RouletteContext);

const rouletteReducer = (state: RouletteState, action: any) => {
  const rouletteTables = state.rouletteTables;
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
        rouletteTables: [
          //...state.rouletteTables,
          ...filteredTable,
        ],
      };

    case 'ENTER_RECORD':
      const { tableId, recordItem } = action.payload;
      const tableIndex = rouletteTables
        .map((table) => table.id)
        .indexOf(tableId);
      const record = rouletteTables[tableIndex].record;
      const numberRecord = rouletteTables[tableIndex].numberRecord;
      rouletteTables[tableIndex].record = [...record, recordItem];
      rouletteTables[tableIndex].numberRecord = [
        ...numberRecord,
        recordItem.num,
      ];
      return {
        ...state,
        rouletteTables: rouletteTables,
      };
    case 'DELETE_RECORD':
      const index = rouletteTables
        .map((table) => table.id)
        .indexOf(action.payload.tableId);
      rouletteTables[index].record.pop();
      rouletteTables[index].numberRecord.pop();
      return {
        ...state,
        rouletteTables: rouletteTables,
      };

    default:
      return state;
  }
};

export const RouletteProvider: React.FC<Props> = (props) => {
  const [state, dispatch] = useReducer(rouletteReducer, initialState);
  const { children } = props;
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('State managed by useReducer:', state);
    }
  }, [state]);

  return (
    <RouletteContext.Provider value={{ state, dispatch }}>
      {children}
    </RouletteContext.Provider>
  );
};
