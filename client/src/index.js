import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import reducer from './redux/reducers'
import './styles/index.css';

let loggerMiddleware = createLogger()

let initialState = {
    search: {
        isFetching: false,
        cardJsx: null,
        searchText: null,
        location: '',
        distance: "20",
        tags: null,
        searchResults: '',
        cardCollapse: {}
    },
    baselayout: {
        isFetching: false
    }

}

const store = createStore(reducer,
    initialState,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    ))


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();