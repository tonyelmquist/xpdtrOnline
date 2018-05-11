import './styles/main.less';
import '../node_modules/semantic-ui-css/semantic.min.css'

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./js/reducers";
import App from "./js/containers/App";
import registerServiceWorker from "./js/utils/registerServiceWorker";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
