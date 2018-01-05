# redux-call-effect

A declarative way to call action creators.

```
npm install --save redux-call-effect
```

```js
import { call } from 'redux-call-effect';

// Before:
dispatch(doAction(param1, param2));
// After:
dispatch(call(doAction, param1, param2));
```

## Why?

**To simplify testing.**

In some cases calling action creators imperatively makes testing virtually impossibe, especially when using [thunks](https://github.com/gaearon/redux-thunk). Consider this example:

```js
// Source:
const onResultSaved => result => dispatch => {/* ... */};

const saveResult = result => dispatch => {
  /* ... */
  dispatch(onResultSaved(result));
};

// Test:
test('saveResult() dispatches postResult', () => {
  saveResult(result)(dispatch);
  // Cannot do that, onResultSaved() returns a new function every time!
  expect(dispatch).toHaveBeenCalledWith(onResultSaved(result)); // Error!
});
```

We cannot easily check if a correct thunk was dispatched. `redux-call-effect` to the rescue:

```js
// Source:
const onResultSaved => result => dispatch => {/* ... */};

const saveResult = result => dispatch => {
  /* ... */
  dispatch(call(onResultSaved, result));
};

// Test:
test('saveResult() dispatches postResult', () => {
  saveResult(result)(dispatch);
  expect(dispatch).toHaveBeenCalledWith(call(onResultSaved, result)); // Works!
});
```

## Installation

```
npm install --save redux-call-effect
```

Before you can use `call` you have to inject the middleware with [`applyMiddleware`](http://redux.js.org/docs/api/applyMiddleware.html):

```js
import { createStore, applyMiddleware } from 'redux';
import { callEffectMiddleware } from 'redux-call-effect';
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(callEffectMiddleware));
```

## Inspiration

This project is of course inspired by the [`call` effect](https://redux-saga.js.org/docs/api/index.html#callfn-args) from the awesome [redux-saga](https://github.com/redux-saga/redux-saga).

## License

MIT
