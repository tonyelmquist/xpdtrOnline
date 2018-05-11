import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { BrowserRouter } from 'react-router-dom'
import reducers from '../reducers';
import App from './App';

class Root extends Component {

  constructor(props) {
    super(props);
  }

    render() {
        const store = createStore(rootReducer);
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<Root/>, document.getElementById("root"));

export default Root;