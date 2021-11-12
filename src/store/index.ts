import createStore from './createStore.js';
import reducer from './reducer.js';
import sagaWrapper from '../sagas/index.js';
import { WORKING_MIDDLEWARE } from '../constants/index.js';

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

/**
 * LoggerMiddleware 구현
 * constants의 WORKING_MIDDLEWARE를 false로 바꾸면 사용 안함
 *
 * @param {Action} param0
 * @param {Parameter} state
 */
const loggerMiddleware = (
  { type, data }: { type: string; data: any },
  state: StateProps,
): void => {
  console.groupCollapsed(`[TYPE]: ${type}`);
  console.log('[Send Data]: ', data);
  console.log('[Current Status]: ', state);
  console.groupEnd();
};

const configureStore = (
  middleware: ((data: any, state: StateProps) => void) | null,
) => {
  if (!WORKING_MIDDLEWARE) middleware = null;
  const store = createStore(sagaWrapper(reducer), middleware);
  return store;
};

const store = configureStore(loggerMiddleware);

export default store;
