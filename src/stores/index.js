import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "../reducers";
import { apiMiddleware } from "../middleware/api";
import {composeWithDevTools} from 'redux-devtools-extension';

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

const configureStore = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(apiMiddleware)));
configureStore.subscribe(() =>
    localStorage.setItem('reduxState', JSON.stringify(configureStore.getState()))
);
export default configureStore;