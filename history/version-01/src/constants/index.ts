// ROUTE
export const FRONT_SERVER_URL = 'http://localhost:5510' as string;
export const BACK_SERVER_URL = 'http://localhost:3000' as string;
export const GET = 'GET' as string;
export const POST = 'POST' as string;
export const PUT = 'PUT' as string;
export const PATCH = 'PATCH' as string;
export const DELETE = 'DELETE' as string;

// ACTIONS
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY' as string; // 카테고리 변경 이벤트(Only View)
// Component to Dispatch
export const LOAD_MENU_REQUEST = 'LOAD_MENU_REQUEST' as string;
export const CREATE_MENU_REQUEST = 'CREATE_MENU_REQUEST' as string;
export const UPDATE_MENU_REQUEST = 'UPDATE_MENU_REQUEST' as string;
export const DELETE_MENU_REQUEST = 'DELETE_MENU_REQUEST' as string;
export const SOLDOUT_MENU_REQUEST = 'SOLDOUT_MENU_REQUEST' as string;
// Catch Action and transport database (ASAP)
export const LOAD_MENU_SUCCESS = 'LOAD_MENU_SUCCESS' as string;
export const CREATE_MENU_SUCCESS = 'CREATE_MENU_SUCCESS' as string;
export const UPDATE_MENU_SUCCESS = 'UPDATE_MENU_SUCCESS' as string;
export const DELETE_MENU_SUCCESS = 'DELETE_MENU_SUCCESS' as string;
export const SOLDOUT_MENU_SUCCESS = 'SOLDOUT_MENU_SUCCESS' as string;
// Catch Error
export const CREATE_MENU_FAILURE = 'CREATE_MENU_FAILURE' as string;
export const LOAD_MENU_FAILURE = 'LOAD_MENU_FAILURE' as string;
export const UPDATE_MENU_FAILURE = 'UPDATE_MENU_FAILURE' as string;
export const DELETE_MENU_FAILURE = 'DELETE_MENU_FAILURE' as string;
export const SOLDOUT_MENU_FAILURE = 'SOLDOUT_MENU_FAILURE' as string;

// MIDDLEWARE
export const WORKING_MIDDLEWARE = true as boolean;

// UTIL
export const LOCALSTORAGE_KEY = Object.freeze([
  'espresso',
  'frappuccino',
  'blended',
  'teavana',
  'desert',
]) as Array<string>;
export const ENTER_KEYCODE = 'Enter' as string;
export const ESC_KEYCODE = 'Escape' as string;
export const LIMIT_DELAY_TWO_SECOND = 2000 as number;
