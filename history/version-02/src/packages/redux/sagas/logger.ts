export const logEffect = (effect: any) => {
  let effectInfo;
  switch (effect.type) {
    case 'fork':
      effectInfo = effect.saga.name;
      break;
    case 'take':
      effectInfo = effect.actionType;
      break;
    case 'select':
      effectInfo = effect.selector.name;
      break;
    case 'call':
      effectInfo = effect.fn.name;
      break;
    case 'put':
      effectInfo = `${effect.action.type} ${JSON.stringify(effect.action.data)}`;
      break;
    default:
      break;
  }
  console.log(
    `%ceffect: %c${effect.type}%c ${effectInfo}`,
    'color: gray',
    'color: green; font-weight: bold',
    'color: salmon; font-weight: bold',
  );
};

export const logAction = (action: any, newState: any) => {
  console.log(
    `%caction: %c${action.type}%c ${
      action.data ? JSON.stringify(action.data) : ''
    }%c\nnew state:%c ${JSON.stringify(newState)}`,
    'color: gray',
    'color: orange; font-weight: bold',
    'color: salmon',
    'color: gray',
    'color: salmon',
  );
};
