import { call, callEffectMiddleware } from "./index";

describe("callEffectMiddleware", () => {
  const next = jest.fn();
  const middleware = callEffectMiddleware()(next);

  beforeEach(() => {
    next.mockClear();
  });

  it("passes through ordinary actions", () => {
    const action = { type: "foo", payload: "bar" };

    middleware(action);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });

  it("passes through thunks", () => {
    const action = () => "foo";

    middleware(action);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });

  it("`call`s action creator with no params", () => {
    const actionCreator = () => ({ type: "foo", payload: "bar" });

    middleware(call(actionCreator));

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(actionCreator());
  });

  it("`call`s action creator with params", () => {
    const actionCreator = (type, payload) => ({ type, payload });

    middleware(call(actionCreator, "foo", "bar"));

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(actionCreator("foo", "bar"));
  });
});

describe("call", () => {
  it("returns deep equal objects when called multiple times with the same params", () => {
    const actionCreator = () => undefined;

    expect(call(actionCreator, "foo", "bar")).toEqual(
      call(actionCreator, "foo", "bar")
    );
  });
});
