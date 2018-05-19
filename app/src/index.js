import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import './styles/css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
const mountApp = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    mountApp
);
registerServiceWorker();
