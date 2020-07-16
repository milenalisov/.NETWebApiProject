import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./store/reducers/rootreducer";

const rootElement = document.getElementById("root");

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const app = () => {
    return (
   
      <Provider store={store}>
        <App />
      </Provider>
     
    );
  };
  

ReactDOM.render(app(), rootElement);


registerServiceWorker(); 
