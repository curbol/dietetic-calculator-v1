const deepFreeze = (o) => {
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach(p => {
    if (o.hasOwnProperty(p) && o[p] !== null && typeof o[p] === 'object' && !Object.isFrozen(o[p])) {
      deepFreeze(o[p]);
    }
  });

  return o;
};

export const freezeState = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  deepFreeze(state);
  return result;
};
