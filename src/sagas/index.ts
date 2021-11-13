import {
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

import http from '../client/index.js';

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
    return async (action: ActionProps | object = {}) => {
      return await reducer(state, await watchDispatch(action as ActionProps));
    };
  };
};

/**
 * redux-saga 구현해서 적용해보기
 * @TODO generator/yield 구현
 */
const fork = {
  CREATE_MENU_REQUEST: (action: ActionProps) => {
    return watchCreateMenu(action);
  },
  LOAD_MENU_REQUEST: (action: ActionProps) => {
    return watchLoadMenu(action);
  },
  UPDATE_MENU_REQUEST: (action: ActionProps) => {
    return watchUpdateMenu(action);
  },
  DELETE_MENU_REQUEST: (action: ActionProps) => {
    return watchDeleteMenu(action);
  },
  SOLDOUT_MENU_REQUEST: (action: ActionProps) => {
    return watchSoldoutMenu(action);
  },
} as DynamicProps;

/**
 * Store의 Action을 감시
 *
 * @param {object} action
 * @returns next();
 */
const watchDispatch = (action: ActionProps | any) => {
  const KEY = Object.keys(fork).filter(_key => _key === action.type)[0];
  return KEY ? fork[KEY](action) : action;
};

/**
 * 1. 카테고리 메뉴 리스트 불러오기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchLoadMenu = async (action: ActionProps | any) => {
  try {
    action.category = action.category || 'espresso';
    const { data } = await http.load(action);
    action.type = LOAD_MENU_SUCCESS;
    action.data = data;
    return action;
  } catch (error) {
    alert(error);
    action.type = LOAD_MENU_FAILURE;
    return action;
  }
};

/**
 * 2. 메뉴 추가하기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchCreateMenu = async (action: ActionProps | any) => {
  try {
    const { data } = await http.create(
      { category: action.category },
      { name: action.data },
    );
    action.type = CREATE_MENU_SUCCESS;
    action.data = data;
    return action;
  } catch (error) {
    alert(error);
    action.type = CREATE_MENU_FAILURE;
    return action;
  }
};

/**
 * 3. 메뉴 수정하기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchUpdateMenu = async (action: ActionProps | any) => {
  try {
    const { data } = await http.update(action, { name: action.data });
    action.type = UPDATE_MENU_SUCCESS;
    action.data = data;
    return action;
  } catch (error) {
    alert(error);
    action.type = UPDATE_MENU_FAILURE;
    return action;
  }
};

/**
 * 4. 메뉴 삭제하기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchDeleteMenu = async (action: ActionProps | any) => {
  try {
    await http.delete(action);
    action.type = DELETE_MENU_SUCCESS;
    return action;
  } catch (error) {
    alert(error);
    action.type = DELETE_MENU_FAILURE;
    return action;
  }
};

/**
 * 5. 메뉴 품절 처리
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchSoldoutMenu = async (action: ActionProps | any) => {
  try {
    const { data } = await http.soldOut(action, { name: action.data });
    action.type = SOLDOUT_MENU_SUCCESS;
    action.data = data;
    return action;
  } catch (error) {
    alert(error);
    action.type = SOLDOUT_MENU_FAILURE;
    return action;
  }
};
