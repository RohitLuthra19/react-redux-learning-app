import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';

import App from './App'; 
import Saga from './saga'; 
import rootReducer from './reducer'; 
import * as serviceWorker from './serviceWorker';
 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//createMiddlewares
const sagaMiddleware = createSagaMiddleware();

//create Store
const storeInstance = createStore(
    rootReducer, 
    composeEnhancers(
        applyMiddleware(sagaMiddleware)
    )
  );

//run saga middleware
sagaMiddleware.run(Saga);

ReactDOM.render(
                <Provider store={storeInstance}>
                <App />
                </Provider>, 
                document.getElementById('root')
                );

serviceWorker.unregister();
