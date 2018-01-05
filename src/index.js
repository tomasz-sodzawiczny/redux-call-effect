const CALL =
  typeof Symbol === "function" ? Symbol("call") : "@@redux-call-effect/call";

export function call(func, ...params) {
  return {
    type: CALL,
    payload: {
      func,
      params
    }
  };
}

export const callEffectMiddleware = ({ dispatch }) => next => action => {
  if (action.type === CALL) {
    const { func, params } = action.payload;
    return dispatch(func(...params));
  }

  return next(action);
};
