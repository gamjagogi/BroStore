import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { loadState, saveState } from "./localStorage";
import {createStore} from "redux";
const persistedState = loadState();
const store = createStore(rootReducer, persistedState);


store.subscribe(() => {
    saveState(store);
});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

