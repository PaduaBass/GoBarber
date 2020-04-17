import React from 'react';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import Global from  './styles/global';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import history from './services/history';
import { store, persistor } from './store';

function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <Router history={history}>
          <Global />
          <ToastContainer autoClose={3000} />
          <Routes /> 
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
