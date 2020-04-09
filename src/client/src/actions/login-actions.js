import * as types from "./action-types";

const login = (jsonPayload) => {
  return { type: types.login, payload: jsonPayload };
};

export { login };
