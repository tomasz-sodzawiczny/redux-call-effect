import { call, callEffectMiddleware } from '../src/index';

describe('callEffectMiddleware', () => {
  const dispatch = jest.fn();
  const next = jest.fn();
  const middleware = callEffectMiddleware({ dispatch })(next);

  beforeEach(() => {
    dispatch.mockClear();
    next.mockClear();
  });

  it('passes through ordinary actions', () => {
    const action = { type: 'foo', payload: 'bar' };

    middleware(action);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  it('passes through thunks', () => {
    const action = () => 'foo';

    middleware(action);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  it('`call`s action creator with no params', () => {
    const actionCreator = () => ({ type: 'foo', payload: 'bar' });

    middleware(call(actionCreator));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(actionCreator());
    expect(next).toHaveBeenCalledTimes(0);
  });

  it('`call`s action creator with params', () => {
    const actionCreator = (type, payload) => ({ type, payload });

    middleware(call(actionCreator, 'foo', 'bar'));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(actionCreator('foo', 'bar'));
    expect(next).toHaveBeenCalledTimes(0);
  });
});

describe('call', () => {
  it('returns deep equal objects when called multiple times with the same params', () => {
    const actionCreator = () => undefined;

    expect(call(actionCreator, 'foo', 'bar')).toEqual(
      call(actionCreator, 'foo', 'bar')
    );
  });
});
