import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose  } from 'redux';
import reportWebVitals from './reportWebVitals';
import { LRAuthProvider } from "loginradius-react";
import reducerFunction from './store/reducers/reducer'
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

const rootReducer = combineReducers({
  votingApp: reducerFunction
});

const composeEnhancers = 
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
  compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

const store = createStore(rootReducer,
  enhancer);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store= {store}>
     <LRAuthProvider
      appName="internal-muskan"
      apiKey="c3a8a887-e1e0-4f5a-a3e5-725814f0e9b7"
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </LRAuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
