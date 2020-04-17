import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import './config/ReactotronConfig';
// import { Container } from './styles';
import App from './App';

export default function Index() {
  console.disableYellowBox = true; 

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <App />
     </PersistGate>
    </Provider>
  );
}
