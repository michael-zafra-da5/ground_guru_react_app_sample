import {
    SET_RESPONSE_DATA,
    API_START,
    API_END,
    API_ERROR,
    FETCH_API_DATA,
    CREATE_USER,
    SET_CREATE_USER_RESPONSE_DATA,
    DELETE_USER,
    DELETE_USER_RESPONSE,
    LOGIN_RESPONSE,
    FETCH_USER_DATA,
    MOVIES_RESPONSE
  } from "../actions/types";

const apiReducer = function(state = {}, action) {
    console.log("action type => ", action.type);
    switch (action.type) {
      case SET_RESPONSE_DATA:
        return { data: action.payload, type: FETCH_API_DATA};
      case SET_CREATE_USER_RESPONSE_DATA:
        return { data: action.payload, type: CREATE_USER};
      case DELETE_USER_RESPONSE:
        return { data: action.payload, type: DELETE_USER};
      case LOGIN_RESPONSE:
        return { data: action.payload, type: LOGIN_RESPONSE};
      case FETCH_USER_DATA:
        return { data: action.payload, type: FETCH_USER_DATA};
      case API_ERROR:
        return { error: action.payload, type: API_ERROR};
      case API_START:
        if (action.payload === FETCH_API_DATA
          || action.payload === CREATE_USER
          || action.payload === DELETE_USER
          || action.payload === LOGIN_RESPONSE
          || action.payload === FETCH_USER_DATA
          || action.payload === MOVIES_RESPONSE) {
          return {
            ...state,
            isLoadingData: true
          };
        }
        break;
      case API_END:
        if (action.payload === FETCH_API_DATA
          || action.payload === CREATE_USER
          || action.payload === DELETE_USER
          || action.payload === LOGIN_RESPONSE
          || action.payload === FETCH_USER_DATA
          || action.payload === MOVIES_RESPONSE) {
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