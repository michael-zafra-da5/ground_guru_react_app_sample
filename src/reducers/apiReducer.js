import {
    SET_RESPONSE_DATA,
    API_START,
    API_END,
    FETCH_API_DATA,
    CREATE_USER,
    SET_CREATE_USER_RESPONSE_DATA
  } from "../actions/types";

const apiReducer = function(state = {}, action) {
    console.log("action type => ", action.type);
    switch (action.type) {
      case SET_RESPONSE_DATA:
        return { data: action.payload, type: FETCH_API_DATA};
      case SET_CREATE_USER_RESPONSE_DATA:
        return { data: action.payload, type: CREATE_USER};
      case API_START:
        if (action.payload === FETCH_API_DATA || action.payload === CREATE_USER) {
          return {
            ...state,
            isLoadingData: true
          };
        }
        break;
      case API_END:
        if (action.payload === FETCH_API_DATA || action.payload === CREATE_USER) {
          return {
            ...state,
            isLoadingData: false
          };
        }
        break;
      default:
        return state;
    }
  }

  export default apiReducer;