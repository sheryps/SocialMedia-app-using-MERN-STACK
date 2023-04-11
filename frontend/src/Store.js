import { combineReducers } from "redux";
import {createStore,applyMiddleware} from "redux";
import authReducer from './reducers/AuthReducers'
import postReducer from "./reducers/postReducer";
import thunk from "redux-thunk";
const reducers=combineReducers({authReducer,postReducer})

function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    } catch(e) {
        console.log(e);
    }
  }
  function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
  }  
  const persistedState = loadFromLocalStorage();
  const store = createStore(reducers,persistedState,applyMiddleware(thunk));
  
  store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;  

