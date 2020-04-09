import * as types from "../actions/action-types";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const loginReducer = (state = initialState, action) => {
  //   console.log("App::reducer", { state, action });
  switch (action.type) {
    case types.LOGIN:
      // console.log("LOGIN received", { state, action });
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return Object.assign({}, state, {
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      });

    // TODO Add logout button
    case types.LOGOUT:
      console.log("LOGOUT received", { state, action });
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
  }
  return state;
};

export { loginReducer };
