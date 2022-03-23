import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "../reducers";
import { apiMiddleware } from "../middleware/api";
import {composeWithDevTools} from 'redux-devtools-extension';

const configureStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(apiMiddleware)));
export default configureStore;