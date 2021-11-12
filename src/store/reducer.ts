import {
  CHANGE_CATEGORY,
  CREATE_MENU_SUCCESS,
  LOAD_MENU_SUCCESS,
  UPDATE_MENU_SUCCESS,
  DELETE_MENU_SUCCESS,
  SOLDOUT_MENU_SUCCESS,
} from '../constants/index.js';

const initialState = {
  espresso: [],
  frappuccino: [],
  blended: [],
  teavana: [],
  desert: [],
  currentCategory: 'espresso',
  currentCategoryText: '☕ 에스프레소',
  menuCount: 0,
};

interface StateProps {
  espresso: Array<string>;
  frappuccino: Array<string>;
  blended: Array<string>;
  teavana: Array<string>;
  desert: Array<string>;
  currentCategory: string;
  currentCategoryText: string;
  menuCount: number;
}

interface ActionProps {
  type: string | any;
  category: string | any;
  currentCategory: string | any;
  currentCategoryText: string | any;
  data: any;
}

const reducer = (
  state: StateProps = initialState,
  action: ActionProps,
): StateProps => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
        currentCategoryText: action.currentCategoryText,
      };
    case LOAD_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: action.data,
        menuCount: action.data.length,
      };
    case CREATE_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: action.data,
        menuCount: ++state.menuCount,
      };
    case UPDATE_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: action.data,
      };
    case DELETE_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: action.data,
        menuCount: --state.menuCount,
      };
    case SOLDOUT_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
