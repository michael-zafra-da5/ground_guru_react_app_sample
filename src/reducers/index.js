import { combineReducers } from "redux";

import apiReducer from "./apiReducer";
import tokenReducer from "./tokenReducer";
import sideNavReducer from "./sideNavReducer";

export const rootReducer = combineReducers({
    apiReducer: apiReducer,
    tokenReducer: tokenReducer,
    sideNavReducer: sideNavReducer
});
