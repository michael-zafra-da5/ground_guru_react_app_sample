import { combineReducers } from "redux";

import apiReducer from "./apiReducer";
import tokenReducer from "./tokenReducer";

export const rootReducer = combineReducers({
    apiReducer: apiReducer,
    tokenReducer: tokenReducer
});
