export const freezeStateMiddleware = (store) => (next) => (action) => {
  freezeStoreState(store);

  try {
    return next(action);
  }
  finally {
    freezeStoreState(store);
  }
};

const freezeStoreState = (store) => {
  const state = store.getState();
  if (isFreezable(state)) {
    deepFreeze(state);
  }
};

const isFreezable = (value) => value !== null && typeof value === 'object';

const deepFreeze = (o) => {
  Object.freeze(o);

  const isFunction = typeof o === 'function';
  const hasOwnProperty = Object.prototype.hasOwnProperty;

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (hasOwnProperty.call(o, prop)
    && (isFunction ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments' : true )
    && o[prop] !== null
    && (typeof o[prop] === 'object' || typeof o[prop] === 'function')
    && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });

  return o;
};
