import utils from '../utils/index.js';

interface ReturnPros {
  [key: string | symbol]: any;
  publish: any;
}

interface DynamicProps {
  [key: string | symbol]: any;
}

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
  type: string;
  category: string;
  currentCategory: string;
  currentCategoryText: string;
  data: any;
}

const createStore = async (
  reducer: (state?: any) => (action?: ActionProps) => any,
  middleware: ((data: any, state: any) => void) | null,
) => {
  const state = await observable(reducer()());

  // const forbiddenState = (state => {
  //   Object.keys(state).forEach(key => {
  //     Object.defineProperty(state, key, {
  //       writable: false,
  //     });
  //   });
  //   return state;
  // })(state);

  const dispatch = async (action: ActionProps) => {
    const newState = (await reducer(state)(action)) as StateProps;
    // 미들웨어
    if (typeof middleware === 'function') await middleware(action, newState);
    for (const [key, value] of await Object.entries(newState)) {
      if (state[key] === value) continue;
      state[key] = value;
    }
  };

  const publish = (callback: () => void) => {
    state.publish(callback);
  };

  const getState = (): DynamicProps => {
    return utils.deepClone(state);
  };

  return await { dispatch, publish, getState };
};

export default createStore;

const observable = async (state: any) => {
  const handlers = {} as DynamicProps;

  const watchState = new Proxy(utils.deepClone(await state), {
    set: (target: DynamicProps, name, value) => {
      if (target[name] && utils.isEqualsObject(target[name], value))
        return true;
      target[name] = value;
      Object.keys(handlers).forEach(_key => {
        handlers[_key](utils.deepCloneAndFreeze(watchState));
      });
      return true;
    },
  }) as ReturnPros;

  watchState.publish = (callback: DynamicProps) => {
    Object.keys(callback).forEach(_key => {
      handlers[_key] = utils.debounce(callback[_key]);
      callback[_key](utils.deepCloneAndFreeze(watchState));
    });
  };

  return watchState;
};
