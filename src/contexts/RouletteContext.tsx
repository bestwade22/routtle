import { defaultSettings } from '@/static/defaultSettings';
import { getCookie } from '@/utils/handleCookie';
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
interface settingsInterface {
  absentCheck: {
    id: string;
    title: string;
    check: number[];
  }[];
}

interface RouletteState {
  rouletteTables: rouletteTable[];
  settings: settingsInterface;
}
interface Props {
  children: React.ReactNode;
}

const cookieState = JSON.parse(getCookie('state'));

export const defaultState: RouletteState = {
  rouletteTables: [
    {
      id: 1,
      title: 'Table 1',
      record: [],
      numberRecord: [],
      lastNumber: null,
    },
  ],
  settings: defaultSettings,
};
const initialState = cookieState ? cookieState : defaultState;
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
  const settings = state.settings;
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
    case 'UPDATE_SETTING_CHECK':
      const { checkNumber, betId, numIndex } = action.payload;
      const betIndex = settings.absentCheck.map((bet) => bet.id).indexOf(betId);
      const newAbsentCheck = settings.absentCheck;
      newAbsentCheck[betIndex].check[numIndex] = checkNumber;
      return {
        ...state,
        settings: { ...state.settings, absentCheck: newAbsentCheck },
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
