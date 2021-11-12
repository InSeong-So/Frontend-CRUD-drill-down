import {
  LOCALSTORAGE_KEY,
  CREATE_MENU_SUCCESS,
  LOAD_MENU_SUCCESS,
  UPDATE_MENU_SUCCESS,
  DELETE_MENU_SUCCESS,
  LOAD_MENU_FAILURE,
  CREATE_MENU_FAILURE,
  UPDATE_MENU_FAILURE,
  DELETE_MENU_FAILURE,
  SOLDOUT_MENU_SUCCESS,
  SOLDOUT_MENU_FAILURE,
} from '../constants/index.js';

interface ActionProps {
  type: string;
  category: string;
  currentCategory: string;
  currentCategoryText: string;
  data: any;
  message: any;
}

interface DynamicProps {
  [key: string | symbol]: any;
}

export default (reducer: any) => {
  return (state?: any) => {
    return (action: ActionProps | object = {}) => {
      return reducer(state, watchDispatch(action as ActionProps));
    };
  };
};

const localState = {} as DynamicProps;

/**
 * redux-saga 구현해서 적용해보기
 * @TODO generator/yield 구현
 */
const fork = {
  CREATE_MENU_REQUEST: (action: ActionProps) => {
    watchCreateMenu(action);
  },
  LOAD_MENU_REQUEST: (action: ActionProps) => {
    watchLoadMenu(action);
  },
  UPDATE_MENU_REQUEST: (action: ActionProps) => {
    watchUpdateMenu(action);
  },
  DELETE_MENU_REQUEST: (action: ActionProps) => {
    watchDeleteMenu(action);
  },
  SOLDOUT_MENU_REQUEST: (action: ActionProps) => {
    watchSoldoutMenu(action);
  },
} as DynamicProps;

/**
 * Store의 Action을 감시
 *
 * @param {object} action
 * @returns next();
 */
const watchDispatch = (action: ActionProps) => {
  LOCALSTORAGE_KEY.forEach(key => {
    localState[key] = JSON.parse(localStorage.getItem(key) as string) || [];
  });
  Object.keys(fork).forEach(_key => {
    if (_key === action.type) return fork[_key](action);
  });
  return action;
};

/**
 * 1. 카테고리 메뉴 리스트 불러오기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchLoadMenu = (action: ActionProps) => {
  try {
    action.type = LOAD_MENU_SUCCESS;
    action.data = localState[action.category];
  } catch (error) {
    action.type = LOAD_MENU_FAILURE;
    action.message = error;
    console.log(error);
  }
};

/**
 * 2. 메뉴 추가하기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchCreateMenu = (action: ActionProps) => {
  try {
    action.type = CREATE_MENU_SUCCESS;
    setStorage(action.category, action.data);
  } catch (error) {
    action.type = CREATE_MENU_FAILURE;
    action.message = error;
    console.log(error);
  }
};

/**
 * 3. 메뉴 수정하기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchUpdateMenu = (action: ActionProps) => {
  try {
    action.type = UPDATE_MENU_SUCCESS;
    setStorage(action.category, action.data);
  } catch (error) {
    action.type = UPDATE_MENU_FAILURE;
    action.message = error;
    console.log(error);
  }
};

/**
 * 4. 메뉴 삭제하기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchDeleteMenu = (action: ActionProps) => {
  try {
    action.type = DELETE_MENU_SUCCESS;
    setStorage(action.category, action.data);
  } catch (error) {
    action.type = DELETE_MENU_FAILURE;
    action.message = error;
    console.log(error);
  }
};

/**
 * 5. 메뉴 품절 처리
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchSoldoutMenu = (action: ActionProps) => {
  try {
    action.type = SOLDOUT_MENU_SUCCESS;
    setStorage(action.category, action.data);
  } catch (error) {
    action.type = SOLDOUT_MENU_FAILURE;
    action.message = error;
    console.log(error);
  }
};

const setStorage = (key: string, value: any) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};
