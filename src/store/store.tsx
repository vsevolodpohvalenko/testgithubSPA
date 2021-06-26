import thunkMiddleware from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {GitHubReducer} from "./git_reducer";

const rootReducers = combineReducers({
    GitHub: GitHubReducer
})

type RootReducersType = typeof rootReducers

export type AppStateType = ReturnType<RootReducersType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))



// @ts-ignore
window.__store__ = store;
export default store