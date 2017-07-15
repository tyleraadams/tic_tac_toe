import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App/App';
import baseReducer from './redux/reducers';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import getBoard from './models/tic_tac_toe_board';
import boardConfig from './config/tic_tac_toe_board.json';

const store = createStore(baseReducer, {
  board: getBoard({width: boardConfig.width, height: boardConfig.height})
}, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
