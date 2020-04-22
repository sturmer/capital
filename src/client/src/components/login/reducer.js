import * as actionTypes from "./actionTypes";

export const reducer = (action, state) => {
  switch (action.type) {
    case actionTypes.SEND_LOGIN_REQUEST:
      return {
        ...state,
        isProcessing: true,
        submittedData: action.payload,
      };
    case actionTypes.REQUEST_SUCCESSFUL:
      return {
        ...state,
        isProcessing: false,
        result: action.payload,
      };

    case actionTypes.REQUEST_FAILED:
      return {
        ...state,
        isProcessing: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
